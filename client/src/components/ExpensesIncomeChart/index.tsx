import * as React from 'react';
import { Paper } from '@material-ui/core';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  Legend,
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
        <SplineSeries valueField="income" name="income" argumentField={`month`} />   
        <SplineSeries valueField="expenses" name="expenses" argumentField={`month`} />   
        <EventTracker />
        <Tooltip />
        <Legend />
        <Title text={`Expenses/Income for 2021`} />
        <Animation />
      </Chart>
    </Paper>
  )
  
}

