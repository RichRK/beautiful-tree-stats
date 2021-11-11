import 'tailwindcss/tailwind.css'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import EcologiLineChart from '../components/ecologi-line-chart'
import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import TreeDates from '../data/trees.json'
import { produceChartData } from '../services/treeService'
import TreeDate from '../models/treeDateModel'

export const Home = (): JSX.Element => {
  const [duration, setDuration] = useState('all time')
  const [treeData, setTreeData] = useState(null)

  const dateRanges = ['all time', '2021', '2020', '2019']

  useEffect(() => {
    const data = produceChartData(TreeDates)
    setTreeData(data)
  }, [])

  // useEffect(() => {
  //   console.log(treeData)
  // }, [treeData])

  const getXAxisKey = (data: TreeDate): string => {
    return data.date.toLocaleString()
  }

  const handleDurationChange = (event: SelectChangeEvent): void => {
    setDuration(event.target.value)
  }

  return (
    <div className="bg-ecologi-brown w-100 px-12 min-h-screen font-body flex flex-col items-center">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-12 max-w-full flex flex-col items-center">
        <h1 className="text-6xl text-center leading-tight m-0 mb-6">
          Welcome to Ecologi Tree Stats!
        </h1>

        <p className="text-2xl mb-10 text-center">
          Here you can find our latest tree planting numbers.
        </p>

        <Select
          className="self-end"
          disabled={!treeData}
          label="Duration"
          onChange={handleDurationChange}
          value={duration}
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
          data={treeData}
          lineKey="quantity"
          xAxisKey={getXAxisKey}
        />
      </main>
    </div>
  )
}

export default Home
