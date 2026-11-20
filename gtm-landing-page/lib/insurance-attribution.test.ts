import {describe,it,expect} from 'vitest'
import {captureAttribution,preserveAttribution,bookingMetadata,bookingUrl,bookingEmbedConfig,captureLanding,firstLanding,landingMetadata,LANDING_STORAGE_KEY} from './insurance-attribution'
describe('first landing (MAX-738)',()=>{
 const url=new URL('https://www.maxionlabs.com/pricing?utm_source=chatgpt.com&utm_medium=referral&utm_campaign=x&utm_content=c&utm_term=t&other=dropped')
 it('keeps the raw referrer and every utm param, blanks a same-site referrer',()=>{
  const l=captureLanding(url,'https://chatgpt.com/','2026-11-20T10:00:00Z')
  expect(l).toEqual({referrer:'https://chatgpt.com/',utm_source:'chatgpt.com',utm_medium:'referral',utm_campaign:'x',utm_content:'c',utm_term:'t',landingPath:'/pricing',at:'2026-11-20T10:00:00Z'})
  expect(captureLanding(url,'https://www.maxionlabs.com/','2026-11-20').referrer).toBe('')
  expect(captureLanding(url,'not a url','2026-11-20').referrer).toBe('')
  expect(captureLanding(new URL('https://www.maxionlabs.com/?utm_source='+'a'.repeat(900)),'','2026-11-20').utm_source).toHaveLength(200)
 })
 it('stores the first landing once and later visits read it back instead of overwriting',()=>{
  const entries=new Map<string,string>();const storage={getItem:(k:string)=>entries.get(k)??null,setItem:(k:string,v:string)=>{entries.set(k,v)}}
  const first=firstLanding(storage,url,'https://chatgpt.com/','2026-11-20T10:00:00Z')
  const second=firstLanding(storage,new URL('https://www.maxionlabs.com/'),'https://www.google.com/','2026-11-21T10:00:00Z')
  expect(second).toEqual(first);expect(JSON.parse(entries.get(LANDING_STORAGE_KEY)!).referrer).toBe('https://chatgpt.com/')
  expect(firstLanding(null,url,'https://chatgpt.com/','2026-11-20').utm_source).toBe('chatgpt.com')
  const broken={getItem:()=>{throw new Error('blocked')},setItem:()=>{throw new Error('blocked')}}
  expect(firstLanding(broken,url,'https://chatgpt.com/','2026-11-20').referrer).toBe('https://chatgpt.com/')
 })
 it('maps the landing to Cal metadata keys, empty values left out, and asks nothing itself (the lead-source question lives in Cal)',()=>{
  const l=captureLanding(new URL('https://www.maxionlabs.com/?utm_source=chatgpt.com'),'https://chatgpt.com/','2026-11-20')
  expect(landingMetadata(l)).toEqual({'metadata[referrer]':'https://chatgpt.com/','metadata[landingPath]':'/','metadata[utm_source]':'chatgpt.com'})
  expect(landingMetadata(null)).toEqual({});expect(Object.keys(landingMetadata(l)).some(k=>/foundUs|lead-source/i.test(k))).toBe(false)
  const ledger=preserveAttribution(null,captureAttribution(new URL('https://site/')),'2026-11-20')
  const handoff=new URL(bookingUrl(ledger,{},l));expect(handoff.searchParams.get('metadata[referrer]')).toBe('https://chatgpt.com/');expect(handoff.searchParams.get('metadata[bookingRoute]')).toBe('self')
 })
})
describe('insurance attribution',()=>{
 it('keeps absent and arbitrary campaign sources unknown',()=>{expect(captureAttribution(new URL('https://site/insurance'))).toEqual({channel:null,sourceId:null,variant:'baseline'});expect(captureAttribution(new URL('https://site/insurance?utm_source=evil&source_id=anything&variant=other'))).toEqual({channel:null,sourceId:null,variant:'baseline'})})
 it('carries the first observed source through actual calendar handoff and later reschedule/payment mapping',()=>{
 const first=captureAttribution(new URL('https://site/insurance?utm_source=youtube&utm_content=video-123&variant=video'))
 const ledger=preserveAttribution(null,first,'2026-10-03T00:00:00Z');const later=preserveAttribution(ledger,captureAttribution(new URL('https://site/insurance?utm_source=linkedin&utm_content=post-456')),'2026-10-04T00:00:00Z');expect(later.first).toEqual(first);expect(later.touches).toHaveLength(2)
 const handoff=new URL(bookingUrl(later));expect(handoff.pathname).toContain('/maksym-pidvalnyi/insurance');expect(handoff.searchParams.get('metadata[sourceId]')).toBe('video-123');expect(bookingMetadata(later)).toMatchObject({channel:'youtube',sourceId:'video-123',variant:'video',sourceVerified:false});expect(JSON.parse(JSON.stringify(bookingMetadata(later)))).toEqual(bookingMetadata(ledger))
 })
 it('retains unknown first touch instead of laundering a later source claim',()=>{const ledger=preserveAttribution(null,captureAttribution(new URL('https://site/insurance')),'2026-10-03');expect(preserveAttribution(ledger,{channel:'youtube',sourceId:'vid',variant:'video'},'2026-10-04').first.sourceId).toBeNull()})
})

import React from 'react'
import {render,screen,fireEvent,cleanup} from '@testing-library/react'
import InsurancePage from '../app/insurance/page'
it('the real insurance booking CTA hands first attribution to its calendar iframe',()=>{
 const entries=new Map<string,string>();Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:(key:string)=>entries.get(key)??null,setItem:(key:string,value:string)=>entries.set(key,value)}});window.history.replaceState({},'', '/insurance?utm_source=youtube&utm_content=video-123&variant=video');render(React.createElement(InsurancePage));fireEvent.click(screen.getByRole('button',{name:'Book your intro call'}));expect(screen.getByTitle('Book your intro call')).toHaveAttribute('src',expect.stringContaining('metadata%5BsourceId%5D=video-123'));cleanup()
})
it('uses documented Cal embed config metadata and existing prefill keys without changing first attribution',()=>{
 const ledger=preserveAttribution(null,{channel:'youtube',sourceId:'video-123',variant:'video'},'2026-10-03');const config=bookingEmbedConfig(ledger,{name:'Owner',email:'owner@agency.example',website:'https://agency.example',lineOfBusiness:'commercial',geography:'Texas'});expect(config['metadata[sourceId]']).toBe('video-123');expect(config['metadata[bookingRoute]']).toBe('self');expect(config.email).toBe('owner@agency.example');expect(config.website).toBe('https://agency.example');expect(config['metadata[variant]']).toBe('video');
});
it('shows only the current main offer, shows the missed-volume credit',()=>{
 render(React.createElement(InsurancePage));expect(screen.getByText('Month one: 12 appointments. Month two onward: 15. No-shows replaced.')).toBeVisible();expect(screen.getByText('$4,725/month for 15 qualified appointments. Guaranteed.')).toBeVisible();expect(screen.getByText(/\$315 credit against the next month/)).toBeVisible();expect(screen.queryByText(/within 7 days of payment/)).toBeNull();expect(screen.queryByText(/\$3,400|\$5,900|Month one: 8 appointments/)).toBeNull();cleanup()
});
