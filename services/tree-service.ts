import { DateTime } from 'luxon'
import TreeDate from '../models/tree-date-model'
import TreesByYear from '../models/trees-by-year-model'

export const determineMostPlantedInOneDay = (treeData: TreeDate[]): number => {
  let mostPlanted = 0
  treeData.forEach((treeDate) => {
    if (treeDate.quantity > mostPlanted) {
      mostPlanted = treeDate.quantity
    }
  })
  return mostPlanted
}

export const determineTotalTreesPlanted = (treeData: TreeDate[]): number => {
  let totalTrees = 0
  treeData.forEach((treeDate) => {
    totalTrees += treeDate.quantity
  })
  return totalTrees
}

export const determineTreesByYear = (
  treeData: TreeDate[],
  years: number[]
): TreesByYear[] => {
  const yearlyTotals: any = {}

  years.forEach((year) => {
    yearlyTotals[year] = 0
  })

  treeData.forEach((treeDate) => {
    yearlyTotals[treeDate.date.year] += treeDate.quantity
  })

  const treesByYear = Object.entries(yearlyTotals).map(
    ([year, quantity]: [string, number]) => ({
      year: year,
      quantity: quantity,
    })
  )
  
  return treesByYear
}

export const determineUniqueYears = (treeData: TreeDate[]): number[] => {
  const uniqueYears: Set<number> = new Set()
  treeData.forEach((treeDate) => {
    uniqueYears.add(treeDate.date.year)
  })
  return Array.from(uniqueYears)
}

export const filterTreeData = (
  treeData: TreeDate[],
  dateRange: string
): TreeDate[] => {
  const isANumber = !!parseInt(dateRange)

  if (isANumber) {
    const newData = treeData.filter(
      (treeDate) => treeDate.date.year == parseInt(dateRange)
    )
    return newData
  } else {
    return [...treeData]
  }
}

export const produceTreeData = (treeDates: number[][]): TreeDate[] => {
  const massagedTreeDates = {}
  const treeData = []

  treeDates.forEach((treeDatePair) => {
    const [quantity, unixEpoch] = treeDatePair

    massagedTreeDates[unixEpoch]
      ? (massagedTreeDates[unixEpoch] += quantity)
      : (massagedTreeDates[unixEpoch] = quantity)
  })

  Object.entries(massagedTreeDates).forEach(([unixEpoch, quantity]) => {
    const date = DateTime.fromSeconds(parseInt(unixEpoch))
    treeData.push({ date: date, quantity: quantity })
  })

  return treeData
}
