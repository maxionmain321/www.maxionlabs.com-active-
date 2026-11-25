import type { Metadata } from 'next'

// Post-payment page for insurance clients: confirms the purchase, then offers the partner-meetings add-on
// (MAX-776, 2026-11-25). Source draft: ~/Downloads/partner-addon.html. Not indexed.
export const metadata: Metadata = {
  title: "You're in | Maxionlabs",
  description: 'Payment confirmed. What happens next.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/insurance-referrals' },
}

const CSS = "
.wl{--bg:#f5f7fa;--fg:#0a2540;--mute:#5b6472;--card:#ffffff;--line:#e6ebf1;--tint:#f1f4f8;--acc:#2563eb;--accfg:#ffffff;--acctint:rgba(37,99,235,.08);--serif:\"Iowan Old Style\",\"Palatino Linotype\",Palatino,\"Book Antiqua\",Georgia,serif;--mono:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace}
*{box-sizing:border-box}
.wl{min-height:100vh;background:var(--bg);color:var(--fg);font:18px/1.6 var(--font-geist-sans),-apple-system,BlinkMacSystemFont,\"Segoe UI\",Arial,sans-serif}
main{max-width:640px;margin:0 auto;padding:32px 16px 72px}
h1{font-family:var(--serif);font-weight:500;font-size:40px;line-height:1.12;margin:0 0 16px;letter-spacing:-.015em}
h2{font-family:var(--serif);font-weight:500;font-size:30px;line-height:1.2;margin:48px 0 14px;letter-spacing:-.01em}
.eyebrow+h2{margin-top:0}
.eyebrow{font-family:var(--mono);font-size:12px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--acc);margin:0 0 10px}
p{margin:0 0 14px}
.mute{color:var(--mute)}
.card{background:var(--card);border:1px solid var(--line);border-radius:8px;padding:18px 20px;margin:16px 0}
.steps,.list{list-style:none;margin:0;padding:0}
.steps li,.list li{padding:10px 0;border-top:1px solid var(--line)}
.steps li:first-child,.list li:first-child{border-top:0;padding-top:2px}
.rule{height:1px;background:var(--line);margin:48px 0 40px}
.quote{border:1px solid var(--line);border-left:3px solid var(--acc);background:var(--card);border-radius:0 12px 12px 0;padding:14px 18px;margin:16px 0}
.quote small{display:block;font-family:var(--mono);font-size:11px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--mute);margin-bottom:8px}
.quote p{font-size:20px;line-height:1.4;margin:0 0 4px}
.quote span,.quote a{font-size:15px;color:var(--mute)}
.funnel{list-style:none;margin:10px 0;padding:0}
.funnel li{display:flex;align-items:baseline;gap:14px;background:var(--card);border:1px solid var(--line);border-radius:10px;padding:10px 16px;margin:6px 0}
.funnel b{font-family:var(--serif);font-weight:500;font-size:26px;min-width:84px;font-variant-numeric:tabular-nums}
.funnel .win{background:var(--acctint);border:1px solid var(--acc)}.funnel .win b{color:var(--acc)}
.tiers{width:100%;border-collapse:collapse}
.tiers td{padding:12px 0;border-top:1px solid var(--line);vertical-align:middle}
.tiers tr:first-child td{border-top:0}
.tiers td:last-child{text-align:right;white-space:nowrap;padding-left:12px;color:var(--mute)}
.tiers .you td:last-child{font-family:var(--serif);font-size:32px;font-weight:500;color:var(--acc)}
.btn{display:block;text-align:center;background:var(--acc);color:var(--accfg);text-decoration:none;font-weight:700;font-size:19px;padding:17px;border-radius:8px;margin:18px 0 12px}
.fine{font-size:15px;color:var(--mute);margin:0 0 6px}
.item{background:var(--card);border:1px solid var(--line);border-radius:8px;padding:16px 20px;margin:12px 0}
.item h3{font-family:var(--serif);font-weight:500;font-size:22px;margin:0 0 6px}
.item p{margin:0 0 8px}.item p:last-child{margin:0}
.vs{width:100%;border-collapse:collapse;margin:10px 0 12px;font-size:16px;line-height:1.4}
.vs th{text-align:left;font-family:var(--mono);font-size:11px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--mute);padding:0 10px 8px 0}
.vs td{padding:10px 10px 10px 0;border-top:1px solid var(--line);vertical-align:top;width:50%}
.vs td:first-child{color:var(--mute)}
.vs td:last-child{font-weight:600;background:var(--acctint);padding-left:10px}
.vs th:last-child{padding-left:10px;color:var(--acc)}
.callout{background:var(--acctint);border:1px solid rgba(37,99,235,.25);padding:12px 16px;border-radius:8px}
.big{color:var(--acc);font-weight:700}
"

const BODY = "

<p class=\"eyebrow\">Payment confirmed</p>
<h1>You're in. Here's what happens next.</h1>
<div class=\"card\">
<ul class=\"steps\">
<li><b>Today:</b> a 15-minute onboarding form, mostly filled in from our call, plus the agreement to sign.</li>
<li><b>Next few days:</b> you approve the emails, they go out under your name.</li>
<li><b>Week one or two:</b> first appointments, usually.</li>
<li><b>Every Friday:</b> a short update on where we stand.</li>
</ul>
</div>

<div class=\"rule\"></div>

<p class=\"eyebrow\">Partner meetings</p>
<h2>While you're here, here's how else we can make you more money</h2>
<p>When someone comes to you from a referral, they already trust you, right? You probably close at least 2x more of those than cold leads.</p>

