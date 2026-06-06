import { type Chord } from '@/lib/music/types'
import { toDisplaySymbol } from '@/lib/music/chord'
import { getRomanNumeral } from '@/lib/music/roman'

interface ChordCellProps {
  chord: Chord
  chartKey: string
  isSelected: boolean
  onSelect: () => void
}

// Chord symbol & roman numeral derived from lib/music. Clicking
// A cell opens the info box; the selected cell is highlighted
function ChordCell({ chord, chartKey, isSelected, onSelect }: ChordCellProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={`flex flex-1 cursor-pointer flex-col items-center justify-center gap-1 px-1 transition-colors hover:bg-accent ${
        isSelected ? 'bg-accent' : ''
      }`}
    >
      <span className="text-2xl font-semibold text-foreground">
        {toDisplaySymbol(chord.symbol)}
      </span>
      <span className="text-xl not-italic text-muted-foreground">
        {getRomanNumeral(chord.symbol, chartKey)}
      </span>
    </button>
  )
}

export default ChordCell
