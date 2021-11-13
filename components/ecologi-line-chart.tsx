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
  lineKey: string
  xAxisKey: string
}

const EcologiLineChart = ({ data, lineKey, xAxisKey }: Props): JSX.Element => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart width={400} height={400} data={data}>
        <Line
          dataKey={lineKey}
          dot={false}
          isAnimationActive={false}
          stroke="#035f48"
          strokeWidth={2}
          type="monotone"
        />
        <Tooltip />
        <XAxis dataKey={xAxisKey} />
        <YAxis allowDataOverflow={true} domain={[0, 300]} width={50} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default EcologiLineChart
