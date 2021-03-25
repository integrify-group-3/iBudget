import React, { useState } from 'react'
import { Paper } from '@material-ui/core'
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  Legend,
  SplineSeries,
  BarSeries,
  Tooltip,
  Title,
} from '@devexpress/dx-react-chart-material-ui'
import { EventTracker, Animation } from '@devexpress/dx-react-chart'
import { scaleBand } from '@devexpress/dx-chart-core'
import { ArgumentScale, Stack } from '@devexpress/dx-react-chart'

import { IncomeExpensesYearChartProps } from '../../types'
import SwitchChartBtn from '../../components/SwitchChartBtn'

export default function IncomeExpensesYearChart({
  data,
  year,
}: IncomeExpensesYearChartProps) {

  const [switchChart, setSwitchChart] = useState(false)
  const switchChartView = () => {
    setSwitchChart(!switchChart)
  }
  const lineChartText = 'Line Chart'
  const barChartText = 'Bar Chart'

  return (
    <Paper className="chart-container">
      {!switchChart ? (
        <Chart data={data} height={450}>
          <ArgumentScale factory={scaleBand} />
          <ArgumentAxis />
          <ValueAxis />
          <BarSeries 
            valueField="income" 
            argumentField="month" 
            name="Income" 
            color="#5cddff"
          />
          <BarSeries
            valueField="expenses"
            argumentField="month"
            name="Expenses"
            color="#e51a60"
          />
          <Stack />
          <EventTracker />
          <Tooltip />
          <Legend />
          <Title text={`Expenses/Income for ${year}`} />
          <SwitchChartBtn
            switchChartView={switchChartView}
            btnText={lineChartText}
          />

          {/* <Animation />   */}
        </Chart>
      ) : (
        <Chart data={data}>
          <ArgumentAxis />
          <ValueAxis />
          <SplineSeries
            valueField="income"
            name="income"
            argumentField={`month`}
          />
          <SplineSeries
            valueField="expenses"
            name="expenses"
            argumentField={`month`}
          />
          <EventTracker />
          <Tooltip />
          <Legend />
          <Title text={`Expenses/Income for ${year}`} />
          <SwitchChartBtn
            switchChartView={switchChartView}
            btnText={barChartText}
          />

          {/* <Animation />  */}
        </Chart>
      )}
    </Paper>
  )
}
