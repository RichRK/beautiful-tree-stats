import { DateTime } from 'luxon'
import TreeDate from '../models/treeDateModel'
import Common from '../constants/common'

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

export const determineUniqueYears = (treeData: TreeDate[]): string[] => {
  const uniqueYears: Set<string> = new Set()

  treeData.forEach((treeDate) => {
    uniqueYears.add(treeDate.date.year.toString())
  })

  if (uniqueYears.size) {
    const yearsForDisplay = Array.from(uniqueYears).sort().reverse()
    yearsForDisplay.unshift(Common.FULL_DURATION_TEXT)
    return yearsForDisplay
  } else {
    return ['']
  }
}

export const filterTreeData = (treeData: TreeDate[], dateRange: string): TreeDate[] => {
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
