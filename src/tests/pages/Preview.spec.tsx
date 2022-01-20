import { render, screen } from "@testing-library/react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { mocked } from "ts-jest/utils";
import PostPreview, { getStaticPaths, getStaticProps } from "../../pages/posts/preview/[slug]";
import Post, { getServerSideProps } from "../../pages/posts/[slug]";
import { getPrismicClient } from "../../service/primic";


jest.mock("next-auth/react")
jest.mock("../../service/primic")
jest.mock("next/router")
jest.mock("prismic-dom", () => ({
    RichText: {
        asText: (text: string) => text,
        asHtml: (text: string) => text,
    }
}))
describe("Posts page", () => {

    const mockScreen = (subscribe: boolean) => {
        const useSessionMock = mocked(useSession)

        useSessionMock.mockReturnValueOnce({
            data: { activeSubscription: subscribe }
        } as any)

        const useRouterMock = mocked(useRouter)

        const pushMock = jest.fn(async (url, as, options) => { return false })

        useRouterMock.mockReturnValueOnce({
            push: pushMock
        } as any)
        return pushMock
    }

    it('render correctly subscribe', () => {

        const pushMock = mockScreen(true);

        render(<PostPreview post={{
            content: "content",
            slug: "slug",
            title: "title",
            updatedAt: "21/05/1998"
        }} />)

        expect(screen.getByText("title"))
            .toBeInTheDocument()
        expect(pushMock)
            .toBeCalled()
    })


    it('render correctly not subscribe', () => {

        const pushMock = mockScreen(false);

        render(<PostPreview post={{
            content: "content",
            slug: "slug",
            title: "title",
            updatedAt: "21/05/1998"
        }} />)

        expect(screen.getByText("title"))
            .toBeInTheDocument()
        expect(pushMock)
            .toBeCalledTimes(0)
    })

    const mockPrimicClient = (func: any, key: string) => {
        const getPrismicClientMock = mocked(getPrismicClient);

        const funcMock = jest.fn(func)

        getPrismicClientMock.mockReturnValueOnce({
            [key]: funcMock
        } as any)

    }

    it('load path', async () => {

        mockPrimicClient((a, b) => ({ results: [] }), "query")

        const res = await getStaticPaths(null)

        expect(res)
            .toEqual({
                paths: [],
                fallback: 'blocking'
            })
    })

    it('load initial data', async () => {

        mockPrimicClient((a, b, c) => ({
            data: {
                title: "title",
                content: [],
            },
            last_publication_date: "2021-11-12"
        }), "getByUID")


        const res = await getStaticProps({ req: {}, params: { slug: "slug" } } as any)

        expect(res)
            .toEqual({
                props: {
                    post: {
                        slug: "slug",
                        title: "title",
                        content: [],
                        updatedAt: "11 de novembro de 2021"
                    }
                },
                revalidate: 60 * 60 * 24 // 24h
            })
    })
})