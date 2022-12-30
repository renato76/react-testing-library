import { rest } from 'msw'

const scoopsEndpoint = "http://localhost:3030/scoops"
const toppingsEndpoint = "http://localhost:3030/toppings"
const orderEndpoint = "http://localhost:3030/order"

export const handlers = [
  rest.get(scoopsEndpoint, (_req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Chocolate", imagePath: "/images/chocolate.png" },
        { name: "Vanilla", imagePath: "/images/vanilla.png" }
      ])
    )
  }),
  rest.get(toppingsEndpoint, (_req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Cherries", imagePath: "/images/cherries.png" },
        { name: "M&Ms", imagePath: "/images/m-and-ms.png" },
        { name: "Hot fudge", imagePath: "/images/hot-fudge.png" }
      ])
    )
  }),
  rest.post(orderEndpoint, (_req, res, ctx) => {
    return res(ctx.json({ orderNumber: 123455676 }))
  })
]