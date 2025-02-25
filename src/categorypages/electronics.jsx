
import { useEffect, useState } from "react"
import React from 'react'
import { motion } from "framer-motion";
import Navbar from '../common/Navbar';
import "../common/style.css"
import axios from "axios"

import auth from "../config/firebase";
import { useCart } from "../common/cartcontext"; // Import useCart


function Electronics({ updateCartCount }) {

    const today = new Date();
    const date = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const [elecProducts, setProducts] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [setcategories, setAllCategories] = useState([]);
    const [userid, setuserid] = useState("")
    const [cartid, setcartid] = useState([])
    const categories = ["Laptop", "Mobile", "Monitor", "Mobile Accessories"];
    const [log, setlog] = useState(false)
    const { addToCartCount } = useCart();

    // Fetch categories from backend
    useEffect(() => {
        window.scrollTo(0, 0);
        //  addproducts();
        getAllProductcategories();
        auth.onAuthStateChanged(function (user) {
            if (user) {
                setuserid(user.uid)
                setlog(true)

            }
            else {
                setlog(true)
            }
        })

    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            //  console.log("the seectedcatego", selectedCategories);

            const prouductquery = selectedCategories.length
                ? `?categories=${selectedCategories.join(",")}`
                : "";

            const data = await axios.get(`https://ecommerce-backend-weld-iota.vercel.app/api/filterproducts${prouductquery}`);
           // const data = await axios.get(`http://localhost:5000/api/filterproducts${prouductquery}`);

            setProducts(data.data);

        };
        fetchProducts();

    }, [selectedCategories])


    //get all prducts images 
    async function getAllProductcategories() {
        //get products
        const categoryname = "Electronics";
       
        let categorydata = await axios.get(`https://ecommerce-backend-weld-iota.vercel.app/api/productsbycategory/${categoryname}`);
       // let categorydata = await axios.get(`http://localhost:5000/api/productsbycategory/${categoryname}`);

        setProducts(categorydata.data);
        setAllCategories(categorydata.data.name);//initially set all category name
        selectedCategories.includes(categorydata.data.name);
    }

    //add details to cart
    const addToCart = async (productname, imageid, productcategory) => {
        const today = new Date();
        const date = today.toLocaleString();
        console.log("the cart id", productname)
        let cartdata = { productname: productname.trim(), productcategory: productcategory.trim(), date: date, imageid: imageid }

     axios.post("https://ecommerce-backend-weld-iota.vercel.app/api/addcartitems", cartdata).then(response=> {
       // axios.post("http://localhost:5000/api/addcartitems", cartdata).then(response=> {

        addToCartCount(response.data)

            updateCartCount()
        }).catch((err) => {
            console.log("Error fetching updatacrt", err)
        })

    };
    // Handle Checkbox Change
    const handleCategoryChange = async (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((cat) => cat !== category)
                : [...prev, category]
        );

        //   const  data = await axios.get(`http://localhost:5000/api/filterproducts/${prouductquery}`);
    };
    return (
        <section className="electronics_mainsection">
            {/* Main section*/}

            <div className="electronics_subsection flex flex-row justify-around  gap-10">
                {/* filter section*/}
                <div className="electronics_filtersection  mt-10 basis-[40%]">
                    <h1 className="ml-5  text-xl font-bold">CATEGORIES</h1>
                    <div className="filter_occasion ">
                        {categories.map((product, index) =>
                        (
                            <div key={index} className="border-none  p-5 ">
                                <input type="checkbox" onChange={() => handleCategoryChange(product)} checked={selectedCategories.includes(product)} ></input>
                                <label className="font-bold" key={product}> {product}</label><br></br><br></br>
                            </div>
                        ))}
                    </div>
                    {/*vertical line*/}
                    <div class="vl">
                    </div>
                </div>

                {/* images section*/}
                <div className="electronics_imagesection grow">

                    {elecProducts.map((imagesection, index) => (
                        <div key={index} className="flex flex-row justify-between items-center flex-wrap gap-10 p-10" >
                            {imagesection.images.map((item, index2) =>
                            (
                                <div key={index2} id={index2} onMouseEnter={() => setHoveredIndex(index2)} onMouseLeave={() => setHoveredIndex(null)} className="image-container">
                                    <img src={item.imgurl} alt="image" className={hoveredIndex === index2 ? "hovered" : ""}></img>
                                    <br></br>
                                    <div className="inline-block w-20">
                                        <p className="font-bold uppercase text-wrap">{item.name}</p>
                                        <p className="font-bold text-gray-600">{item.price}</p>
                                        <p className="text-sm">Available:{item.stock}</p>
                                    </div>
                                    <div className="inline-block">
                                        {/* {isShown && (<button className="border-2"  >Add to Cart </button>)} */}
                                        {/* {hoveredIndex === index2 && <button className="view-button" onClick={() => addToCart(item.name, imagesection._id, imagesection.name)}>Add to Cart</button>} */}

                                        <button className="view-button" onClick={() => addToCart(item.name, item._id, imagesection.name)} >Add to Cart</button>

                                    </div>

                                </div>

                            ))}
                        </div>
                    ))}
                </div>


            </div>
        </section >
    )
}

export default Electronics