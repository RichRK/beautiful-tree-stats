import React from 'react'
import { screen, render } from '@testing-library/react'
import StatisticCard from '../../components/statistic-card'

const amount = 11
const emoji = '🏞'
const title = 'National parks in France'

const component = <StatisticCard amount={amount} emoji={emoji} title={title} />

describe('StatisticCard component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(component, {})
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders amount and title', () => {
    render(component)
    screen.getByText(title)
    screen.getByText(amount)
  })

  it('emoji is not italicised', () => {
    render(component)
    expect(screen.getByText(emoji).classList.contains('not-italic')).toBe(true)
  })
})
