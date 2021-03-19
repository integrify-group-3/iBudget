import React, { useState } from 'react'

import {
  Chart,
  PieSeries,
  Legend,
  Tooltip,
  Title,
} from '@devexpress/dx-react-chart-material-ui'
import { makeStyles } from '@material-ui/core/styles'
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

const useStyles = makeStyles((theme: any) => ({
  root: {
    height: '200px',
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
    width: '80%,',
  },
}))

export default function IncomeMonthlyChart({
  chartData,
  month,
  year,
}: IncomeChartDataProps) {
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
            />
            <Legend />
            <Title text={`Income Chart ${month} ${year}`} /> 

            <EventTracker />
            <Tooltip />
            <Animation />
          </Chart>
  )
}
