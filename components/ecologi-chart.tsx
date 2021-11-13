import {
  Cell,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ChartType } from '../models/chart-type-model'
import Common from '../constants/common'

type Props = {
  chartType: ChartType
  data: any
  primaryDataKey: string
  labelKey: string
}

const EcologiChart = ({
  chartType,
  data,
  primaryDataKey,
  labelKey,
}: Props): JSX.Element => {
  const HEIGHT = chartType === 'line' ? 300 : 350

  return (
    <ResponsiveContainer width="100%" height={HEIGHT}>
      {chartType === 'line' ? (
        <LineChart data={data}>
          <Line
            dataKey={primaryDataKey}
            dot={false}
            isAnimationActive={false}
            stroke="#035f48"
            strokeWidth={2}
            type="monotone"
          />
          <Tooltip />
          <XAxis dataKey={labelKey} />
          <YAxis allowDataOverflow domain={[0, 300]} width={50} />
        </LineChart>
      ) : (
        <PieChart margin={{ top: 30, right: 30, bottom: 30, left: 30 }}>
          <Pie
            data={data}
            dataKey={primaryDataKey}
            isAnimationActive={false}
            innerRadius="45%"
            label
            nameKey="year"
            outerRadius="82%"
            paddingAngle={10}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={Common.PIE_CHART_COLORS[i]} />
            ))}
            <LabelList dataKey="year" />
          </Pie>
        </PieChart>
      )}
    </ResponsiveContainer>
  )
}

export default EcologiChart
