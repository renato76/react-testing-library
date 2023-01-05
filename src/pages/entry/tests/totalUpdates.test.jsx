import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Options from '../Options'

test('update scoop total when scoops change', async () => {
  const user = userEvent.setup()
  render(<Options optionType="scoops" />)

  // make sure total starts out at $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false })
  expect(scoopsSubtotal).toHaveTextContent('0.00')

  // update vanilla scoops to 1 and check subtotal
  const vanillaInput = await screen.findByRole('spinbutton', { 
    name: 'Vanilla', 
  })
  await user.clear(vanillaInput)
  await user.type(vanillaInput, "1")
  expect(scoopsSubtotal).toHaveTextContent("2.00")

  // update chocolate scops to 2 and check subtotal 
})