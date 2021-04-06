import React, { useState } from 'react'

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
import { useMediaQuery, useTheme } from '@material-ui/core'

import SwitchChartBtn from '../../components/SwitchChartBtn'
import { IncomeChartData } from '../../types/income'
import { IncomeChartDashboardProps } from '../../types'

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
  flexGrow: 0,
  paddingTop: '10px',
  marginTop: '25px',
}

const pieRootStyle = {
  flexGrow: 0,
  height: '20rem',
}

const ChartRoot = (props: any) => (
  <Legend.Root {...props} style={chartRootStyle} />
)

const PieRoot = (props: any) => <Legend.Root {...props} style={pieRootStyle} />

const legendLabelComponent = (props: any) => (
  <Legend.Label {...props} className="label-text" />
)

export default function IncomeMonthlyChartDashboard({
  chartData,
  year,
  month,
  valueField,
  argumentField,
  name,
}: IncomeChartDashboardProps) {
  const classes = useStyles()
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [switchChart, setSwitchChart] = useState(false)
  const pieChartText = 'Pie Chart'
  const barChartText = 'Bar Chart'

  const switchChartView = () => {
    setSwitchChart(!switchChart)
  }
 
  return (
    <>
      {switchChart ? (
        <div className={classes.chartContainer}>
          <Chart data={chartData}>
            <ArgumentScale factory={scaleBand} />
            <ArgumentAxis />
            <ValueAxis />
            {chartData.map((data: IncomeChartData) => (
              <BarSeries
                valueField={valueField}
                argumentField={argumentField}
                name={data.category}
              />
            ))}

            <Stack
              stacks={[
                { series: [`${valueField}`, `${name}`, `${argumentField}`] },
              ]}
            />
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
          <Chart data={chartData} 
            height={200} 
            width={mobile ? 302 : 500}
            >
            <Palette scheme={chartData.map((data) => data.color)} />
            <PieSeries
              valueField={valueField}
              argumentField={argumentField}
              name={name}
              innerRadius={0.4}
              outerRadius={0.75}
              // innerRadius={0.5}
              // outerRadius={0.9}
            />
            <Legend labelComponent={legendLabelComponent} />
            {/* <SwitchChartBtn
              switchChartView={switchChartView}
              btnText={barChartText}
            />  */}
            <EventTracker />
            <Tooltip />
            <Animation />
          </Chart>
        </div>
      )}
    </>
  )
}
