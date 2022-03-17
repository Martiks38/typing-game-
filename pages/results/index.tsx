import { useLayoutEffect, useState } from 'react'
import Head from 'next/head'
import { useTranslations } from 'hooks/useTranslations'
import TableBody from 'components/TableBody'
import type { savedResult } from 'types'

function Results() {
  const [results, setResults] = useState<savedResult[]>()
  const [bestResult, setBestResult] = useState('')

  const { navHeader, resultsPage } = useTranslations()

  useLayoutEffect(() => {
    document.querySelector('.container')?.classList.add('container_viewResults')

    let res = localStorage.getItem('resultsTypingSo')

    if (res) {
      let objRes = JSON.parse(res)

      setResults(objRes)

      let arrWPM: number[] = objRes.map((el: savedResult) => el.wpm)
      let ind = arrWPM.indexOf(Math.max(...arrWPM))

      setBestResult(
        `wpm: ${objRes[ind].wpm} - ${resultsPage.stats[1]}: ${objRes[ind].errors}`
      )
    }

    return () =>
      document
        .querySelector('.container')
        ?.classList.remove('container_viewResults')
  }, [resultsPage])

  return (
    <>
      <Head>
        <title>{navHeader[2]}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content={navHeader[2]} />
        <meta
          property="og:description"
          content="Mira tu progreso a través de los resultados de tus práticas diarias"
        />
        <meta property="type" content="website" />
        <meta property="url" content="http://localhost:3000/results" />
        <meta property="site_name" content="TypingSo" />
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      {results && (
        <>
          <header>
            <h1 className="container__title">{resultsPage.title}</h1>
          </header>
          <p className="results__text">
            {resultsPage.bestResult}: {bestResult}
          </p>
          <div className="container__results">
            {results.map((result) => (
              <table
                key={Math.floor(Date.now() * Math.random())}
                className="results__table"
              >
                <TableBody results={result} short />
              </table>
            ))}
          </div>
          <footer className="footer footer_warning">
            <small>{resultsPage.warningMessage}</small>
          </footer>
        </>
      )}
      {!results && <h1>{resultsPage.withoutResults}</h1>}
    </>
  )
}

export default Results