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
  valueField,
  argumentField,
  name,
}: ExpensesChartProps) {
  const [scheme, setScheme] = useState(schemeCollection[7])

  const changeScheme = (e: any) => {
    setScheme(schemeCollection[e.target.value])
  }
  const classes = useStyles()
  const [switchChart, setSwitchChart] = useState(false)

  const switchChartView = () => {
    setSwitchChart(!switchChart)
  }

  const pieChartText = 'Pie Chart'
  const barChartText = 'Bar Chart'

  return (
    <Paper>
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

          <Stack />
          <EventTracker />
          <Tooltip />
          <Legend />
          <Title text={`Expenses Chart ${month} ${year}`} />
          <SwitchChartBtn
            switchChartView={switchChartView}
            btnText={pieChartText}
          />
          <Animation />
        </Chart>
      ) : (
        <>
          <Chart data={chartData}>
            <Palette
              scheme={scheme}
              // name="category"
            />
            <PieSeries
              valueField={valueField}
              argumentField={argumentField}
              name={name}
              outerRadius={0.4}
              innerRadius={0.1}
            />
            <Legend />
            <Title text={`Expenses Chart ${month} ${year}`} />
            <SwitchChartBtn
              switchChartView={switchChartView}
              btnText={barChartText}
            />
            <EventTracker />
            <Tooltip />
            <Animation />
          </Chart>
          <div className={classes.schemeContainer}>
            {scheme.map((color) => (
              <div
                key={color}
                className={classes.item}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div className={classes.div}>
            <Typography
              component="h5"
              variant="h5"
              className={classes.typography}
            >
              Scheme
            </Typography>
            <FormControl>
              <NativeSelect onChange={changeScheme} defaultValue={0}>
                <option value={0}>schemeCategory10</option>
                <option value={1}>schemeAccent</option>
                <option value={2}>schemeDark2</option>
                <option value={3}>schemePaired</option>
                <option value={4}>schemePastel1</option>
                <option value={5}>schemePastel2</option>
                <option value={6}>schemeSet1</option>
                <option value={7}>schemeSet2</option>
                <option value={8}>schemeSet3</option>
              </NativeSelect>
            </FormControl>
          </div>
        </>
      )}
    </Paper>
  )
}
