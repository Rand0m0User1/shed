import { useParams } from 'react-router'
import ChartView from '@/features/chart-view/components/ChartView'
import { getSampleChartById } from '@/lib/music/fixtures/sampleCharts'

function ChartPage() {
  const { chartId } = useParams()
  const chart = chartId ? getSampleChartById(chartId) : undefined

  if (!chart) {
    return (
      <p className="p-4 text-center text-muted-foreground">Chart not found.</p>
    )
  }

  return <ChartView chart={chart} />
}

export default ChartPage
