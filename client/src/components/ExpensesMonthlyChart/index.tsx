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
  /*   fontSize: '10px',
  marginLeft: '1.3rem',
  height: '200px',
  width: '437px' */
  flexGrow: 'no !important',
}

const chartRoot = (props: any) => (
  <Legend.Root {...props} style={chartRootStyle} /*className="chart-root" */ />
)
const pointComponentRoot = (props: any) => (
  <PieSeries.Point {...props} className="pieseries" />
)
const legendLabelComponent = (props: any) => (
  <Legend.Label {...props} className="label-text" />
)

export default function ExpensesChart({
  chartData,
  year,
  month,
}: ExpensesChartProps) {
  return (
    <Chart data={chartData} height={239} width={400} rootComponent={chartRoot}>
      <Palette scheme={chartData.map((data) => data.color)} />
      <PieSeries
        valueField="amount"
        argumentField="category"
        name="category"
        innerRadius={0.3}
        outerRadius={0.7}
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
