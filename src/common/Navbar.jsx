
import { useEffect, useState } from "react"
import logo from "../assests/navimage/Logo.png"
import cartimage from "../assests/navimage/shopping-bag.png"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Link } from 'react-router-dom'
import "../common/style.css"
import auth from "../config/firebase";
import { useNavigate } from 'react-router-dom'
import { getMultiFactorResolver, signOut } from 'firebase/auth';
import Electronics from "../categorypages/electronics";
import axios from "axios"
import electronics from "../assests/Electronics/laptop/laptop1.png"
import { useCart } from "../common/cartcontext"; // Import useCart



function Navbar({ cartCount }) {

    const navigate = useNavigate()
    const [log, setlog] = useState(false)
    const [login, setuserlogin] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const { cartitems } = useCart(); // Get cart data
    const{clearFromCart }=useCart();
    useEffect(() => {
        addcategories();

        auth.onAuthStateChanged(function (user) {
            if (user) {
                setlog(true)
                console.log("User Logged In")
            }

            else {
                setlog(false)

                console.log("User Logged Out")

            }
        })

        if (showMessage) {
            const timer = setTimeout(() => setShowMessage(false), 5000); // Hide after 60 seconds
            return () => clearTimeout(timer);
        }
    }, [showMessage])
    function logout() {
        signOut(auth)
        navigate('/home')
       // clearFromCart()
    }
    function addcategories() {
        const today = new Date();
        const date = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      
        let categorydata = [{ name: "Electronics", description: "All Electronics items like laptop..mobile", date: date }, { name: "Men", description: "Men Clothes,acessories,shoes", date: date }, { name: "Women", description: "Women Clothes,acessories,shoes", date: date }]
        axios.post("http://localhost:5000/api/category", categorydata).then((res) => {
            console.log(res.data)
        }).catch((error) => {
            console.log("Error fetching data",error)
        })
      
      }
      
    function cartsummary() {
        if (log) //make sure user is logged in
        {
            setuserlogin(true)

            navigate('/viewcart',{ state: { cartitems} })
        }
        else {
            setShowMessage(true)

        }

    }


    return (
        <div className="flex items-center justify-around bg-orange-300 ">
            <div className="w-[6%] ">
                <img src={logo} alt="logo" className="mix-blend-multiply"></img>
            </div>
            <div className="flex justify-center items-center gap-10 ml-16">
                <Link to={"/home"}>HOME</Link>

                <Link>MEN</Link>
                <Link>WOMEN</Link>
                <Link>KIDS</Link>
                <Link to={"/electronics"}>ELECTRONICS</Link>
            </div>
            <div className="flex items-center justify-end gap-10 relative">
                <img src={cartimage} className="w-[9%] cursor-pointer" alt="shoppingcart" onClick={cartsummary}></img>
                {
                    log ? <button className="border-2 border-black p-2 h-10 rounded-md" onClick={logout} >Log out</button> : <button className="border-2 border-black p-2 h-10 rounded-md" onClick={() => navigate("/login")}>Log in</button>

                }
                {cartitems.length > 0 ? <span className="absolute right-[19%] bg-green-500 text-white text-sm rounded-full px-2">
                    {cartitems.length}
                </span> : ""}
                {showMessage && <div className=" absolute  mt-20 r-14 bg-red-400  p-3 absolu rounded-lg shadow-md  animate-blink"><span className="font-bold text-white">Please login to checkout</span></div>}

                {/* <button className="border-2 border-black p-2 h-10 rounded-md">Sign up</button> */}

            </div>

        </div>
    )
}


export default Navbar