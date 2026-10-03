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
export function bookingEmbedConfig(ledger:AttributionLedger,prefill:BookingPrefill={}):Record<string,string>{
 const config:Record<string,string>={}
 for(const [key,value] of Object.entries(bookingMetadata(ledger)))if(value!==null)config[`metadata[${key}]`]=String(value)
 for(const key of ['name','email','website','lineOfBusiness','geography','obstacle','decisionParticipants'] as const){const value=prefill[key];if(typeof value==='string'&&value.trim()&&value.length<=500)config[key]=value.trim()}
 if(ledger.first.channel)config.utm_source=ledger.first.channel
 if(ledger.first.sourceId)config.utm_content=ledger.first.sourceId
 return config
}
/** Existing calendar URL uses the same keys as its documented embed config. */
export function bookingUrl(ledger:AttributionLedger,prefill:BookingPrefill={}){
 const url=new URL('https://cal.com/maksym-pidvalnyi/intro-growth-call')
 for(const [key,value] of Object.entries(bookingEmbedConfig(ledger,prefill)))url.searchParams.set(key,value)
 return url.toString()
}
