import 'tailwindcss/tailwind.css'
import Head from 'next/head'

export const Home = (): JSX.Element => (
  <div className="main-container bg-ecologi-brown">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1 className="title text-center m-0 mb-6">Welcome to Ecologi Tree Stats!</h1>

      <p className="text-2xl text-center">
        Here you can find our latest tree planting numbers.
      </p>

    </main>

    <style jsx>{`
      .main-container {
        width: 100%;
        padding: 0 3rem;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      main {
        padding: 3rem 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .title {
        line-height: 1.15;
        font-size: 4rem;
      }
    `}</style>

    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  </div>
)

export default Home
