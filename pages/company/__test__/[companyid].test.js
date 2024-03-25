// FILEPATH: /c:/Users/kr716/Documents/workspace/projects/zoopcoop/pages/company/__tests__/[companyid].test.js
import { render, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { useRouter } from "next/router"
import CompanyPage from "../[companyid]"

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}))

const server = setupServer(
  rest.get("http://localhost:3001/company/:id", (req, res, ctx) => {
    return res(
      ctx.json({
        id: req.params.id,
        name: "Test Company",
        location: "Test Location",
        description: "Test Description",
        logo: "test-logo.png",
      })
    )
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("CompanyPage", () => {
  it("renders company details correctly", async () => {
    useRouter.mockImplementationOnce(() => ({
      query: { companyid: "1" },
    }))

    render(<CompanyPage />)

    expect(screen.getByText("Loading...")).toBeInTheDocument()

    await screen.findByText("Test Company")

    expect(screen.getByText("Test Company")).toBeInTheDocument()
    expect(screen.getByText("Test Location")).toBeInTheDocument()
    expect(screen.getByText("Test Description")).toBeInTheDocument()
    expect(screen.getByRole("img", { name: "Test Company" })).toHaveAttribute("src", "test-logo.png")
  })

  it("handles server error", async () => {
    server.use(
      rest.get("http://localhost:3001/company/:id", (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )

    useRouter.mockImplementationOnce(() => ({
      query: { companyid: "1" },
    }))

    console.error = jest.fn()

    render(<CompanyPage />)

    expect(screen.getByText("Loading...")).toBeInTheDocument()

    await waitFor(() => expect(console.error).toHaveBeenCalled())
  })
})
