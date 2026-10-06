/** Commercial HVAC one-pager. No prices on the page: they are given on the call (Max, 2026-10-05). */
const BOOKING = 'https://cal.com/maksym-pidvalnyi/intro-growth-call'

const STEPS: [string, string][] = [
  ['Set your rules', 'Building types, minimum size or rooftop units, how far you’ll drive. Plus your current customers, so we never hand you back one you already service.'],
  ['Map your market', 'We build the list of every building that fits and find the person who runs maintenance at each. You see it before anything sends and strike anyone you don’t want.'],
  ['Reach out in your words', 'Emails go to those people asking if they want a walkthrough with you. You sign off every word first.'],
  ['Qualify & book', 'Our US-based setter calls everyone who says yes, checks them against your rules and books the ones that clear on your calendar.'],
]

const OBJECTIONS: [string, string][] = [
  ['"Is a list like this the right approach?"', 'The list is step one. What you pay for is the conversation after it: we reach out, qualify, and only buildings that said yes and fit your rules end up on your calendar.'],
  ['"Who is actually going to be calling in my name?"', 'Our US-based setter, reading a script you signed off. Nothing goes out to your market in words you haven’t seen.'],
  ['"I don’t need more work. I need technicians."', 'Then this is the wrong thing to buy right now, and I’d rather hear it on the call. The exception is when the work you have is the wrong work: flat out in July, empty in October.'],
  ['"Property managers only buy the cheapest."', 'Plenty do. Those are the buildings you strike before anything sends. The ones worth walking are where the current vendor is slow to show up, not where they’re expensive.'],
  ['"The last outside firm over-promised."', 'Fair. That is why a billable walkthrough is defined in writing before anything sends, and you don’t pay when one misses.'],
]

