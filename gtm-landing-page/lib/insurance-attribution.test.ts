import {describe,it,expect} from 'vitest'
import {captureAttribution,preserveAttribution,bookingMetadata,bookingUrl,bookingEmbedConfig} from './insurance-attribution'
describe('insurance attribution',()=>{
 it('keeps absent and arbitrary campaign sources unknown',()=>{expect(captureAttribution(new URL('https://site/insurance'))).toEqual({channel:null,sourceId:null,variant:'baseline'});expect(captureAttribution(new URL('https://site/insurance?utm_source=evil&source_id=anything&variant=other'))).toEqual({channel:null,sourceId:null,variant:'baseline'})})
 it('carries the first observed source through actual calendar handoff and later reschedule/payment mapping',()=>{
 const first=captureAttribution(new URL('https://site/insurance?utm_source=youtube&utm_content=video-123&variant=video'))
 const ledger=preserveAttribution(null,first,'2026-10-03T00:00:00Z');const later=preserveAttribution(ledger,captureAttribution(new URL('https://site/insurance?utm_source=linkedin&utm_content=post-456')),'2026-10-04T00:00:00Z');expect(later.first).toEqual(first);expect(later.touches).toHaveLength(2)
 const handoff=new URL(bookingUrl(later));expect(handoff.pathname).toContain('intro-growth-call');expect(handoff.searchParams.get('metadata[sourceId]')).toBe('video-123');expect(bookingMetadata(later)).toMatchObject({channel:'youtube',sourceId:'video-123',variant:'video',sourceVerified:false});expect(JSON.parse(JSON.stringify(bookingMetadata(later)))).toEqual(bookingMetadata(ledger))
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
it('shows the approved first-month ramp beside the unchanged Tier 1 price and remedy',()=>{
 render(React.createElement(InsurancePage));expect(screen.getByText('Month one: 8 appointments. Month two onward: 10. No-shows replaced.')).toBeVisible();expect(screen.getByText('From $3,400/month for 10 qualified appointments. Guaranteed.')).toBeVisible();expect(screen.getByText(/\$340 credit against the next month/)).toBeVisible();expect(screen.queryByText(/Month one: 5 appointments/)).toBeNull();cleanup()
});
