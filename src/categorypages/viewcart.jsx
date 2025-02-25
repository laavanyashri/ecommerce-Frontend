import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    IconButton,
    Button,
    Container,
    FormControl,
    InputLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextField } from '@mui/material';
import { Paper } from '@mui/material';
import { Box } from '@mui/material';
import auth from "../config/firebase";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { getMultiFactorResolver, signOut } from 'firebase/auth';
import { useCart } from "../common/cartcontext"; // Import useCart


const ViewCart = () => {
    const [cart, setCart] = useState([]);
    const [log, setlog] = useState(false);
    const [userid, setuserlogin] = useState();
    const [useremail, setuseremail] = useState("");
    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState("creditCard"); // Default payment method
    const { removeFromCart } = useCart(); // Get removeFromCart function
    const [cartFetched, setCartFetched] = useState(false);
    const { cartitems } = useCart(); // Get cart data
    const location = useLocation();
    const cartitemids = location.state || {};
    const navigate = useNavigate()
 
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(function (user) {
            if (user) {
                setlog(true);
                setuserlogin((prev) => (prev !== user.uid ? user.uid : prev)); // ✅ Only update if different
                setuseremail((prev) => (prev !== user.email ? user.email : prev));

            }

            else {
                setlog(false)
                setuserlogin(null);
                setuseremail(null);
            }

        })
        return () => unsubscribe(); // Clean up subscription on unmount
    }, [])

    useEffect(() => {
        console.log("the userid", userid)
        if (userid && !cartFetched) {
            console.log("The userid:", userid);
           updateCartItemUser(userid);
            getCartItems();// ✅ Call only when userid is available
            setCartFetched(true);
        }

    }, [userid, cart])// here cart can be update at any time


    const getCartItems = async () => {

        let cartitems = await axios.get(`https://ecommerce-backend-weld-iota.vercel.app/api/getcartitems${userid}`);
       // let cartitems = await axios.get(`http://localhost:5000/api/getcartitems${userid}`);

        console.log("the cartitems", cartitems);
        if(cartitems.data.length>0)
        {
        //const filterproucts = cartitems.data.filter(category => category.productname).map(category => category.productname);
        const filterprouctsbyimage = cartitems.data.filter(category => category.imageid).map(category => category.imageid);

        // Convert the array into a query string, e.g. ?ids=1&ids=2&ids=3&ids=4
        const queryString = new URLSearchParams({ image: filterprouctsbyimage }).toString();
        //get product images ,price , etc
        let productitems = await axios.get(`https://ecommerce-backend-weld-iota.vercel.app/api/getproducts?${queryString}`);
       // let productitems = await axios.get(`http://localhost:5000/api/getproducts?${queryString}`);

        setCart(productitems.data);
        }

    }

    const updateCartItemUser =async(userid) =>
    {
     
         const requestdata={userid:userid,cartids:cartitemids?.cartitems ?? []  }// Ensure it's an array

        let updatedcart = await axios.post('https://ecommerce-backend-weld-iota.vercel.app/api/updatecartuser',requestdata);
//        let updatedcart = await axios.post('http://localhost:5000/api/updatecartuser',requestdata);

console.log("teh updateddat",updatedcart);
        if(updatedcart.data.length>0)
        {
        //const filterproucts = cartitems.data.filter(category => category.productname).map(category => category.productname);
        const filterprouctsbyimage = updatedcart.data.filter(category => category.imageid).map(category => category.imageid);

        // Convert the array into a query string, e.g. ?ids=1&ids=2&ids=3&ids=4
        const queryString = new URLSearchParams({ image: filterprouctsbyimage }).toString();
        //get product images ,price , etc
        let productitems = await axios.get(`https://ecommerce-backend-weld-iota.vercel.app/api/getproducts?${queryString}`);
      //  let productitems = await axios.get(`http://localhost:5000/api/getproducts?${queryString}`);

        setCart(productitems.data);
       }
    }
    // State for managing the visibility of the shipping address form
    const [isFormOpen, setIsFormOpen] = useState(false);
    // State for managing the visibility of the shipping address form
    const [isPaymenOpen, setIsPaymentOpen] = useState(false);
    // Address state
    const [address, setAddress] = useState({
        name: "",
        street: "",
        city: "",
        zip: "",

    });



    const convertPrice = (priceString) => {
        // console.log("the converte price", priceString)
        return parseFloat(priceString.substring(3).replace(/,/g, ""));
    };


    const handleDelete = async(imageid) => {
        try {
          
            const response = await axios.delete(`https://ecommerce-backend-weld-iota.vercel.app/api/updateImageFromCart/${imageid}`);
           // const response = await axios.delete(`http://localhost:5000/api/updateImageFromCart/${imageid}`);

            console.log("the deelted cart",response)
            getCartItems();
            removeFromCart(response._id)


        } catch (error) {
        }

    };

    const handleAddressChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    // Toggle the form visibility
    const toggleForm = () => {
        setIsFormOpen((prev) => !prev);
    };

    //Toggle payment visiblity
    const togglePaymentForm = () => {
        setIsPaymentOpen((prev) => !prev);

    }

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        setStep(2);

    }

    const handlecheckout = () => {
        const queryParams = {

            address: address,
            paymentMethod: paymentMethod,
        };
        navigate("/checkout", { state: queryParams });  //pass through state hides from URl
    }


    //const Cart = ({ cart, handleDelete }) => {
    // Calculate the total value
    const totalValue = cart.reduce((main, imagesection) => {
        // For each imagesection, sum the price of each item in the images array
        const sectionTotal = imagesection.images.reduce((section, item) => {
            return section + convertPrice(item.price);
        }, 0);

        return main + sectionTotal; // Add the section total to the overall total
    }, 0);
    // };


    // Format the total value with commas
    const formattedTotalValue = totalValue.toLocaleString();
    return (
        <Container maxWidth="lg">
            {step === 1 ? (
                <>
                    <Typography variant="h4" gutterBottom>
                        🛒 View Cart

                    </Typography>
                    {cart.length === 0 ? (
                        <Typography variant="h6">Your cart is empty.</Typography>
                    ) : (
                        <Box sx={{ maxHeight: '500px', overflowY: 'auto' }}> {/* Set desired height and enable scrolling */}

                            <Paper sx={{ p: 3, mb: 3 }}>

                                <Grid container
                                    direction="row"
                                    alignItems="flex-start"
                                    justifyContent="flex-start"
                                    spacing={6}
                                >

                                    {cart.map((imagesection, index) => (
                                        imagesection.images.map((item, index2) => (

                                            <Grid item key={index2} xs={12} sm={6} md={4} lg={3}>
                                                <Card sx={{ width: 300, height: 450, display: "flex", flexDirection: "column" }}>
                                                    <CardMedia
                                                        component="img"
                                                        image={item.imgurl}
                                                        alt={item.name}
                                                        sx={{
                                                            width: "150", // Ensures it fills the card width
                                                            height: "250", // Fixed height to ensure consistency
                                                            objectFit: "cover", // Prevents distortion
                                                        }}

                                                    />
                                                    <CardContent sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
                                                        <Typography variant="h7" sx={{ fontWeight: "bold" }} >{item.name}</Typography>
                                                        <Typography variant="body1" sx={{ fontSize: 15 }}>₹{item.price}</Typography>
                                                        <IconButton
                                                            color="error"
                                                            onClick={() => handleDelete(item._id)}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))
                                    ))}

                                </Grid>
                                {/* Display the total value */}
                                <Typography variant="h6" sx={{ mt: 2 }}>
                                    Total Amount: ₹{formattedTotalValue}
                                </Typography>

                            </Paper>
                        </Box>
                    )}
                    {/* Button or div to toggle form visibility */}
                    <Box sx={{ cursor: 'pointer', mb: 2 }} onClick={toggleForm}>
                        <Typography variant="h6" color="primary">
                            {isFormOpen ? "Hide Shipping Address" : "Show Shipping Address"}
                        </Typography>
                    </Box>

                    {/* Conditionally render the Shipping Address form */}
                    {isFormOpen && (
                        <Paper sx={{ p: 3, mb: 3 }}>
                            <Typography variant="h5" gutterBottom> Shipping Address</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField required
                                        fullWidth
                                        label="Full Name"
                                        name="name"
                                        value={address.name}
                                        onChange={handleAddressChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField required
                                        fullWidth
                                        label="Street Address"
                                        name="street"
                                        value={address.street}
                                        onChange={handleAddressChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField required
                                        fullWidth
                                        label="City"
                                        name="city"
                                        value={address.city}
                                        onChange={handleAddressChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField required
                                        fullWidth
                                        label="ZIP Code"
                                        name="zip"
                                        value={address.zip}
                                        onChange={handleAddressChange}
                                    />
                                </Grid>

                            </Grid>
                        </Paper>
                    )}
                    {/* Button or div to toggle form visibility */}
                    <Box sx={{ cursor: 'pointer', mb: 2 }} onClick={togglePaymentForm}>
                        <Typography variant="h6" color="primary">
                            {isPaymenOpen ? "Hide Payment Option" : "Show Payment Option"}
                        </Typography>
                    </Box>
                    {isPaymenOpen && (
                        <Paper sx={{ p: 3, mb: 3 }}>
                            {/* Payment Method */}
                            <Typography variant="h6" fontWeight="bold" mt={2}>
                                Payment Method
                            </Typography>
                            <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                                <FormControlLabel value="creditCard" control={<Radio />} label="Credit Card" />
                                <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
                                <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
                            </RadioGroup>
                        </Paper>
                    )}
                    {/* Checkout Button */}
                    <Button variant="contained" color="primary" fullWidth sx={{ py: 1.5 }} onClick={(event) => handlePlaceOrder(event)}>
                        Confirm Order
                    </Button>
                </>) : (
                <div>
                    <Typography variant="h5" gutterBottom>
                        Thank You for Your Order!
                    </Typography>
                    <Typography variant="body1">Confirmation Details:</Typography>
                    <Typography variant="body2"><strong>Name:</strong> {address.name}</Typography>
                    <Typography variant="body2"><strong>Email:</strong> {useremail}</Typography>
                    <Typography variant="body2"><strong>Address:</strong> {address.street}, {address.city}, {address.state} - {address.zip}</Typography>
                    <Button variant="contained" color="primary" sx={{ py: 1.5 }} onClick={() => navigate('/home')}>Return Home
                    </Button>
                </div>
            )}

        </Container>
    );
};


export default ViewCart;
