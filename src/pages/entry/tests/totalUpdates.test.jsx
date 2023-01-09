import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Options from '../Options'
import { OrderDetailsProvider } from '../../../contexts/OrderDetails'

test("update scoop total when scoops change", async () => {
  const user = userEvent.setup()
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider })

  // make sure total starts out at $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false })
  expect(scoopsSubtotal).toHaveTextContent("0.00")

  // update vanilla scoops to 1 and check subtotal
  const vanillaInput = await screen.findByRole("spinbutton", { 
    name: "Vanilla", 
  })
  await user.clear(vanillaInput)
  await user.type(vanillaInput, "1")
  expect(scoopsSubtotal).toHaveTextContent("2.00")

  // update chocolate scops to 2 and check subtotal 
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  })
  await user.clear(chocolateInput)
  await user.type(chocolateInput, "2")
  expect(scoopsSubtotal).toHaveTextContent("6.00")
})

test("update toppings subtotal when toppings change", async () => {
  const user = userEvent.setup()
  render(< Options optionType="toppings"/>)

  // make sure total starts at $0.00
  const toppingsTotal = screen.getByText("Toppings total: $:", { exact: false })
  expect(toppingsTotal).toHaveTextContent("0.00")

  // add cherries and check subtotal
  const cherriesCheckboax = await screen.findByRole("checkbox", {
    name: "Cherries",
  })
  await user.click(cherriesCheckboax)
  expect(toppingsTotal).toHaveTextContent("1.50")

  // add hot fudge and check subtotal
  const hotFudgeCheckbox = screen.getByRole("checkbox", { name: "Hot fudge" })
  expect(toppingsTotal).toHaveTextContent("3.00")

  //remove hot fudge and check subtotal
  await user.click(hotFudgeCheckbox)
  expect(toppingsTotal).toHaveTextContent("1.50")

})
