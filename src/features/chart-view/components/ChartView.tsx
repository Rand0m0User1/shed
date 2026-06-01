import { useState } from 'react'
import { type Chart } from '@/lib/music/types'
import MeasureBox from './MeasureBox'
import ChordInfoBox from './ChordInfoBox'

interface ChartViewProps {
  chart: Chart
}

interface Selection {
  measureIndex: number
  chordIndex: number
}

// Read-only rendering of a chord chart: title, key, grid of numbered measure boxes
// when a chord is clicked -> an info box below with its arpeggio, scale, and guide tones
function ChartView({ chart }: ChartViewProps) {
  const [selection, setSelection] = useState<Selection | null>(null)

  const selectedChord = selection
    ? chart.measures[selection.measureIndex].chords[selection.chordIndex]
    : null

  function toggleSelection(measureIndex: number, chordIndex: number) {
    setSelection((current) =>
      current?.measureIndex === measureIndex &&
      current.chordIndex === chordIndex
        ? null
        : { measureIndex, chordIndex },
    )
  }

  return (
    <div className="mx-auto max-w-3xl p-4">
      <header className="mb-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {chart.title}
        </h1>
        <p className="text-muted-foreground">{chart.key}</p>
      </header>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {chart.measures.map((measure, measureIndex) => (
          <MeasureBox
            key={measureIndex}
            measure={measure}
            measureNumber={measureIndex + 1}
            chartKey={chart.key}
            selectedChordIndex={
              selection?.measureIndex === measureIndex
                ? selection.chordIndex
                : null
            }
            onSelectChord={(chordIndex) =>
              toggleSelection(measureIndex, chordIndex)
            }
          />
        ))}
      </div>

      {selectedChord && (
        <ChordInfoBox chord={selectedChord} chartKey={chart.key} />
      )}
    </div>
  )
}

export default ChartView
