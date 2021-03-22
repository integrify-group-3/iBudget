import moment from 'moment'

export const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  export const monthsObj = [
    {name: 'January'},
    {name: 'February'},
    {name: 'March'},
    {name: 'April'},
    {name: 'May'},
    {name: 'June'},
    {name: 'July'},
    {name: 'August'},
    {name: 'September'},
    {name: 'October'},
    {name: 'November'},
    {name: 'December'},
  ]

  export const date = new Date()
  export const formattedCurrentDate = moment(date).format('LL')
  export const year = date.getFullYear() 
  export const monthIndex = date.getMonth()
  export const currentMonth = months[monthIndex]

