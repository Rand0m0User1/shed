type Clef = 'treble' | 'bass'

// Turns scientific-pitch notes from lib/music (e.g. "F4", "Bb4", "G#5") into an
// abc string. Octaves are explicit in the input, so there's no octave guessing;
// no key signature either (explicit accidentals).
export function notesToAbc(notes: string[], options: { clef: Clef }): string {
  const tokens = notes.map(toAbcToken).filter((token) => token !== '')
  return [
    'X:1',
    'M:none',
    'L:1/4',
    `K:C clef=${options.clef}`,
    tokens.join(' '),
  ].join('\n')
}

function toAbcToken(scientificNote: string): string {
  const match = scientificNote.match(/^([A-G])([b#]*)(-?\d+)$/)
  if (!match) return ''
  const [, letter, accidental, octaveString] = match
  const octave = Number(octaveString)
  const abcAccidental = accidental.replace(/b/g, '_').replace(/#/g, '^')
  // octave 4 = bare uppercase (C), 5 = lowercase (c), then commas down / apostrophes up.
  const pitch =
    octave >= 5
      ? letter.toLowerCase() + "'".repeat(octave - 5)
      : letter + ','.repeat(4 - octave)
  return abcAccidental + pitch
}
