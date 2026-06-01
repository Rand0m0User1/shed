import { SCHEMA_VERSION, type Chart } from '../types'

// Standard Real Book jazz blues in F
//
// (4/4, 12 bars):
//   | F7  | Bb7   | F7    | Cm7 F7 |
//   | Bb7 | Bdim7 | F7    | D7     |
//   | Gm7 | C7    | F7 D7 | Gm7 C7 |
//
export const fBlues: Chart = {
  schemaVersion: SCHEMA_VERSION,
  id: 'f-blues',
  title: 'F Blues',
  key: 'F major',
  timeSignature: { numerator: 4, denominator: 4 },
  measures: [
    { chords: [{ symbol: 'F7', beats: 4 }] }, // 1  I7
    { chords: [{ symbol: 'Bb7', beats: 4 }] }, // 2  IV7 (quick IV)
    { chords: [{ symbol: 'F7', beats: 4 }] }, // 3  I7
    {
      chords: [
        { symbol: 'Cm7', beats: 2 },
        { symbol: 'F7', beats: 2 },
      ],
    }, // 4  ii–V of IV
    { chords: [{ symbol: 'Bb7', beats: 4 }] }, // 5  IV7
    { chords: [{ symbol: 'Bdim7', beats: 4 }] }, // 6  passing dim (B°7)
    { chords: [{ symbol: 'F7', beats: 4 }] }, // 7  I7
    { chords: [{ symbol: 'D7', beats: 4 }] }, // 8  VI7
    { chords: [{ symbol: 'Gm7', beats: 4 }] }, // 9  ii
    { chords: [{ symbol: 'C7', beats: 4 }] }, // 10 V7
    {
      chords: [
        { symbol: 'F7', beats: 2 },
        { symbol: 'D7', beats: 2 },
      ],
    }, // 11 I7 – VI7
    {
      chords: [
        { symbol: 'Gm7', beats: 2 },
        { symbol: 'C7', beats: 2 },
      ],
    }, // 12 ii–V turnaround
  ],
  createdAt: 0,
  updatedAt: 0,
}
