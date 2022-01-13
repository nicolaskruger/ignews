import { render } from "@testing-library/react"
import { ActiveLink } from "."

jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: "/"
            }
        }
    }
})

describe("ActiveLink component", () => {
    test("active link renders correcty", () => {
        const { getByText } = render(
            <ActiveLink href={"/"} activeClassName="active">
                <a>home</a>
            </ActiveLink>
        )
        expect(getByText("home")).toBeInTheDocument()
    })
    test("active link is receving active class", () => {
        const { getByText } = render(
            <ActiveLink href={"/"} activeClassName="active">
                home
            </ActiveLink>
        )
        expect(getByText("home")).toHaveClass("active")
    })
})
