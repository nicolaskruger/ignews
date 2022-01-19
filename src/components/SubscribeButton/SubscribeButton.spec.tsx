import { render, screen, fireEvent } from "@testing-library/react"
import { mocked } from "ts-jest/utils"
import { useSession, signIn, SignInResponse, SessionContextValue } from "next-auth/react"
import { SubscribeButton } from "."
import { NextRouter, useRouter } from "next/router"

jest.mock("next-auth/react")
jest.mock("next/router");
describe("SignInButton component", () => {
    test("sign in button renders correcty whem is authenticated", () => {

        const useSessionMocked = mocked(useSession)

        const useRouterMocked = mocked(useRouter);

        useSessionMocked.mockReturnValueOnce({
            data: {
                expires: "",
                user: {
                    name: "nk",
                }
            },
            status: "authenticated"
        })

        useRouterMocked.mockReturnValueOnce({
            push: async (url, as, options) => { return false }
        } as NextRouter
        )


        render(
            <SubscribeButton />
        )
        expect(screen.getByText("Subscribe now")).toBeInTheDocument()
    })

    test("redirect user to sign in when not authenticated", () => {

        const useSessionMocked = mocked(useSession)

        const useRouterMocked = mocked(useRouter);

        const signInMocked = mocked(signIn);

        useSessionMocked.mockReturnValueOnce({
        } as SessionContextValue
        )

        useRouterMocked.mockReturnValueOnce({
            push: async (url, as, options) => { return false }
        } as NextRouter
        )

        signInMocked.mockReturnValueOnce(
            new Promise(() => {

            })
        )

        render(
            <SubscribeButton />
        )

        const subscribeButton = screen.getByText("Subscribe now");

        fireEvent.click(subscribeButton)
        expect(signInMocked).toHaveBeenCalled()
    })

    test("redirect user to posts in when has already a subscription", () => {

        const useSessionMocked = mocked(useSession)

        const useRouterMocked = mocked(useRouter);

        const signInMocked = mocked(signIn);

        useSessionMocked.mockReturnValueOnce({
            data: {
                expires: "",
                user: {
                    name: "nk",
                },
                activeSubscription: true,
            },
            status: "authenticated",
        } as SessionContextValue)

        const pushMock = jest.fn(async (url, as, options) => { return false })

        useRouterMocked.mockReturnValueOnce({
            push: pushMock
        } as any
        )

        signInMocked.mockReturnValueOnce(
            new Promise(() => {

            })
        )

        render(
            <SubscribeButton />
        )

        const subscribeButton = screen.getByText("Subscribe now");

        fireEvent.click(subscribeButton)
        expect(pushMock).toHaveBeenCalled()
    })
})