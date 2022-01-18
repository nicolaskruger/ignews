import { render, screen } from "@testing-library/react"
import { Header } from "."

jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: "/"
            }
        }
    }
})

jest.mock("next-auth/react", () => {
    return {
        useSession() {
            return {
                data: {}
            }
        },
        signIn: () => { },
        signOut: () => { }
    }
})


describe("Header component", () => {
    test("header renders correcty", () => {
        render(
            <Header />
        )
        expect(screen.getByText("home")).toBeInTheDocument()
        expect(screen.getByText("posts")).toBeInTheDocument()
    })
})