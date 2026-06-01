// Placeholder home page for the Milestone 0 skeleton. Real content (the chart
// library / chart view) replaces this in later milestones. Uses shadcn's
// semantic theme tokens (bg-background / text-foreground) rather than hardcoded
// colors so it follows the light/dark theme automatically.
function HomePage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-3 bg-background text-foreground">
      <h1 className="text-5xl font-bold tracking-tight">Shed</h1>
      <p className="text-muted-foreground">
        Music theory & jazz practice app
      </p>
    </main>
  )
}

export default HomePage
