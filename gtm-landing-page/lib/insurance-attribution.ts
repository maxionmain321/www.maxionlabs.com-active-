export type Attribution={channel:string|null;sourceId:string|null;variant:string}
export type AttributionLedger={first:Attribution;touches:{attribution:Attribution;at:string}[]}
const channels=new Set(['youtube','linkedin','email','referral','organic','direct'])
const variants=new Set(['baseline','video'])
export const ATTRIBUTION_STORAGE_KEY='maxionlabs.insurance.attribution.v1'
/** IDs are bounded opaque references; these claims never establish campaign membership. */
export function captureAttribution(url:URL):Attribution{
 const source=url.searchParams.get('utm_source');const channel=source&&channels.has(source)?source:null
 const content=url.searchParams.get('utm_content');const sourceId=channel&&content&&/^[a-zA-Z0-9_-]{1,80}$/.test(content)?content:null
 const variant=url.searchParams.get('variant')??'baseline'
 return {channel,sourceId,variant:variants.has(variant)?variant:'baseline'}
}
export function preserveAttribution(previous:AttributionLedger|null,current:Attribution,at:string):AttributionLedger{
 return {first:previous?.first??current,touches:[...(previous?.touches??[]),{attribution:current,at}].slice(-30)}
}
export function bookingMetadata(ledger:AttributionLedger){return {...ledger.first,sourceVerified:false,bookingRoute:'self'}}
export type BookingPrefill=Partial<Record<'name'|'email'|'website'|'lineOfBusiness'|'geography'|'obstacle'|'decisionParticipants',string>>
/** Cal official embed config: metadata[myKey] is persisted as payload.metadata.myKey.
 * https://cal.com/help/embedding/prefill-booking-form-embed */
export function bookingEmbedConfig(ledger:AttributionLedger,prefill:BookingPrefill={},landing:Landing|null=null):Record<string,string>{
 const config:Record<string,string>=landingMetadata(landing)
 for(const [key,value] of Object.entries(bookingMetadata(ledger)))if(value!==null)config[`metadata[${key}]`]=String(value)
 for(const key of ['name','email','website','lineOfBusiness','geography','obstacle','decisionParticipants'] as const){const value=prefill[key];if(typeof value==='string'&&value.trim()&&value.length<=500)config[key]=value.trim()}
 if(ledger.first.channel)config.utm_source=ledger.first.channel
 if(ledger.first.sourceId)config.utm_content=ledger.first.sourceId
 return config
}
/** Existing calendar URL uses the same keys as its documented embed config. */
export function bookingUrl(ledger:AttributionLedger,prefill:BookingPrefill={},landing:Landing|null=null){
 const url=new URL('https://cal.com/maksym-pidvalnyi/insurance')
 for(const [key,value] of Object.entries(bookingEmbedConfig(ledger,prefill,landing)))url.searchParams.set(key,value)
 return url.toString()
}

/* ---- First landing (MAX-738, 2026-11-20). ----
 * The "where did you first hear about me" question lives in Cal (slug lead-source, required), not on the page.
 * The ledger above keeps only allow-listed channels. AI assistants (ChatGPT, Perplexity) send either no referrer or a
 * referrer the allow-list never sees, so the raw referrer and every utm param are kept once per browser, as the browser
 * saw them, bounded and control-char stripped. They ride into the Cal booking as metadata[...] next to the ledger. */
export type Landing={referrer:string;utm_source:string;utm_medium:string;utm_campaign:string;utm_content:string;utm_term:string;landingPath:string;at:string}
export const LANDING_STORAGE_KEY='maxionlabs.landing.v1'
export const UTM_KEYS=['utm_source','utm_medium','utm_campaign','utm_content','utm_term'] as const
const clip=(value:string|null|undefined,max=200)=>(value??'').replace(/[\u0000-\u001f\u007f]/g,'').trim().slice(0,max)
/** Same-site referrers are blanked: a page linking to another page of ours is navigation, not a source. */
export function captureLanding(url:URL,referrer:string,at:string):Landing{
 let ref=clip(referrer,500)
 try{if(ref&&new URL(ref).host===url.host)ref=''}catch{ref=''}
 const landing={referrer:ref,landingPath:clip(url.pathname,200),at} as Landing
 for(const key of UTM_KEYS)landing[key]=clip(url.searchParams.get(key))
 return landing
}
/** The stored first landing wins; this visit is stored only when nothing is there yet. Storage errors fall back to this visit. */
export function firstLanding(storage:Pick<Storage,'getItem'|'setItem'>|null,url:URL,referrer:string,at:string):Landing{
 const current=captureLanding(url,referrer,at)
 if(!storage)return current
 try{
  const raw=storage.getItem(LANDING_STORAGE_KEY)
  if(raw){const value=JSON.parse(raw);if(value&&typeof value==='object'&&typeof value.at==='string'){const stored={...current};for(const key of Object.keys(current) as (keyof Landing)[])stored[key]=clip(value[key],key==='referrer'?500:200);return stored}}
  storage.setItem(LANDING_STORAGE_KEY,JSON.stringify(current))
 }catch{/* private mode or blocked storage: the booking still carries this visit */}
 return current
}
/** Cal embed metadata[...] entries for the first landing. Empty values are left out. */
export function landingMetadata(landing:Landing|null):Record<string,string>{
 const out:Record<string,string>={}
 if(landing){
  if(landing.referrer)out['metadata[referrer]']=landing.referrer
  if(landing.landingPath)out['metadata[landingPath]']=landing.landingPath
  for(const key of UTM_KEYS)if(landing[key])out[`metadata[${key}]`]=landing[key]
 }
 return out
}
