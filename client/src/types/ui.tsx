import { DailyExpense, ExpensesChartData } from './expenses'
import { User } from './user'

export type NavbarSecondaryListItemsProps = {
  user: User
}

export type SwitchChartBtnProps = {
  switchChartView: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  btnText: string
}

export type IncomeTableProps = {
  year: number
  month: string
  monthlyIncome: any
  updateMonthlyIncome: Function
}

export type AddIncomeBtnProps = {
    showFormOnClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export type TileContentProps = {
  date: string
  view: string
  contentData: any
  activeStartDate: any
}

export type EmptyChartContainerProps = {
  month: string
  year: number
}

export type ExpensesTableProps = {
  day: string | Date
  dailyExpense: DailyExpense
  showFormOnClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  updateDailyExpenses: Function
}

export type AddExpenseBtnProps = {
  showFormOnClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export type MonthlyBudgetProps = {
  month: string
  year: number
  totalExpenses: number
}

export type ExpensesChartProps = {
  chartData: ExpensesChartData[]
  year: number
  month: string
  valueField: string
  argumentField: string
  name: string
  className?: string
}
