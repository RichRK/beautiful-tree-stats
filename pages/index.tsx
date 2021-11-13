import 'tailwindcss/tailwind.css'
import Common from '../constants/common'
import {
  determineMostPlantedInOneDay,
  determineTotalTreesPlanted,
  determineTreesByYear,
  determineUniqueYears,
  filterTreeData,
  produceTreeData,
} from '../services/tree-service'
import EcologiChart from '../components/ecologi-chart'
import Head from 'next/head'
import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import RawData from '../data/trees.json'
import StatisticCard from '../components/statistic-card'
import TreeDate from '../models/tree-date-model'
import TreesByYear from '../models/trees-by-year-model'
import { useEffect, useState } from 'react'

export const Home = (): JSX.Element => {
  const [dateRanges, setDateRanges] = useState<string[]>([])
  const [filteredTreeData, setFilteredTreeData] = useState<TreeDate[]>([])
  const [mostPlantedInOneDay, setMostPlantedInOneDay] = useState<number>(0)
  const [selectedDateRange, setSelectedDateRange] = useState<string>('')
  const [totalTreesPlanted, setTotalTreesPlanted] = useState<number>(0)
  const [treeData, setTreeData] = useState<TreeDate[]>([])
  const [treesByYear, setTreesByYear] = useState<TreesByYear[]>([])
  const [uniqueYears, setUniqueYears] = useState<number[]>([])

  useEffect(() => {
    setTreeData(produceTreeData(RawData))
  }, [])

  useEffect(() => {
    if (treeData.length) {
      setFilteredTreeData(treeData)
      setUniqueYears(determineUniqueYears(treeData))
      setTotalTreesPlanted(determineTotalTreesPlanted(treeData))
      setMostPlantedInOneDay(determineMostPlantedInOneDay(treeData))
    }
  }, [treeData])

  useEffect(() => {
    if (uniqueYears.length) {
      const yearsForDisplay = uniqueYears
        .map((year) => year.toString())
        .sort()
        .reverse()
      yearsForDisplay.unshift(Common.FULL_DURATION_TEXT)
      setDateRanges(yearsForDisplay)
      // Also determining 'trees by year' here too, for the pie chart
      setTreesByYear(determineTreesByYear(treeData, uniqueYears))
    }
  }, [uniqueYears])

  useEffect(() => {
    if (dateRanges.length) {
      setSelectedDateRange(Common.FULL_DURATION_TEXT)
    }
  }, [dateRanges])

  useEffect(() => {
    setFilteredTreeData(filterTreeData(treeData, selectedDateRange))
  }, [selectedDateRange])

  const getXAxisKey = (data: TreeDate): string => {
    return data.date.toLocaleString()
  }

  const handleDurationChange = (event: SelectChangeEvent): void => {
    setSelectedDateRange(event.target.value)
  }

  return (
    <div className="bg-ecologi-brown w-100 px-12 min-h-screen font-body flex flex-col items-center">
      <Head>
        <title>Ecologi Tree Stats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="pt-12 pb-24 max-w-full flex flex-col items-center">
        <h1 className="text-6xl text-center leading-tight m-0 mb-6">
          Welcome to Ecologi Tree Stats!
        </h1>

        <h2 className="text-2xl mb-10 text-center">
          Here you can find our latest tree planting numbers.
        </h2>

        <Select
          className="self-end mb-8"
          disabled={!treeData}
          label="Duration"
          onChange={handleDurationChange}
          value={selectedDateRange}
          variant="outlined"
        >
          {dateRanges.map((dateRange, i) => {
            return (
              <MenuItem key={i} value={dateRange}>
                {dateRange}
              </MenuItem>
            )
          })}
        </Select>

        <EcologiChart
          chartType="line"
          data={filteredTreeData}
          primaryDataKey="quantity"
          labelKey={getXAxisKey}
        />

        <p className="mt-8 text-gray-600 text-sm text-center">
          {
            "(Some days exceed the graph's scale, for better overall legibility.)"
          }
        </p>

        <div className="w-full my-16 grid grid-cols-2 gap-4 md:gap-10">
          <StatisticCard
            amount={totalTreesPlanted}
            title="Total trees planted"
          />
          <StatisticCard
            amount={mostPlantedInOneDay}
            title="Most trees planted in one day"
          />
          <StatisticCard
            amount={1450}
            emoji="🌵"
            title="Known species of cacti"
          />
          <StatisticCard
            amount={35000}
            emoji="🦓"
            title="Estimated population of mountain zebras"
          />
        </div>

        <h2 className="italic text-2xl mb-10 text-center">
          Trees planted per year:
        </h2>

        <EcologiChart
          chartType="pie"
          data={treesByYear}
          primaryDataKey="quantity"
          labelKey="year"
        />
      </main>
    </div>
  )
}

export default Home
