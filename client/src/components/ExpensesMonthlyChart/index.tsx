import React from 'react'

import {
  Chart,
  PieSeries,
  Legend,
  Tooltip,
  Title,
} from '@devexpress/dx-react-chart-material-ui'
import { Animation, EventTracker, Palette } from '@devexpress/dx-react-chart'
import { makeStyles } from '@material-ui/core/styles'

import { ExpensesChartProps } from '../../types/ui'

import './style.scss'

const useStyles = makeStyles((theme: any) => ({
  chartContainer: {
    height: '243px',
  },
}))

const chartRootStyle = {
  marginLeft: '1.3rem',
  flexGrow: '0 !important',
}

const chartRoot = (props: any) => (
  <Legend.Root {...props} style={chartRootStyle} className="chart-root" />
)

const legendLabelComponent = (props: any) => (
  <Legend.Label {...props} className="label-text" />
)

export default function ExpensesChart({
  chartData,
  year,
  month,
}: ExpensesChartProps) {
  const classes = useStyles()
  return (
    <div className={classes.chartContainer}>
      <Chart
        data={chartData}
        height={200}
        // width={444}
      >
        <Palette scheme={chartData.map((data) => data.color)} />
        <PieSeries
          valueField="amount"
          argumentField="category"
          name="category"
          innerRadius={0.35}
          outerRadius={0.7}
        />
        <Legend labelComponent={legendLabelComponent} />
        {/* <Title text={`Expenses Chart ${month} ${year}`} /> */}
        <EventTracker />
        <Tooltip />
        <Animation />
      </Chart>
    </div>
  )
}
