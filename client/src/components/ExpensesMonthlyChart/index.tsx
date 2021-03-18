import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'

import {
  Chart,
  PieSeries,
  PieSeriesProps,
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
import { ExpensesChartProps } from '../../types/ui'

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
  root: {
    height: '100px',
  },
  chartContainer: {
    height: '10rem',
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
  pieChart: {
    width: '20%,',
  },
}))

export default function ExpensesChart({
  chartData,
  year,
  month,
}: ExpensesChartProps) {
  const [scheme, setScheme] = useState(schemeCollection[3])

  const changeScheme = (e: any) => {
    setScheme(schemeCollection[e.target.value])
  }
  const classes = useStyles()

  return (
    <Chart data={chartData}>
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
      <Title text={`Expenses Chart ${month} ${year}`} />
      <EventTracker />
      <Tooltip />
      <Animation />
    </Chart>
  )
}
