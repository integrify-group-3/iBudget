import React, { useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

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
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import NativeSelect from '@material-ui/core/NativeSelect'
import FormControl from '@material-ui/core/FormControl'
import { Animation } from '@devexpress/dx-react-chart'
import { scaleBand } from '@devexpress/dx-chart-core'
import { ArgumentScale, Stack } from '@devexpress/dx-react-chart'

import { EventTracker } from '@devexpress/dx-react-chart';

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

const demoStyles = (theme: any) => ({
  root: {
    height: '200px',
  },
  chartContainer: {
    height: '10rem'
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
  schemeConteiner: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(1),
  },
  pieChart: {
    height: '5rem,',
  },
})

const ExpensesChart = (props: any) => {
  const [scheme, setScheme] = useState(schemeCollection[7])

  const changeScheme = (e: any) => {
    setScheme(schemeCollection[e.target.value])
  }
  const { classes } = props
  const [switchChart, setSwitchChart] = useState(false)
  const switchChartView = () => {
    setSwitchChart(!switchChart)
  }
  console.log('chart data', props.chartData)
  console.log(props.name)
  // console.log('values', props.valueField, 'arguments', props.argumentField)
  return (
    <Paper>
      { switchChart ?
       <Chart data={props.chartData}>
       <ArgumentScale factory={scaleBand} />
       <ArgumentAxis />
       <ValueAxis />
       
        {/* <BarSeries
         valueField={props.valueField}
         argumentField={props.argumentField}
        name={props.name}
       /> */}

       {
         props.chartData.map((data: any) => (
          <BarSeries
          valueField={props.valueField}
          argumentField={props.argumentField}
         name={data.category}
        />
         ))
       }
      
       
       
       <Stack />
       <EventTracker />
       <Tooltip />
       <Legend />
       <Title text={`Expenses Chart ${props.month} ${props.year}`} />
       <Button variant="outlined" color="primary" onClick={switchChartView}>
         Pie Chart
       </Button>
       <Animation /> 
     </Chart>
     :
     <>
     <Chart
     data={props.chartData}
   >
     <Palette
       scheme={scheme}
       // name="category"
     />
     <PieSeries
       valueField={props.valueField}
       argumentField={props.argumentField}
       name={props.name}
     />
     <Legend />
     <Title text={`Expenses Chart ${props.month} ${props.year}`} />
     <Button variant="outlined" color="primary" onClick={switchChartView}>
         Bar Chart
       </Button>
     <EventTracker />
     <Tooltip />
     <Animation />
   </Chart>
   <div className={classes.schemeConteiner}>
     {scheme.map((color) => (
       <div
         key={color}
         className={classes.item}
         style={{ backgroundColor: color }}
       />
     ))}
   </div>
   <div className={classes.div}>
     <Typography component="h5" variant="h5" className={classes.typography}>
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
      }
     
     
    </Paper>
  )
}

export default withStyles(demoStyles, { name: 'ExpensesChart' })(ExpensesChart)