export default function HvacPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] text-[#12243b]">
      <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-6 sm:px-10">
        <a href="/" className="flex items-center gap-2.5 text-xl font-bold tracking-tight"><span aria-hidden className="h-3 w-3 rounded-sm bg-[#235be8]" />Maxionlabs</a>
        <span className="text-sm text-[#52647b]">Commercial HVAC contractors</span>
      </header>
      <div className="mx-auto max-w-6xl px-6 pb-12 sm:px-10">
        <section className="grid items-center gap-8 py-9 sm:py-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <h1 className="max-w-xl text-[42px] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[58px]">Walk more commercial buildings you actually want.</h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#52647b]">We map the buildings in your area, reach the people who run them, and a human setter books the ones who want a walkthrough with you.</p>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-[#153e75]"><span>You pick the buildings</span><span>You approve every word</span><span>One HVAC shop per metro</span></div>
          </div>
          <div className="rounded-2xl bg-[#122b4b] p-7 text-white shadow-[0_20px_45px_-25px_rgba(18,43,75,0.6)] sm:p-9">
            <p className="text-sm text-[#b9cbe3]">What you get</p>
            <p className="mt-3 text-[27px] font-semibold leading-snug tracking-tight">A couple of qualified commercial walkthroughs held a week, once it’s running.</p>
            <p className="mt-5 border-t border-white/20 pt-5 text-base font-medium leading-relaxed text-[#b8f2de]">The maintenance agreement gets you in the door. The repairs pay the bills. And a maintenance base is what fills October and March.</p>
            <p className="mt-3 text-sm leading-relaxed text-[#c0cde0]">Month to month. Pricing on the call, once we’ve seen your market.</p>
            <a href={BOOKING} className="mt-6 block w-full rounded-lg bg-[#b8f2de] px-6 py-4 text-center font-semibold text-[#122b4b] transition-colors hover:bg-[#d5faed]">Book a call <span aria-hidden className="ml-2">↗</span></a>
            <p className="mt-3 text-xs leading-relaxed text-[#c0cde0]">Or just reply to my email. Max Pidvalnyi, founder.</p>
          </div>
        </section>

        <section className="rounded-2xl border border-[#d9e3f1] bg-white p-6 sm:p-9">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-medium text-[#235be8]">How it runs</p><h2 className="mt-2 text-3xl font-semibold tracking-tight">You set the rules once. We do the rest.</h2></div><span className="rounded-full bg-[#e9f7f0] px-4 py-2 text-sm font-medium text-[#1d6047]">About an hour a week from you</span></div>
          <p className="mt-3 max-w-3xl leading-relaxed text-[#52647b]">Month one is the build: your rules, the building list, the sending setup and the first copy in front of you. Walkthroughs land as replies come in. Nobody honest promises you one in week one.</p>
          <ol className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(([title, body], index) => <li key={title} className="border-t-2 border-[#d9e3f1] pt-4"><span className="text-sm font-semibold text-[#235be8]">{index + 1}</span><h3 className="mt-2 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[#52647b]">{body}</p></li>)}
          </ol>
        </section>

        <section className="grid gap-6 py-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-[#e8effb] p-6 sm:p-8"><h2 className="text-2xl font-semibold tracking-tight">What counts as a qualified walkthrough?</h2><ul className="mt-5 space-y-3 text-[#243d5c]"><li>It held. You were on site, at the building.</li><li>A commercial building in your service area that fits the spec you set.</li><li>The person who decides on HVAC vendors was there.</li><li>A real need: a replacement, a failing system or a service agreement, now or within about three months.</li></ul><p className="mt-5 border-t border-[#c6d5eb] pt-4 font-medium text-[#153e75]">Miss any one and you don’t pay for it. No-shows are free.</p></div>
          <div className="rounded-2xl border border-[#d9e3f1] bg-white p-6 sm:p-8"><h2 className="text-2xl font-semibold tracking-tight">How you pay</h2><p className="mt-5 leading-relaxed text-[#52647b]"><span className="font-semibold text-[#12243b]">A small monthly retainer.</span> It locks your metro, so we don’t work with another HVAC shop in your area, and it pays for the build: domains, inboxes, warmup and the building list.</p><p className="mt-4 leading-relaxed text-[#52647b]"><span className="font-semibold text-[#12243b]">Then a fee per qualified walkthrough held.</span> Nothing for no-shows or wrong buildings. Month to month.</p><div className="mt-5 border-t border-[#d9e3f1] pt-4"><h3 className="font-semibold">7-day alignment guarantee</h3><p className="mt-2 text-sm leading-relaxed text-[#52647b]">If within the first 7 days you feel it was the wrong decision, you get your money back. All of it, no questions asked.</p></div><p className="mt-3 text-sm leading-relaxed text-[#52647b]">We don’t promise a signed contract. We control who you end up standing in a building with. Closing is yours.</p></div>
        </section>

        <section className="grid gap-8 rounded-2xl bg-[#122b4b] p-6 text-white sm:p-9 lg:grid-cols-[1fr_1.1fr]">
          <div><p className="text-sm text-[#b8f2de]">Your name, your reputation</p><h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight">Nobody talks to your market<br />in words you haven’t approved.</h2><ul className="mt-5 space-y-3 leading-relaxed text-[#c0cde0]"><li>You sign off the emails and the setter’s call script before anything goes out.</li><li>The setter who calls is US-based.</li><li>Before every walkthrough you get a brief: the building, who is coming, and why they said yes in their own words. Anything unconfirmed stays marked unknown.</li></ul></div>
          <div className="rounded-xl bg-white p-5 text-[#12243b] sm:p-6"><h3 className="text-lg font-semibold">Illustrative walkthrough brief</h3><p className="mt-1 text-xs leading-relaxed text-[#52647b]">Fictional example showing the format. This is not a client result.</p><dl className="mt-5 grid gap-y-4 text-sm sm:grid-cols-[120px_1fr] sm:gap-x-4"><dt className="font-medium text-[#52647b]">Building</dt><dd>Three-story medical office, about 40,000 sq ft, 12 miles from your shop.</dd><dt className="font-medium text-[#52647b]">Attending</dt><dd>Facilities manager. Signs vendor agreements.</dd><dt className="font-medium text-[#52647b]">Why they said yes</dt><dd>Two rooftop units past 15 years. Current vendor slow to show up.</dd><dt className="font-medium text-[#52647b]">Timing</dt><dd>Wants a number before winter.</dd><dt className="font-medium text-[#52647b]">Contract end</dt><dd className="text-[#1d6047]">Unknown. Ask on site.</dd></dl></div>
        </section>

        <section className="py-9">
          <h2 className="text-2xl font-semibold tracking-tight">What you’re probably thinking</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {OBJECTIONS.map(([q, a]) => <div key={q} className="rounded-xl border border-[#d9e3f1] bg-white p-5"><h3 className="font-semibold text-[#153e75]">{q}</h3><p className="mt-2 text-sm leading-relaxed text-[#52647b]">{a}</p></div>)}
          </div>
        </section>

        <section className="grid gap-7 lg:grid-cols-[1.1fr_1fr]">
          <div className="p-1"><h2 className="text-2xl font-semibold tracking-tight">What the evidence shows</h2><p className="mt-3 text-sm leading-relaxed text-[#52647b]">No HVAC case study yet. I’d rather say that than dress someone else’s result up as yours. Here is what other clients got from the same system:</p><p className="mt-5 font-medium text-[#153e75]">26 sales-qualified demos. 6 annual contracts signed.</p><p className="mt-1 text-sm text-[#52647b]">Construction software selling to contractors.</p><p className="mt-4 font-medium text-[#153e75]">20 customers. $67,800 in revenue. 8.7x return.</p><p className="mt-1 text-sm text-[#52647b]">Executive career services (BlueSteps). The client explains it herself on video.</p><a href="/#client-wins" className="mt-4 inline-block text-sm font-medium text-[#235be8] underline underline-offset-4">See client evidence ↗</a></div>
          <div className="rounded-xl border border-[#d9e3f1] bg-white px-6 py-5"><h2 className="text-xl font-semibold">Who this is not for</h2><ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#52647b]"><li>Shops that only want the big projects. The vendor who takes the small jobs gets considered when the big work goes out.</li><li>Shops that can’t staff more work right now.</li><li>Residential only. This is commercial buildings.</li></ul><h2 className="mt-6 border-t border-[#d9e3f1] pt-5 text-xl font-semibold">On the call</h2><p className="mt-3 text-sm leading-relaxed text-[#52647b]">Bring your radius, the building types you want and roughly who you already service. We show you a measured count of buildings that fit in your area and 5 real rows, names blurred. Then the price, and whether it makes sense on your numbers.</p></div>
        </section>
      </div>
      <footer className="border-t border-[#d9e3f1] px-6 py-6 text-center text-xs text-[#52647b]">Maxionlabs · Commercial HVAC walkthrough setting<br />Registered in Ukraine, Vinytska 15, Kiev, 08130. Payments processed through Stripe.</footer>
    </main>
  )
}
