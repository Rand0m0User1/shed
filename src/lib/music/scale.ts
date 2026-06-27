import { Chord, Scale } from 'tonal'
import { type Chord as ChartChord } from './types'
import { defaultScaleFor, getChordTones } from './chord'

// The mode of the scale for a chord. The user may override the default via UI.
export function resolveScaleMode(chord: ChartChord): string {
  return chord.scaleOverride ?? defaultScaleFor(chord.symbol)
}

function chordRoot(chordSymbol: string): string {
  return Chord.get(chordSymbol).tonic ?? ''
}

// The notes of the chord's resolved scale (e.g. F7 -> F Mixolydian's notes).
export function getScaleNotes(chord: ChartChord): string[] {
  return Scale.get(`${chordRoot(chord.symbol)} ${resolveScaleMode(chord)}`)
    .notes
}

// Display name of the resolved scale, e.g. "F Mixolydian".
export function getScaleDisplayName(chord: ChartChord): string {
  const mode = resolveScaleMode(chord)
  return `${chordRoot(chord.symbol)} ${mode.charAt(0).toUpperCase()}${mode.slice(1)}`
}

// Arpeggio: chord tones (1·3·5·7) plus the 9th (the scale's 2nd degree).
export function getArpeggioNotes(chord: ChartChord): string[] {
  const chordTones = getChordTones(chord.symbol)
  const ninth = getScaleNotes(chord)[1]
  return ninth ? [...chordTones, ninth] : chordTones
}

export type Direction = 'up' | 'down' | 'updown'

interface ScaleLineOptions {
  octaves: number
  direction: Direction
  clef: 'treble' | 'bass'
}

const START_OCTAVE: Record<'treble' | 'bass', Record<string, number>> = {
  treble: { C: 4, D: 4, E: 4, F: 4, G: 4, A: 4, B: 4 },
  bass: { C: 3, D: 2, E: 2, F: 2, G: 2, A: 2, B: 2 },
}

function startOctave(root: string, clef: 'treble' | 'bass'): number {
  return START_OCTAVE[clef][root[0]] ?? 4
}

// The scale as pitches with octaves for the staff: 1–2 octaves, up/down/up-down.
export function getScaleLine(
  chord: ChartChord,
  options: ScaleLineOptions,
): string[] {
  const root = chordRoot(chord.symbol)
  const octave = startOctave(root, options.clef)
  const scaleName = `${root} ${resolveScaleMode(chord)}`
  const ascending = Scale.rangeOf(scaleName)(
    `${root}${octave}`,
    `${root}${octave + options.octaves}`,
  ).filter((note): note is string => note !== undefined)

  if (options.direction === 'down') return [...ascending].reverse()
  if (options.direction === 'updown') {
    return [...ascending, ...[...ascending].reverse().slice(1)]
  }
  return ascending
}
