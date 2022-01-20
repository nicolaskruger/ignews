import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import Posts, { getStaticProps } from "../../pages/posts";
import { getPrismicClient } from "../../service/primic";


jest.mock("prismic-dom", () => ({
    RichText: {
        asText: (text: string) => text
    }
}))
jest.mock("../../service/primic");

describe("Posts page", () => {
    it('render correctly', () => {
        render(<Posts posts={[{
            slug: "slug",
            excerpt: "excerpt",
            title: "title",
            updatedAt: "21/09/12"
        }]} />)

        expect(screen.getByText("title")).toBeInTheDocument();
    })
    it('load initial data', async () => {
        const getPrismicClientMock = mocked(getPrismicClient)

        const queryMocked = jest.fn(async (arr, obj) => ({
            results: [{
                uid: "uid",
                data: {
                    title: "title",
                    content: []
                },
                last_publication_date: "2021-11-12"
            }]
        }))

        getPrismicClientMock.mockReturnValueOnce({
            query: queryMocked
        } as any)

        const res = await getStaticProps(null);

        expect(res)
            .toEqual({
                props: {
                    posts: [
                        {
                            slug: "uid",
                            title: "title",
                            excerpt: "",
                            updatedAt: "11 de novembro de 2021",
                        }
                    ]
                },
                revalidate: 60 * 60 // 1h
            })


    })
})