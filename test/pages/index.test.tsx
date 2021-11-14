import React from 'react'
import { screen, render } from '@testing-library/react'
import { Home } from '../../pages/index'

const page = <Home />

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(page, {})
    expect(asFragment()).toMatchSnapshot()
  })

  it('logo is present', () => {
    render(page)
    const image = screen.getByAltText('Ecologi') as HTMLImageElement
    expect(image.src).toContain('ecologi-logo.svg')
  })
})
