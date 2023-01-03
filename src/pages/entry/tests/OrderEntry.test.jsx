import { render, screen } from '@testing-library/react'
import OrderEntry from '../OrderEntry'
import { rest } from 'msw'
import { server } from '../../../mocks/server'

test('handles error for scoops and toppings routes', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3000/scoops', (_req, res, ctx) => 
      res(ctx.status(500))
    ),
    rest.get('http://localhost:3000/toppings', (_req, res, ctx) => 
      res(ctx.status(500)))
  )

  render(<OrderEntry />)

  const alerts = await  screen.findAllByRole('alert', { 
    name: 'An unexpected error occurred. Please try agaian later.', 
  })
  expect(alerts).toHaveLength(2)
})
