import React, { useState } from 'react'

import {
  Chart,
  PieSeries,
  Legend,
  Tooltip,
  Title,
} from '@devexpress/dx-react-chart-material-ui'
import { Animation, EventTracker, Palette } from '@devexpress/dx-react-chart'
import {
  schemeCategory10,
  schemeAccent,
  schemeDark2,
  schemePaired,
  schemePastel1,
  schemePastel2,
  schemeSet1,
  schemeSet2,
  schemeSet3,
} from 'd3-scale-chromatic'

import { ExpensesChartProps } from '../../types/ui'

import './style.scss'

const schemeCollection = [
  schemeCategory10,
  schemeAccent,
  schemeDark2,
  schemePaired,
  schemePastel1,
  schemePastel2,
  schemeSet1,
  schemeSet2,
  schemeSet3,
]

const chartRootStyle = {
  flexGrow: 0,
}

const ChartRoot = (props: any) => (
  <Legend.Root {...props} style={chartRootStyle} className="chart-root" />
)
const pointComponentRoot = (props: any) => ( <PieSeries.Point {...props} className="pieseries"/> )
const legendLabelComponent = (props: any) => ( <Legend.Label {...props} className="label-text"/> )

export default function ExpensesChart({
  chartData,
  year,
  month,
}: ExpensesChartProps) {
  const [scheme, setScheme] = useState(schemeCollection[3])

  return (
    <Chart data={chartData} height={240}>
      <Palette
        scheme={scheme}
        // name="category"
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
