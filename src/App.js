import Navbar from "./common/Navbar";
import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./common/login";
import Signup from "./common/signup";
import Home from "./common/home";
import Electronics from "./categorypages/electronics";
import axios from "axios"
import ViewCart from "./categorypages/viewcart"
import { CartProvider } from "./common/cartcontext";

function App() {
    const [cartCount, setCartCount] = useState(0);

    // Effect to clear the cart after 5 minutes (300000ms)
    useEffect(() => {
        if (cartCount > 0) {
            const timer = setTimeout(() => {
                clearCart();
        }, 900000); // 15 minutes

            return () => clearTimeout(timer); // Cleanup on cart update
        }
    }, [cartCount]);

    // Function to clear the cart
    const clearCart = async () => {
        // setCart([]);
        const response = await axios.delete("https://ecommerce-backend-e6j1.onrender.com/api/clearcart");

        setCartCount(0);


    };
    // Fetch cart count and update state
    const updateCartCount = async () => {

        const response = await axios.get("https://ecommerce-backend-e6j1.onrender.com/api/getcartcount");
//        const response = await axios.get("http://localhost:5000/api/getcartcount");

        const count = Number(response.data);
        if (count > 0) {
            setCartCount(count);
        }
        console.log("the app count", count)
    };

    return (<>
      <CartProvider>
        <BrowserRouter>
            <Navbar cartCount={cartCount} />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/electronics" element={<Electronics updateCartCount={updateCartCount} />} ></Route>
                <Route path="/viewcart" element={<ViewCart />}></Route>
                <Route path="/viewcart" element={<ViewCart />}></Route>
                <Route path="/checkout" element={<checkout />}></Route>

            </Routes>

        </BrowserRouter>
        </CartProvider>
    </>)
}

export default App