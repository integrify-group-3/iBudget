import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'

import {
  Chart,
  PieSeries,
  ValueAxis,
  ArgumentAxis,
  BarSeries,
  Legend,
  Tooltip,
  Title,
} from '@devexpress/dx-react-chart-material-ui'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import NativeSelect from '@material-ui/core/NativeSelect'
import FormControl from '@material-ui/core/FormControl'
import { Animation } from '@devexpress/dx-react-chart'
import { scaleBand } from '@devexpress/dx-chart-core'
import { ArgumentScale, Stack } from '@devexpress/dx-react-chart'
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

import SwitchChartBtn from '../../components/SwitchChartBtn'
import { ExpensesChartData } from '../../types/expenses'
import { ExpensesChartDashboardProps } from '../../types/ui'

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

const useStyles = makeStyles((theme: any) => ({
  chartContainer: {
    height: '265px',
  },
  root: {
    height: '100px',
  },
  typography: {
    marginTop: 0,
    marginBottom: theme.spacing(1),
  },
  div: {
    width: '200px',
    marginLeft: '50px',
    paddingBottom: '30px',
  },
  item: {
    width: '40px',
    height: '40px',
  },
  schemeContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(1),
  },
}))

export default function ExpensesMonthlyChartDashboard({
  chartData,
  year,
  month,
  valueField,
  argumentField,
  name,
}: ExpensesChartDashboardProps) {
  const [scheme, setScheme] = useState(schemeCollection[8])
  const classes = useStyles()
  const [switchChart, setSwitchChart] = useState(false)
  console.log(argumentField, name, argumentField, chartData)
  const switchChartView = () => {
    setSwitchChart(!switchChart)
  }

  const pieChartText = 'Pie Chart'
  const barChartText = 'Bar Chart'

  return (
    <Paper className={classes.chartContainer}>
      {switchChart ? (
        <Chart data={chartData}>
          <ArgumentScale factory={scaleBand} />
          <ArgumentAxis />
          <ValueAxis />
          {chartData.map((data: ExpensesChartData) => (
            <BarSeries
              valueField={valueField}
              argumentField={argumentField}
              name={data.category}
            />
          ))}

          {chartData.map((data: ExpensesChartData) => (
            console.log(data)
            // <Stack stacks={[{ series: [`${data.category}`, `${argumentField}`] }]} />
          ))}
          <Stack />
          <EventTracker />
          <Tooltip />
          <Legend />
          <SwitchChartBtn
            switchChartView={switchChartView}
            btnText={pieChartText}
          /> 
          <Animation />
        </Chart>
      ) : (
        <div className={classes.chartContainer}>
          <Chart data={chartData}>
            <Palette
              scheme={scheme}
              // name="category"
            />
            <PieSeries
              valueField={valueField}
              argumentField={argumentField}
              name={name}
              innerRadius={0.5}
            />
            <Legend />
            <SwitchChartBtn
              switchChartView={switchChartView}
              btnText={barChartText}
            /> 
            <EventTracker />
            <Tooltip />
            <Animation />
          </Chart>
        </div>
      )}
    </Paper>
  )
}
