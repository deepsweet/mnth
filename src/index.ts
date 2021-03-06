import {
  addDays,
  endOfMonth,
  getDay,
  getDaysInMonth,
  setDate,
  startOfMonth
} from 'date-fns'

const DAYS_IN_WEEK = 7

type Options = {
  firstDay: 0 | 1 | 2 | 3 | 4 | 5 | 6
}

const mnth = (date: Date, options?: Options): Date[][] => {
  const { firstDay } = {
    firstDay: 1,
    ...options
  }
  const daysInMonth = getDaysInMonth(date)
  const firstDateOfMonth = startOfMonth(date)
  const lastDateOfMonth = endOfMonth(date)
  const firstDayOfMonth = getDay(firstDateOfMonth)
  const lastDayOfMonth = getDay(lastDateOfMonth)
  const daysToPrepend = (firstDayOfMonth - firstDay + DAYS_IN_WEEK) % DAYS_IN_WEEK
  const daysToAppend = (DAYS_IN_WEEK - 1 - lastDayOfMonth + firstDay) % DAYS_IN_WEEK
  const month: Date[][] = []
  let week: Date[] = []

  for (let i = 1 - daysToPrepend; i <= daysInMonth + daysToAppend + 1; i++) {
    /* istanbul ignore else */
    if (week.length <= 7) {
      if (i <= 0) {
        week.push(
          addDays(firstDateOfMonth, i - 1)
        )
      } else if (i > daysInMonth) {
        week.push(
          addDays(lastDateOfMonth, i - daysInMonth)
        )
      } else {
        week.push(
          setDate(date, i)
        )
      }
    }

    if (week.length === 7) {
      month.push(week)
      week = []
    }
  }

  return month
}

export default mnth
