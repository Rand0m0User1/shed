import { useState, useMemo, useEffect } from 'react'
import { type Chart } from '@/lib/music/types'
import MeasureBox from './MeasureBox'
import ChordInfoBox from './ChordInfoBox'
import { Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ChartToolbar from './ChartToolbar'
import { type Direction } from '@/lib/music/scale'

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
  const [clef, setClef] = useState<'treble' | 'bass'>('treble')
  const [octaves, setOctaves] = useState(1)
  const [direction, setDirection] = useState<Direction>('up')

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

  // Every chord in reading order, so arrow keys can move through them
  const chordPositions = useMemo(
    () =>
      chart.measures.flatMap((measure, measureIndex) =>
        measure.chords.map((_, chordIndex,) => ({ measureIndex, chordIndex})),
    ),
    [chart],
  )

  // Left/right arrows move the selection one chord at a time.
  useEffect(() => {
    function handleArrowKey(event: KeyboardEvent) {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
      event.preventDefault()
      const step = event.key === 'ArrowRight' ? 1 : -1
      setSelection((current) => {
        const count = chordPositions.length
        if (count === 0) return null
        // From nothing: → starts at the first chord, ← at the last.
        if (!current) return chordPositions[step === 1 ? 0 : count - 1]

        const currentIndex = chordPositions.findIndex(
          (position) =>
            position.measureIndex === current.measureIndex &&
            position.chordIndex === current.chordIndex,
        )
        return chordPositions[(currentIndex + step + count) % count]
      })
    }
    window.addEventListener('keydown', handleArrowKey)
    return () => window.removeEventListener('keydown', handleArrowKey)
  }, [chordPositions])

  return (
    <div className="mx-auto max-w-3xl p-4">
      
      <Button variant="ghost" size="sm" asChild>
        <Link to="/">
          <ArrowLeft />
          Back
        </Link>
      </Button>

      <ChartToolbar 
        clef={clef} 
        onClefChange={setClef}
        octaves={octaves}
        onOctavesChange={setOctaves}
        direction={direction}
        onDirectionChange={setDirection}
      />

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
        <ChordInfoBox 
          chord={selectedChord} 
          chartKey={chart.key} 
          clef={clef}
          octaves={octaves}
          direction={direction}
        />
      )}
    </div>
  )
}

export default ChartView
