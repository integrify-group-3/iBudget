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

  export const date = new Date()
  export const formattedCurrentDate = moment(date).format('LL')
  export const year = date.getFullYear() 
  export const monthIndex = date.getMonth()
  export const currentMonth = months[monthIndex]

