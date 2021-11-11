import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'

type Props = {
  data: any
  xAxisKey: string
  lineKey: string
}

const EcologiLineChart = ({ data, xAxisKey, lineKey }: Props): JSX.Element => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart width={400} height={400} data={data}>
        <Line
          dataKey={lineKey}
          isAnimationActive={false}
          stroke="#035f48"
          strokeWidth={2}
          type="monotone"
        />
        <Tooltip />
        <XAxis dataKey={xAxisKey} />
        <YAxis width={50} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default EcologiLineChart
