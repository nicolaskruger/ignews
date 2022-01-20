import { render, screen } from "@testing-library/react";
import Home from "../../pages";

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
})