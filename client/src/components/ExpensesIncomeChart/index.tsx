import * as React from 'react';
import moment from 'moment';
import { Paper } from '@material-ui/core';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
  SplineSeries,
  Tooltip,
  Title
} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker, Animation } from '@devexpress/dx-react-chart';


export default function IncomeExpensesChart(props: any) {
 
  return (
    <Paper className="chart-container"
    >
      <Chart
        data={props.data}
      >
        <ArgumentAxis />
        <ValueAxis />
        <SplineSeries valueField="income" argumentField={`month`} />   
        <SplineSeries valueField="expenses" argumentField={`month`} />   
        <EventTracker />
        <Tooltip />
        <Title text={`Expenses/Income for 2021`} />
        <Animation />
      </Chart>
    </Paper>
  )
  
}

