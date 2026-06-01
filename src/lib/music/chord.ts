import { Chord } from 'tonal'

const GLYPH_BY_SUFFIX: Record<string, string> = {
  dim7: '°7',
  dim: '°',
  m7b5: 'ø7',
}

// Default scale mode per Tonal chord `type`. scaleOverride wins over this
// if the user wants to choose a different scale
const SCALE_BY_CHORD_TYPE: Record<string, string> = {
  'major seventh': 'ionian',
  'sixth': 'ionian',
  'dominant seventh': 'mixolydian',
  'minor seventh': 'dorian',
  'minor sixth': 'dorian',
  'half-diminished': 'locrian',
  'diminished seventh': 'whole-half diminished',
  'minor/major seventh': 'melodic minor',
  'lydian dominant seventh': 'lydian dominant',
}

// Maps a stored, Tonal chord symbol to the proper jazz glyph for viewing on screen
export function toDisplaySymbol(symbol: string): string {
  const { tonic, empty } = Chord.get(symbol)
  if (empty || !tonic) return symbol

  const suffix = symbol.slice(tonic.length)
  const displaySuffix = GLYPH_BY_SUFFIX[suffix] ?? withAlterationGlyphs(suffix)
  return tonic + displaySuffix
}

function withAlterationGlyphs(suffix: string): string {
  return suffix.replace(/b/g, '♭').replace(/#/g, '♯')
}

// The chord tones (1·3·5·7 for a seventh chord)
export function getChordTones(chordSymbol: string): string[] {
  return Chord.get(chordSymbol).notes
}

// The guide tones (3rd and 7th), the voice-leading tones
export function getGuideTones(chordSymbol: string): string[] {
  const { notes, intervals } = Chord.get(chordSymbol)
  const third =
    notes[intervals.findIndex((interval) => interval.startsWith('3'))]
  const seventh =
    notes[intervals.findIndex((interval) => interval.startsWith('7'))]
  return [third, seventh].filter((note): note is string => note !== undefined)
}

// The default scale mode for a chord when the user hasn't chosen an override.
// scale.ts applies the override-wins resolution order on top of this.
export function defaultScaleFor(chordSymbol: string): string {
  const { type, quality } = Chord.get(chordSymbol)
  if (SCALE_BY_CHORD_TYPE[type]) return SCALE_BY_CHORD_TYPE[type]
  // Fallbacks for qualities not yet given a specific scale:
  if (type.includes('dominant')) return 'mixolydian'
  if (quality === 'Minor') return 'dorian'
  return 'ionian'
}
