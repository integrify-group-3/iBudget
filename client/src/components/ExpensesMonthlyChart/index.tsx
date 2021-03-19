import React, { useState } from 'react'

import {
  Chart,
  PieSeries,
  Legend,
  Tooltip,
  Title,
  
} from '@devexpress/dx-react-chart-material-ui'
import { makeStyles } from '@material-ui/core/styles'
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
