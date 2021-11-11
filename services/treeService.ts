import { DateTime } from 'luxon'
import TreeDate from '../models/treeDateModel'

export const produceChartData = (treeDates: number[][]): TreeDate[] => {
  const massagedTreeDates = {}
  const chartData = []

  treeDates.forEach((treeDatePair) => {
    const [quantity, unixEpoch] = treeDatePair

    massagedTreeDates[unixEpoch]
      ? (massagedTreeDates[unixEpoch] += quantity)
      : (massagedTreeDates[unixEpoch] = quantity)
  })

  Object.entries(massagedTreeDates).forEach(([unixEpoch, quantity]) => {
    const date = DateTime.fromSeconds(parseInt(unixEpoch))
    chartData.push({ date: date, quantity: quantity })
  })

  return chartData
}
