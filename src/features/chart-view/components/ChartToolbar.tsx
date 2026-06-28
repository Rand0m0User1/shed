import { type ReactNode } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { type Direction } from '@/lib/music/scale'

interface ChartToolbarProps {
  clef: 'treble' | 'bass'
  onClefChange: (clef: 'treble' | 'bass') => void
  octaveCount: number
  onOctaveCountChange: (count: number) => void
  octaveStart: number
  onOctaveStartChange: (start: number) => void
  direction: Direction
  onDirectionChange: (direction: Direction) => void
}

function ChartToolbar({
  clef,
  onClefChange,
  octaveCount,
  onOctaveCountChange,
  octaveStart,
  onOctaveStartChange,
  direction,
  onDirectionChange,
}: ChartToolbarProps) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-4 border-b pb-3">
      <Setting label="Clef">
        <Select
          value={clef}
          onValueChange={(value) => {
            if (value === 'treble' || value === 'bass') onClefChange(value)
          }}
        >
          <SelectTrigger className="w-28">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="treble">Treble</SelectItem>
            <SelectItem value="bass">Bass</SelectItem>
          </SelectContent>
        </Select>
      </Setting>

      <Setting label="Octaves">
        <Select
          value={String(octaveCount)}
          onValueChange={(value) => onOctaveCountChange(Number(value))}
        >
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
          </SelectContent>
        </Select>
      </Setting>

      <Setting label="Start">
        <Select
          value={String(octaveStart)}
          onValueChange={(value) => onOctaveStartChange(Number(value))}
        >
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1st</SelectItem>
            <SelectItem value="2">2nd</SelectItem>
            <SelectItem value="3">3rd</SelectItem>
          </SelectContent>
        </Select>
      </Setting>

      <Setting label="Direction">
        <Select
          value={direction}
          onValueChange={(value) => {
            if (value === 'up' || value === 'down' || value === 'updown') {
              onDirectionChange(value)
            }
          }}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="up">Up</SelectItem>
            <SelectItem value="down">Down</SelectItem>
            <SelectItem value="updown">Up & Down</SelectItem>
          </SelectContent>
        </Select>
      </Setting>
    </div>
  )
}

function Setting({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span>{label}</span>
      {children}
    </div>
  )
}

export default ChartToolbar
