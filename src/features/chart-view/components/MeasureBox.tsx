import { type Measure } from '@/lib/music/types'
import ChordCell from './ChordCell'

interface MeasureBoxProps {
  measure: Measure
  measureNumber: number
  chartKey: string
  selectedChordIndex: number | null
  onSelectChord: (chordIndex: number) => void
}

function MeasureBox({
  measure,
  measureNumber,
  chartKey,
  selectedChordIndex,
  onSelectChord,
}: MeasureBoxProps) {
  return (
    <div className="relative flex min-h-24 rounded-md border border-border bg-card p-2">
      <span className="absolute left-1.5 top-1 text-xs text-muted-foreground">
        {measureNumber}
      </span>
      <div className="flex flex-1 items-stretch divide-x divide-border">
        {measure.chords.map((chord, index) => (
          <ChordCell
            key={index}
            chord={chord}
            chartKey={chartKey}
            isSelected={selectedChordIndex === index}
            onSelect={() => onSelectChord(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default MeasureBox
