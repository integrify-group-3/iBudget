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

export default function IncomeExpensesMonthChart({
    data,
    year,
    month
}: IncomeExpensesMonthChartProps) {
  
  return (
    <Paper className="chart-container">
        <Chart data={data}>
          <ArgumentScale factory={scaleBand} />
          <ArgumentAxis />
          <ValueAxis />
          <BarSeries valueField="income" argumentField="month" name="Income" />
          <BarSeries
            valueField="expenses"
            argumentField="month"
            name="Expenses"
          />
          <Stack />
          <EventTracker />
          <Tooltip />
          <Legend />
          <Title text={`Expenses/Income for ${month} ${year}`} />
          <Animation /> 
        </Chart>
     
    </Paper>
  )
}
