import { useTranslations } from 'hooks/useTranslations'
import RowResult from 'components/TableRow'

function TableBody({ results }) {
  const { practiceResults } = useTranslations()

  return (
    <tbody>
      {Object.values(results).map((value, index) => (
        <RowResult
          key={Date.now() + `${index}`}
          stat={practiceResults.stats[index]}
          value={index < 3 ? value : value + '%'}
        />
      ))}
    </tbody>
  )
}

export default TableBody
