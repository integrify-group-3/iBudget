import React from 'react'
import { Paper } from '@material-ui/core'
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  Legend,
  BarSeries,
  Tooltip,
  Title,
} from '@devexpress/dx-react-chart-material-ui'
import { EventTracker, Animation } from '@devexpress/dx-react-chart'
import { scaleBand } from '@devexpress/dx-chart-core'
import { ArgumentScale, Stack } from '@devexpress/dx-react-chart'
import { IncomeExpensesMonthChartProps } from '../../types'
import { mobileScreen } from '../../utils/windowSize'

export default function IncomeExpensesMonthChart({
  data,
  year,
  month,
}: IncomeExpensesMonthChartProps) {
  const titleStyle = {
    fontSize: '18px',
  }
  const barSeriesStyle = {
    borderRadius: '20px',
  }
  const title = (props: any) => <Title.Text {...props} style={titleStyle} />
  const barChartRoot = (props: any) => (
    <BarSeries.Point {...props} style={barSeriesStyle} />
  )
  return (
    <Paper className="chart-container">
      <Chart data={data} height={mobileScreen ? 320 : 500}>
        <ArgumentScale factory={scaleBand} />
        <ArgumentAxis />
        <ValueAxis />
        <BarSeries
          valueField="income"
          argumentField="month"
          name="Income"
          color="#2E5090"
          barWidth={0.67}
          pointComponent={barChartRoot}
        />
        <BarSeries
          valueField="expenses"
          argumentField="month"
          name="Expenses"
          color="#FF6666"
          barWidth={0.67}
          pointComponent={barChartRoot}
        />
        <Stack />
        <EventTracker />
        <Tooltip />
        <Legend />
        <Title
          text={`Expenses/Income for ${month} ${year}`}
          textComponent={title}
        />
        <Animation />
      </Chart>
    </Paper>
  )
}
