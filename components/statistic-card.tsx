type Props = {
  amount: number
  emoji?: string
  title: string
}

const StatisticCard = ({ amount, emoji, title }: Props): JSX.Element => {
  return (
    <div className="flex flex-col justify-center text-center shadow-md border-1 border-gray-400 p-2 sm:p-6 md:p-8 rounded-md">
      <p className="text-4xl md:text-5xl font-bold mb-2 md:mb-3">
        {amount.toLocaleString()}
      </p>
      <div className="flex justify-center">
        <h3 className="italic">
          {title}
          {emoji ? <span className="ml-1.5 not-italic">{emoji}</span> : null}
        </h3>
      </div>
    </div>
  )
}

export default StatisticCard
