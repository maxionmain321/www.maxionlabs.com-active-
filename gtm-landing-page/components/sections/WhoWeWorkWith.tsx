const CLIENTS = [
  'Workforce management software for specialty contractors',
  'Executive career-services company',
  'Online reputation services company',
  'Custom development and ERP implementation firm',
  'Commercial landscaping and snow removal company (Massachusetts)',
  'Job application platform',
  'AI coworker platform',
  'Commercial lending company',
  'Insurance agency (California)',
]

export function WhoWeWorkWith() {
  return (
    <section
      data-testid="who-we-work-with"
      aria-label="Who we work with right now"
      className="max-w-container mx-auto px-6 lg:px-12 py-16 lg:py-20"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary leading-tight">Who we work with right now</h2>
        <ul className="mt-6 list-disc pl-5 space-y-2 text-text-secondary">
          {CLIENTS.map((c) => <li key={c}>{c}</li>)}
        </ul>
      </div>
    </section>
  )
}

export default WhoWeWorkWith
