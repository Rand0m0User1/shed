// The chart schema — the single contract every feature reads and writes.
// This is BUILD_SPEC §4, transcribed faithfully; it is fixed (only the items in
// §13 are deferred). Chords store a canonical Tonal-parseable symbol; jazz glyphs
// (ø, °, △) are render-only. Notes, Roman numerals, and scales are DERIVED on
// demand in lib/music — never stored here (§4.1).
//
// Bump SCHEMA_VERSION on any breaking change so Firestore migrations stay possible.

export const SCHEMA_VERSION = 1

export interface TimeSignature {
  numerator: number // e.g. 4, 6, 5
  denominator: number // e.g. 4, 8, 2
}

export interface Chord {
  /* Tonal symbol — the single source of truth.
  * Ex: "Cmaj7", "Dm7"
  * Don't store the jazz glyph here (no ø, °, △)
  */
  symbol: string
  beats: number
  //User will have the option to choose their own scale
  scaleOverride?: string | null
}

export interface Measure {
  chords: Chord[]
  timeSignature?: TimeSignature
  // A section, B section, etc.
  rehearsalMark?: string

  // needs future updates
  startsRepeat?: boolean // open repeat |: begins on this bar
  endsRepeat?: boolean // close repeat :| ends on this bar
  ending?: number // volta: 1 = first ending, 2 = second ending, ...
  hasCoda?: boolean // coda sign on this bar
  hasSegno?: boolean // segno sign on this bar
  jump?: 'fine' | 'toCoda' | 'DC' | 'DS' | 'DCalCoda' | 'DSalCoda' // taken at bar end
}

// Key-center annotation
export interface KeyCenter {
  key: string // Tonal key, e.g. "Bb major", "G minor"
  startMeasure: number // inclusive, 0-based
  endMeasure: number // inclusive, 0-based
}

export interface Chart {
  schemaVersion: number
  id: string // uuid; Firestore doc id
  title: string
  composer?: string
  /** Tune's main key (Tonal), e.g. "F major". Roman numerals render relative to this */
  key: string
  /** Starting/default meter; a per-bar `timeSignature` overrides from that bar onward */
  timeSignature: TimeSignature
  measures: Measure[]
  /** Manual key-center overlay used for color-coding and the under-row indicators. */
  keyCenters?: KeyCenter[]
  createdAt: number
  updatedAt: number
}
