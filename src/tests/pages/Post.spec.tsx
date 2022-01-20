import { render, screen } from "@testing-library/react";
import { getSession } from "next-auth/react";
import { mocked } from "ts-jest/utils";
import Post, { getServerSideProps } from "../../pages/posts/[slug]";
import { getPrismicClient } from "../../service/primic";


jest.mock("next-auth/react")
jest.mock("../../service/primic")
jest.mock("prismic-dom", () => ({
    RichText: {
        asText: (text: string) => text,
        asHtml: (text: string) => text,
    }
}))
describe("Posts page", () => {
    it('render correctly', () => {
        render(<Post post={{
            content: "content",
            slug: "slug",
            title: "title",
            updatedAt: "21/05/1998"
        }} />)
        expect(screen.getByText("title"))
            .toBeInTheDocument()
    })

    const sessionMock = (subscribe: boolean) => {
        const getSessionMock = mocked(getSession)

        getSessionMock.mockResolvedValueOnce({
            activeSubscription: subscribe,
        } as any)
    }

    it('load initial data not subscribe', async () => {

        sessionMock(false)

        const res = await getServerSideProps({ req: {}, params: { slug: "slug" } } as any)

        expect(res)
            .toEqual({
                redirect: {
                    destination: `/posts/preview/slug`,
                    permanent: false
                }
            })
    })

    it('load initial data subscribe', async () => {

        sessionMock(true);

        const getPrismicClientMock = mocked(getPrismicClient)

        const getByUIDMocked = jest.fn(async (arr, obj) => ({
            data: {
                title: "title",
                content: "content",
            },
            last_publication_date: "2021-11-12"
        }))

        getPrismicClientMock.mockReturnValueOnce({
            getByUID: getByUIDMocked
        } as any)


        const res = await getServerSideProps({ req: {}, params: { slug: "slug" } } as any)

        expect(res)
            .toEqual({
                props: {
                    post: {
                        slug: "slug",
                        title: "title",
                        content: "content",
                        updatedAt: "11 de novembro de 2021"
                    }
                }
            })
    })
})