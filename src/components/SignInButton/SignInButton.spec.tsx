import { render, screen } from "@testing-library/react"
import { SignInButton } from "."
import { mocked } from "ts-jest/utils"
import { useSession } from "next-auth/react"
jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: "/"
            }
        }
    }
})
jest.mock("next-auth/react")






describe("SignInButton component", () => {
    test("sign in button renders correcty whem is authenticated", () => {

        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce({
            data: {
                expires: "",
                user: {
                    name: "nk",
                }
            },
            status: "authenticated"
        })

        render(
            <SignInButton />
        )
        expect(screen.getByText("nk")).toBeInTheDocument()
    })
    test("sign in button renders correcty whem is not authenticated", () => {

        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce({
            data: null,
            status: "authenticated"
        })

        render(
            <SignInButton />
        )
        expect(screen.getByText("Sign in with Github")).toBeInTheDocument()
    })
})