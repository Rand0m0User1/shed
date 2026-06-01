import { type Chart } from '../types'
import { fBlues } from './fBlues'

// The pre-loaded development charts. For now this is a single
// hardcoded chart; the library/service replaces this
// list and getSampleChartById becomes a Firestore lookup later
export const sampleCharts: Chart[] = [fBlues]

export function getSampleChartById(id: string): Chart | undefined {
  return sampleCharts.find((chart) => chart.id === id)
}
