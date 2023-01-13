# React Testing Library 


# Initial Setup

First of all you need to import render and screen as in the example below. 

The render method renders a React element into the DOM.

The screen object from the React Testing Library (RTL) provides methods for querying the rendered elements of the DOM in order to make assertions about their text content, attributes, and more.

## Example

```javascript=
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Fetch from './fetch'

test('loads and displays greeting', async () => {
  // ARRANGE
  render(<Fetch url="/greeting" />)

  // ACT
  await userEvent.click(screen.getByText('Load Greeting'))
  await screen.findByRole('heading')

  // ASSERT
  expect(screen.getByRole('heading')).toHaveTextContent('hello there')
  expect(screen.getByRole('button')).toBeDisabled()
})
```

It is recommended to use Mock Service Worker library to declaratively mock API communication in your tests instead of stubbing window.fetch, or relying on third-party adapters.

```javascript=
// import API mocking utilities from Mock Service Worker
import {rest} from 'msw'
import {setupServer} from 'msw/node'

// declare which API requests to mock
const server = setupServer(
  // capture "GET /greeting" requests
  rest.get('/greeting', (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(ctx.json({greeting: 'hello there'}))
  }),
)

// establish API mocking before all tests
beforeAll(() => server.listen())
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers())
// clean up once the tests are done
afterAll(() => server.close())

// ...

test('handles server error', async () => {
  server.use(
    // override the initial "GET /greeting" request handler
    // to return a 500 Server Error
    rest.get('/greeting', (req, res, ctx) => {
      return res(ctx.status(500))
    }),
  )

  // ...
})
```

A short guide to all the exported functions in React Testing Library

render const {/* */} = render(Component) returns:
* unmount function to unmount the component
* container reference to the DOM node where the component is mounted
* all the queries from DOM Testing Library, bound to the document so there is no need to pass a node as the first argument (usually, you can use the screen import instead)

```javascript=
import {render, fireEvent, screen} from '@testing-library/react'

test('loads items eventually', async () => {
  render(<Page />)

  // Click button
  fireEvent.click(screen.getByText('Load'))

  // Wait for page to update with query text
  const items = await screen.findAllByText(/Item #[0-9]: /)
  expect(items).toHaveLength(10)
})

```

**Queries**

Basically you need to structure the query as follows:

```javascript=
command[All]byQueryType
```

**command**
get: expect element to be in the DOM
query: expect element not to be in the DOM
find: expect element to appear async

**[All]**
If you include All - expect more than 1 match
If you don't include All - expect only 1 match

**QueryType**
* Role - most preferred because it ensure Accessibility (aria). Roles can be html elements such as button, checkbox, heading (h1) etc.
Also you can include a matcher like this:
```javascript=
const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  })
```

```javascript=
// Matching a string:
getByText('Hello World') // full string match
getByText('llo Worl', {exact: false}) // substring match
getByText('hello world', {exact: false}) // ignore case

// Matching a regex:
getByText(/World/) // substring match
getByText(/world/i) // substring match, ignore case
getByText(/^hello world$/i) // full string match, ignore case
getByText(/Hello W?oRlD/i) // advanced regex
```

* AltText - Images
* Text - display elements

Form Elements:
- PlaceholderText
- LabelText
- DisplayValue



|           |No match |1 match | 1+ match | Await?   |
| --------  | ---     | ---    | -------- | -------- |
| getBy     | throw   |return  | throw    |   No     |
| findBy    | throw   |return  | throw    |   Yes    |
| queryBy   | null    |return  | throw    |   No     |
| getAllBy  | throw   |array   | array    |   No     |
| findAllBy | throw   |array   | array    |   Yes    |
| queryAllBy|   []    |array   | array    |   No     |





**ByLabelText find by label or aria-label text content**
* getByLabelText
* queryByLabelText
* getAllByLabelText
* queryAllByLabelText
* findByLabelText
* findAllByLabelText

**ByPlaceholderText find by input placeholder value**
* getByPlaceholderText
* queryByPlaceholderText
* getAllByPlaceholderText
* queryAllByPlaceholderText
* findByPlaceholderText
* findAllByPlaceholderText

**ByText find by element text content**
* getByText
* queryByText
* getAllByText
* queryAllByText
* findByText
* findAllByText

**ByDisplayValue find by form element current value**
* getByDisplayValue
* queryByDisplayValue
* getAllByDisplayValue
* queryAllByDisplayValue
* findByDisplayValue
* findAllByDisplayValue


**ByAltText find by img alt attribute**
* getByAltText
* queryByAltText
* getAllByAltText
* queryAllByAltText
* findByAltText
* findAllByAltText

**ByTitle find by title attribute or svg title tag**
* getByTitle
* queryByTitle
* getAllByTitle
* queryAllByTitle
* findByTitle
* findAllByTitle
* 
**ByRole find by aria role**
* getByRole
* queryByRole
* getAllByRole
* queryAllByRole
* findByRole
* findAllByRole

**ByTestId find by data-testid attribute**
* getByTestId
* queryByTestId
* getAllByTestId
* queryAllByTestId
* findByTestId
* findAllByTestId