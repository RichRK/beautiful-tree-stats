import 'tailwindcss/tailwind.css'
import Head from 'next/head'
import { getTrees } from '../services/treeService'
import { useEffect, useState } from 'react'

export const Home = (): JSX.Element => {
  const [treeData, setTreeData] = useState(null)

  useEffect(() => {
    const data = getTrees()
    setTreeData(data)
  }, [])

  useEffect(() => {
    console.log(treeData)
  }, [treeData])

  return (
    <div className="bg-ecologi-brown w-100 px-12 min-h-screen font-body flex flex-col items-center">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-12 flex-1 flex flex-col items-center">
        <h1 className="text-6xl text-center leading-tight m-0 mb-6">
          Welcome to Ecologi Tree Stats!
        </h1>

        <p className="text-2xl text-center">
          Here you can find our latest tree planting numbers.
        </p>
      </main>
    </div>
  )
}

export default Home
