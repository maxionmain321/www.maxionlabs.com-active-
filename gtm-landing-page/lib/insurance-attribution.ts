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
export function bookingMetadata(ledger:AttributionLedger){return {...ledger.first,sourceVerified:false}}
/** Existing calendar route, with Cal's metadata query syntax. Provider persistence must be verified before release. */
export function bookingUrl(ledger:AttributionLedger){
 const url=new URL('https://cal.com/maksym-pidvalnyi/intro-growth-call')
 for(const [key,value] of Object.entries(bookingMetadata(ledger)))if(value!==null)url.searchParams.set(`metadata[${key}]`,String(value))
 return url.toString()
}
