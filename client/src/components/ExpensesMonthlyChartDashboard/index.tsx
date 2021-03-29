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
import { Animation } from '@devexpress/dx-react-chart'
import { scaleBand } from '@devexpress/dx-chart-core'
import { ArgumentScale, Stack } from '@devexpress/dx-react-chart'
import { EventTracker } from '@devexpress/dx-react-chart'
import { Palette } from '@devexpress/dx-react-chart'

import SwitchChartBtn from '../../components/SwitchChartBtn'
import { ExpensesChartData } from '../../types/expenses'
import { ExpensesChartDashboardProps } from '../../types/ui'

import './style.scss'

const useStyles = makeStyles((theme: any) => ({
  chartContainer: {
    height: '243px',
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

const chartRootStyle = {
  flexGrow: 0.55,
  fontSize: '10px',
  marginLeft: '1.3rem'
}
const pointRootStyle = {
  height: '12rem'
}

const chartRoot = (props: any) => (
  <Chart.Label {...props} style={chartRootStyle}/>
)

const PieRoot = (props: any) => (
  <PieSeries.Point {...props} style={chartRootStyle}/>
)

const legendLabelComponent = (props: any) => ( <Legend.Label {...props} className="label-text"/> )

export default function ExpensesMonthlyChartDashboard({
  chartData,
  year,
  month,
  valueField,
  argumentField,
  name,
}: ExpensesChartDashboardProps) {
  const classes = useStyles()
  const [switchChart, setSwitchChart] = useState(false)

  const switchChartView = () => {
    setSwitchChart(!switchChart)
  }

  const pieChartText = 'Pie Chart'
  const barChartText = 'Bar Chart'
  
  return (
    <>
      {switchChart ? (
        <div className={classes.chartContainer}>
          <Chart data={chartData} rootComponent={chartRoot}>
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
        </div>
      ) : (
        <div className={classes.chartContainer}>
          <Chart data={chartData} height={200} width={400}>
            <Palette scheme={chartData.map((data) => data.color)} />
            <PieSeries
              valueField={valueField}
              argumentField={argumentField}
              name={name}
              innerRadius={0.5}
              outerRadius={0.9}
              pointComponent={PieRoot}
            />
            <Legend
            labelComponent={legendLabelComponent}/>
            {/* <SwitchChartBtn
              switchChartView={switchChartView}
              btnText={barChartText}
            /> */}
            <EventTracker />
            <Tooltip />
            <Animation />
          </Chart>
        </div>
      )}
    </>
  )
}
