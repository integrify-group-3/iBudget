import React, { useState } from 'react'
import { Paper } from '@material-ui/core'
import Button from '@material-ui/core/Button'
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
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  switchChartBtn: {
    padding: '.4rem',
    cursor: 'pointer',
    backgroundColor: 'blue',
    color: 'white',
  },
}))
export default function IncomeExpensesYearChart(props: any) {
  console.log(props.data)
  const classes = useStyles()
  const [switchChart, setSwitchChart] = useState(false)
  const switchChartView = () => {
    setSwitchChart(!switchChart)
  }

  return (
    <Paper className="chart-container">
      {!switchChart ? (
        <Chart data={props.data}>
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
          <Title text={`Expenses/Income for ${props.year}`} />
          <Button variant="outlined" color="primary" onClick={switchChartView}>
            Line Chart
          </Button>
          {/* <Animation /> */}
        </Chart>
      ) : (
        <Chart data={props.data}>
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
          <Title text={`Expenses/Income for ${props.year}`} />
          <Button variant="outlined" color="primary" onClick={switchChartView}>
            Bar Chart
          </Button>
          {/* <Animation /> */}
        </Chart>
      )}
    </Paper>
  )
}
