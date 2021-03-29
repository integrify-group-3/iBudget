import React from 'react'

import {
  Chart,
  PieSeries,
  Legend,
  Tooltip,
  Title,
} from '@devexpress/dx-react-chart-material-ui'
import { Animation } from '@devexpress/dx-react-chart'
import { EventTracker } from '@devexpress/dx-react-chart'
import { Palette } from '@devexpress/dx-react-chart'

import { IncomeChartDataProps } from '../../types'

import './style.scss'

const legendLabelComponent = (props: any) => (
  <Legend.Label {...props} className="label-text" />
)

export default function IncomeMonthlyChart({
  chartData,
  month,
  year,
}: IncomeChartDataProps) {
 console.log(chartData)
  return (
    <Chart data={chartData} height={240}>
      <Palette 
      scheme={chartData.map((data) => data.color)}
       /> 
      <PieSeries
        valueField="amount"
        argumentField="category"
        name="category"
        innerRadius={0.5}
        outerRadius={0.9}
      />
      <Legend labelComponent={legendLabelComponent} />
      {/* <Title text={`Income Chart ${month} ${year}`} /> */}
      <EventTracker />
      <Tooltip />
      <Animation />
    </Chart>
  )
}
