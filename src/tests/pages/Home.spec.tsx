import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import Home, { getStaticProps } from "../../pages";
import { stripe } from "../../service/stripe";

// jest.mock("../../service/stripe", () => {
//     return {
//         stripe: {
//             prices: {
//                 retrieve: async (id: string) => ({
//                     id,
//                     unit_amount: 100
//                 })
//             }
//         }
//     }
// })

jest.mock("../../service/stripe")

jest.mock("../../components/SubscribeButton", () => ({
    SubscribeButton: () => {
        return (
            <div></div>
        )
    }
}))

describe("Home page", () => {
    it('render correctly', () => {
        render(<Home product={{ priceId: "fake-price-id", amount: 10 }} />)

        expect(screen.getByText(/\$10.00/i)).toBeInTheDocument()
    })

    it('loads initial data', async () => {

        const stripeMock = mocked(stripe.prices.retrieve)

        stripeMock.mockResolvedValueOnce({
            id: "price_1K7PXOHiZTVAcD3pPgWLXytF",
            unit_amount: 100
        } as any)

        const ret = await getStaticProps(null);

        expect(ret)
            .toEqual({
                props: {
                    product: {
                        priceId: "price_1K7PXOHiZTVAcD3pPgWLXytF",
                        amount: 1
                    },
                },
                revalidate: 60 * 60 * 24 // 24 h
            })
    })
})