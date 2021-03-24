import React, { useState } from 'react'

import {
  Chart,
  PieSeries,
  Legend,
  Tooltip,
  Title,
} from '@devexpress/dx-react-chart-material-ui'
import { Animation } from '@devexpress/dx-react-chart'
import { EventTracker } from '@devexpress/dx-react-chart'
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
import { Palette } from '@devexpress/dx-react-chart'

import { IncomeChartDataProps } from '../../types'

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
  <Legend.Root {...props} style={chartRootStyle} />
)

export default function IncomeMonthlyChart({
  chartData,
  month,
  year,
}: IncomeChartDataProps) {
  const [scheme, setScheme] = useState(schemeCollection[3])

  return (
    <Chart data={chartData} rootComponent={ChartRoot}>
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
      />
      <Legend />
      <Title text={`Income Chart ${month} ${year}`} />

      <EventTracker />
      <Tooltip />
      <Animation />
    </Chart>
  )
}
