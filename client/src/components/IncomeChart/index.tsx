import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
  Legend,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import { Animation, Palette } from '@devexpress/dx-react-chart';

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
} from 'd3-scale-chromatic';

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
];

const demoStyles = (theme: any) => ({
    root: {
        height: '400px'
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
});

const Demo = (props: any) => {
   
  const [scheme, setScheme] = useState(schemeCollection[0])   
  const changeScheme = (e: any) => {
    setScheme(schemeCollection[e.target.value]);
  }
 
    const { classes } = props;
    // console.log('chart data', props.chartData)
    // console.log('values', props.valueField, 'arguments', props.argumentField)
    return (
      <Paper>
        {
            props.chartLoaded ? 
            <>
            <Chart
            data={props.chartData}
            // className={classes.root}
          >
            <Palette scheme={scheme}                   
            // name="category"
 />
            <PieSeries
              valueField={props.valueField}
              argumentField={props.argumentField}
              name={props.name}
            /> 
            <Legend />
            <Title
            text={`Income Chart ${props.month} ${props.year}`}
          />
            <Animation />
          </Chart>
          <div className={classes.schemeConteiner}>
            {scheme.map((color: any) => (
              <div
                key={color}
                className={classes.item}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div className={classes.div}>
            <Typography component="h5" variant="h5" className={classes.typography}>Scheme</Typography>
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
          : 'loading chart'
        } 
      
      </Paper>
    );
}

export default withStyles(demoStyles, { name: 'Demo' })(Demo);