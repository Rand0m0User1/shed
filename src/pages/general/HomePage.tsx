import { Link } from 'react-router'
import { sampleCharts } from '@/lib/music/fixtures/sampleCharts'

// Landing page. For now it lists the pre-loaded development charts as cards that
// link to the chord chart (Plan Step 4). Upload buttons and per-chart delete
// (the 3-dots menu) come later. So does login button.
function HomePage() {
  return (
    <main className="mx-auto max-w-3xl p-4">
      <header className="my-8 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-foreground">
          Shed
        </h1>
        <p className="text-muted-foreground">
          Music theory & jazz practice app
        </p>
      </header>

      <ul className="space-y-2">
        {sampleCharts.map((chart) => (
          <li key={chart.id}>
            <Link
              to={`/chart/${chart.id}`}
              className="flex items-center justify-between rounded-md border border-border bg-card p-4 transition-colors hover:bg-accent"
            >
              <span className="font-medium text-foreground">{chart.title}</span>
              <span className="text-sm text-muted-foreground">{chart.key}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default HomePage
