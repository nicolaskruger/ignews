import { render, screen, waitFor } from "@testing-library/react";
import { Async } from ".";

test('it render correctly', async () => {
    render(<Async />)

    expect(screen.getByText("Hello World"))
        .toBeInTheDocument();
    // expect(await screen.findByText("botao"))
    //     .toBeInTheDocument();

    // await waitForElementToBeRemoved(screen.queryByText("button"))

    screen.logTestingPlaygroundURL();


    await waitFor(() => {
        return expect(screen.getByText("botao")).toBeInTheDocument()
    })

    await waitFor(() => {
        return expect(screen.queryByText("button")).not.toBeInTheDocument()
    })
})