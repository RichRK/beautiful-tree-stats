import 'tailwindcss/tailwind.css'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import EcologiLineChart from '../components/ecologi-line-chart'
import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import TreeDates from '../data/trees.json'
import { produceChartData } from '../services/treeService'
import TreeDate from '../models/treeDateModel'

export const Home = (): JSX.Element => {
  const ENTIRE_DURATION_TEXT = 'all time'

  const [dateRanges, setDateRanges] = useState<string[]>([])
  const [filteredTreeData, setFilteredTreeData] = useState<TreeDate[]>([])
  const [selectedDateRange, setSelectedDateRange] = useState<string>('')
  const [treeData, setTreeData] = useState<TreeDate[]>([])

  useEffect(() => {
    const data = produceChartData(TreeDates)
    setTreeData(data)
  }, [])

  useEffect(() => {
    determineUniqueYears()

    if (treeData.length) {
      setFilteredTreeData(treeData)
      // console.log(treeData)
    }
  }, [treeData])

  useEffect(() => {
    if (dateRanges.length) {
      setSelectedDateRange(ENTIRE_DURATION_TEXT)
    }
  }, [dateRanges])

  useEffect(() => {
    filterTreeData()
  }, [selectedDateRange])

  const determineUniqueYears = (): void => {
    const uniqueYears: Set<string> = new Set()

    treeData.forEach((treeDate) => {
      uniqueYears.add(treeDate.date.year.toString())
    })

    if (uniqueYears.size) {
      const yearsForDisplay = Array.from(uniqueYears).sort().reverse()
      yearsForDisplay.unshift(ENTIRE_DURATION_TEXT)
      setDateRanges(yearsForDisplay)
    }
  }

  const filterTreeData = (): void => {
    const isANumber = !!parseInt(selectedDateRange)

    if (isANumber) {
      const newData = treeData.filter(
        (treeDate) => treeDate.date.year == parseInt(selectedDateRange)
      )
      setFilteredTreeData(newData)
    } else {
      setFilteredTreeData([...treeData])
    }
  }

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

      <main className="py-12 max-w-full flex flex-col items-center">
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

        <EcologiLineChart
          data={filteredTreeData}
          lineKey="quantity"
          xAxisKey={getXAxisKey}
        />
      </main>
    </div>
  )
}

export default Home
