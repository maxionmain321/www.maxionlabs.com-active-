import { BadgeCheck } from 'lucide-react'
import { INK, LINE, MUTED } from '@/components/home/InsuranceHome'
import { PROFILES } from '@/content/profiles'

/** The third-party profiles as a compact link row. Used by /reviews and the /about "Verify us" block. */
export function ProfileLinks({ testId = 'profile-links' }: { testId?: string }) {
  return (
    <ul data-testid={testId} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {PROFILES.map((p) => (
        <li key={p.name}>
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex h-full flex-col gap-1 rounded-card border ${LINE} bg-white px-4 py-3 transition-colors hover:border-[#3B82F6]`}
          >
            <span className={`flex items-center gap-1.5 font-semibold ${INK}`}>
              <BadgeCheck aria-hidden="true" className="h-4 w-4 text-[#3B82F6]" />
              {p.name}
            </span>
            <span className={`text-xs ${MUTED}`}>{p.what}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
