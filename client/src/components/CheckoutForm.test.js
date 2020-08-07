import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    render(<CheckoutForm />)
});

test("form shows success message on submit with form details", async () => {
    render(<CheckoutForm />)

    const firstName = screen.getByLabelText(/first name/i)
    const lastName = screen.getByLabelText(/last name/i)
    const address = screen.getByLabelText(/address/i)
    const city = screen.getByLabelText(/city/i)
    const state = screen.getByLabelText(/state/i)
    const zip = screen.getByLabelText(/zip/i)
    const checkoutBtn = screen.getByRole('button', { name: /checkout/i })
    
    fireEvent.change(firstName, {target : {value: 'Cucumber'}})
    fireEvent.change(lastName, {target : {value: 'Beloved'}})
    fireEvent.change(address, {target : {value: '902 po box'}})
    fireEvent.change(city, {target : {value: 'Halifax'}})
    fireEvent.change(state, {target : {value: 'NS'}})
    fireEvent.change(zip, { target: { value: '070908' } })
    
    fireEvent.click(checkoutBtn)

    expect(await screen.findByText(/cucumber beloved/i)).toBeInTheDocument()
    expect(await screen.findByText(/902 po box/i)).toBeInTheDocument()
    expect(await screen.findByText(/halifax, ns 070908/i)).toBeInTheDocument()
    //waitFor(() => { expect(screen.getByText(/cucumber beloved 902 po box halifax ns 070908/i)).toBeInTheDocument()})
    

});
