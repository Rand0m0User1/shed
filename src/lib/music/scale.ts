import { Chord, Scale } from 'tonal'
import { type Chord as ChartChord } from './types'
import { defaultScaleFor, getChordTones } from './chord'

// The scale mode used for a chord, honoring the user's per-chord override first,
// then the default-by-quality (skill rule #5 / BUILD_SPEC §6). The override field
// already lives on the chord; the picker UI that sets it is a later feature.
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

// The arpeggio for the info box: chord tones (1·3·5·7) plus the 9th, which is the
// 2nd degree of the resolved scale (BUILD_SPEC §13, Milestone 2).
export function getArpeggioNotes(chord: ChartChord): string[] {
  const chordTones = getChordTones(chord.symbol)
  const ninth = getScaleNotes(chord)[1]
  return ninth ? [...chordTones, ninth] : chordTones
}
