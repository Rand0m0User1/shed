import { type Chord } from '@/lib/music/types'
import { toDisplaySymbol, getGuideTones } from '@/lib/music/chord'
import { getRomanNumeral } from '@/lib/music/roman'
import {
  getArpeggioNotes,
  getScaleNotes,
  getScaleDisplayName,
  getScaleLine,
  type Direction,
} from '@/lib/music/scale'
import AbcStaff from '@/lib/abc/AbcStaff'

interface ChordInfoBoxProps {
  chord: Chord
  chartKey: string
  clef: 'treble' | 'bass'
  octaves?: number
  direction?: Direction
}

// Info box for the selected chord: text rows plus the scale on a staff.
function ChordInfoBox({
  chord,
  chartKey,
  clef,
  octaves = 1,
  direction = 'up',
}: ChordInfoBoxProps) {
  const baseOctave = clef === 'bass' ? 3 : 4
  const scaleLine = getScaleLine(chord, { octaves, direction, baseOctave })

  return (
    <section className="mt-4 rounded-md border border-border bg-card p-4">
      <header className="mb-3 flex items-baseline gap-3">
        <span className="text-2xl font-semibold text-foreground">
          {toDisplaySymbol(chord.symbol)}
        </span>
        <span className="text-lg text-muted-foreground">
          {getRomanNumeral(chord.symbol, chartKey)}
        </span>
      </header>

      <dl className="space-y-2 text-sm">
        <InfoRow label="Arpeggio (1·3·5·7·9)" notes={getArpeggioNotes(chord)} />
        <InfoRow
          label={`Scale — ${getScaleDisplayName(chord)}`}
          notes={getScaleNotes(chord)}
        />
        <InfoRow
          label="Guide tones (3rd · 7th)"
          notes={getGuideTones(chord.symbol)}
        />
      </dl>

      <AbcStaff notes={scaleLine} clef={clef} />
    </section>
  )
}

function InfoRow({ label, notes }: { label: string; notes: string[] }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
      <dt className="font-medium text-muted-foreground sm:w-60 sm:shrink-0">
        {label}
      </dt>
      <dd className="font-mono text-foreground">{notes.join('  ')}</dd>
    </div>
  )
}

export default ChordInfoBox
