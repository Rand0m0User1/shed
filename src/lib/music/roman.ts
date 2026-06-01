import { Progression } from 'tonal'

// Derives the Roman numeral for a chord relative to the tune's main key.
export function getRomanNumeral(chordSymbol: string, key: string): string {
  // chart.key is a Tonal key string like "F major"; Tonal's
  // toRomanNumerals wants just the tonic ("F" / "Bb").
  const tonic = key.split(' ')[0]
  return Progression.toRomanNumerals(tonic, [chordSymbol])[0]
}