<div class=\"quote\">
<small>VP of business development, 45-person agency, Long Island NY</small>
<p>\"When we're highly referred by somebody, it's usually in the bag.\"</p>
<span>On a call with us. About 75% on referrals.</span>
</div>

<p><b>So we can get you more of those.</b> We book you 3 meetings a month with local CPAs, PEOs and lenders who already work with the businesses you want.</p>
<p>One good CPA can send you a couple of accounts every year. But not just because you asked. You need to give them something back, and set it up properly. <b>That's the part we do for you.</b></p>

<div class=\"quote\">
<small>Insurance agent, 25 years in the business, on Reddit</small>
<p>\"CPA's and law firms are my top referral sources.\"</p>
<a href=\"https://www.reddit.com/r/InsuranceAgent/comments/1xsppdg/referral_partners/\">r/InsuranceAgent</a>
</div>

<h2>Why bother, if referrals already come in?</h2>
<p>Because right now they come in by chance. A client mentions you, a friend of a friend calls. You can't plan around it, and you can't make more of it.</p>
<p>The usual fix is networking. Here's how that same agency does it.</p>
<div class=\"quote\">
<small>Long Island agency, on a call with us</small>
<p>\"We take attorneys, accountants, realtors, mortgage brokers out to lunch, dinner, the Giants football game.\"</p>
</div>
<p>That works, but it's your evenings and your money, and most of those relationships go cold after the first lunch because nobody follows up.</p>
<p class=\"callout\"><b>Doing nothing means your best leads stay random.</b> This makes them steady.</p>

<h2>What you get every month</h2>

<div class=\"item\">
<h3>1. 3 partner meetings on your calendar</h3>
<p>We find the CPAs, PEOs and lenders whose clients fit your appetite, reach out, and book the meeting. You just show up.</p>
<p class=\"mute\"><b>Why you need this:</b> finding the right partner is the slow part. Most CPAs don't work with the businesses you want, so you'd waste lunches on the wrong ones.</p>
</div>

<div class=\"item\">
<h3>2. A brief before every meeting</h3>
<p>Who they work with, how many of their clients fit you, and what they care about.</p>
<p class=\"mute\"><b>Why you need this:</b> you walk in knowing what to offer them, so the first meeting ends with a plan instead of \"let's keep in touch\".</p>
</div>

<div class=\"item\">
<h3>3. A referral kit, written for your agency</h3>
<p>A one-pager about you, a checklist they hand their clients, and an intro email they just forward.</p>
<p class=\"mute\"><b>Why you need this:</b> a CPA won't write about you from scratch. If referring you takes 30 seconds, they actually do it.</p>
</div>

<div class=\"item\">
<h3>4. A give-back plan</h3>
<p>What you send their way in return: your clients who need a CPA, payroll or a loan.</p>
<p class=\"mute\"><b>Why you need this:</b> partners keep sending when it goes both ways. One-way asks get you quietly dropped.</p>
</div>

<div class=\"item\">
<h3>5. Quarterly follow-ups, written for you</h3>
<p>A short, useful note to each partner every quarter, ready for you to send.</p>
<p class=\"mute\"><b>Why you need this:</b> this is where most partnerships die. The referrals come from staying top of mind, not from the first meeting.</p>
</div>

<h2>You could do this yourself</h2>
<p>This isn't some new trick. Agents have grown off CPA and banker referrals for decades. It just takes a lot of legwork, and most agents give up before it pays off.</p>
<table class=\"vs\">
<tr><th>On your own</th><th>With us</th></tr>
<tr><td>Figure out which CPAs actually work with your kind of business</td><td>We find them and book the meeting</td></tr>
<tr><td>Lunches, dinners, events, hoping the right one shows up</td><td>3 meetings a month on your calendar</td></tr>
<tr><td>Explain yourself from scratch every time</td><td>A brief and a kit, ready to go</td></tr>
<tr><td>Remember to follow up every quarter</td><td>Follow-ups written for you</td></tr>
<tr><td>Months of trial and error</td><td>Starts this month</td></tr>
</table>
<p class=\"mute\">Same method, without the evenings and the guesswork.</p>

<h2>What that's worth in a year</h2>
<ol class=\"funnel\">
<li><b>36</b><span>partners you meet</span></li>
<li><b>3</b><span>start sending you clients</span></li>
<li><b>6</b><span>referrals, 2 from each</span></li>
<li><b>4</b><span>you close, at around 75%</span></li>
<li class=\"win\"><b>$32,000</b><span>commission, at $8,000 an account</span></li>
</ol>
<p>The add-on is $17,820 a year at your price. <b class=\"big\">You keep $14,180</b>, and partners keep sending in year two. Swap in your own numbers.</p>

<h2>Client price, only on this page</h2>
<div class=\"card\">
<table class=\"tiers\">
<tr><td>Agencies that don't work with us</td><td>$2,250/mo</td></tr>
<tr class=\"you\"><td><b>You, added today</b><br><span class=\"mute\">Locked in while you're our client</span></td><td>$1,485/mo</td></tr>
<tr><td>You, if you add it later</td><td>$2,250/mo</td></tr>
</table>
<a class=\"btn\" href=\"mailto:maksym@maxionlabs.com?subject=Add%20partner%20meetings&body=Yes%2C%20add%20the%20partner%20meetings%20at%20the%20client%20price.\">Yes, add it at $1,485/mo</a>
<p class=\"fine\">We add it to your agreement. 3 a month is our target, not a promise yet. Cancel any month, your appointments keep going.</p>
</div>

<p class=\"mute\">Not now? All good, onboarding starts today either way.</p>
<p>Max</p>
"

export default function InsuranceReferralsPage() {
  return (
    <div className="wl">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <main dangerouslySetInnerHTML={{ __html: BODY }} />
    </div>
  )
}
