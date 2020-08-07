import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import PlantList from "./components/PlantList";
import ShoppingCart from "./components/ShoppingCart";
import CheckoutForm from "./components/CheckoutForm";
import Switch from "@material-ui/core/Switch"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import styled from 'styled-components'
import "./App.css";
import {useDarkMode} from './hooks/useDarkMode'

const StyledApp = styled.div`
  background-color: ${(props) => (props.state.checked ? "black" : "white")};

  h1,
  .switch,
  .plant-details,
  .plant-name {
    color: ${(props) => (props.state.checked ? "white" : "black")};
  }
`

function App() {
  // array of plants that have been added to the cart
  const [cart, setCart] = useState([]);
  const [state, handleChange] = useDarkMode({
    checked: true,
  })

 
  // add a plant to the cart
  const addToCart = (plant) => {
    setCart([...cart, plant]);
  };

  // remove a plant from the cart
  const removeFromCart = (plant) => {
    setCart(cart.filter((p) => p.id !== plant.id));
  };

  return (
    <StyledApp state={state}>
      <Router>
        <nav className="container">
          <h1>
            React Plants <span role="img">🌿</span>
          </h1>
          <FormControlLabel
            className='switch'
            control={
              <Switch
            checked={state.checked}
            onChange={handleChange}
              name="checked"
              className='switch'
            inputProps={{ "aria-label": "secondary checkbox" }}
              />
            }
            label='Dark Mode'
            />
          
          <ul className="steps">
            <li>
              <NavLink exact to="/">
                Plants
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart">
                Cart
                <span className="cart-badge">
                  {cart.length > 0 && cart.length}
                </span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <Route
          exact
          path="/"
          render={() => <PlantList addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          render={(props) => (
            <ShoppingCart
              {...props}
              cart={cart}
              removeFromCart={removeFromCart}
            />
          )}
        />
        <Route path="/checkout" component={CheckoutForm} />
      </Router>
    </StyledApp>
  )
}

export default App;
