import React from 'react'
import { render } from '@testing-library/react'
import EcologiChart from '../../components/ecologi-chart'
import TreeDate from '../../models/tree-date-model'
import { DateTime } from 'luxon'

const treeData: TreeDate[] = [
  { date: DateTime.now(), quantity: 5 },
  { date: DateTime.now(), quantity: 50 },
  { date: DateTime.now(), quantity: 500 },
]

describe('EcologiChart component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <EcologiChart
        chartType="line"
        data={treeData}
        primaryDataKey="quantity"
        labelKey="date"
      />,
      {}
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
