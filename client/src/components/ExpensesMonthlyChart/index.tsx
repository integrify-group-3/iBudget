import React from 'react'

import {
  Chart,
  PieSeries,
  Legend,
  Tooltip,
  Title,
} from '@devexpress/dx-react-chart-material-ui'
import { Animation, EventTracker, Palette } from '@devexpress/dx-react-chart'

import { ExpensesChartProps } from '../../types/ui'

import './style.scss'

const chartRootStyle = {
  flexGrow: 0.55,
}

const chartRoot = (props: any) => (
  <Legend.Root {...props} style={chartRootStyle} className="chart-root" />
)
const pointComponentRoot = (props: any) => ( <PieSeries.Point {...props} className="pieseries"/> )
const legendLabelComponent = (props: any) => ( <Legend.Label {...props} className="label-text"/> )

export default function ExpensesChart({
  chartData,
  year,
  month,
}: ExpensesChartProps) {
  return (
    <Chart data={chartData} height={240} rootComponent={chartRoot}>
      <Palette
       scheme={chartData.map((data) => data.color)}
      />
      <PieSeries
        valueField="amount"
        argumentField="category"
        name="category"
        innerRadius={0.5}
        outerRadius={0.9}
        pointComponent={pointComponentRoot}
      />
      <Legend labelComponent={legendLabelComponent} />
      {/* <Title text={`Expenses Chart ${month} ${year}`} /> */}
      <EventTracker />
      <Tooltip />
      <Animation />
    </Chart>
  )
}
