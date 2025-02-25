import "../common/style.css";
import { useEffect, useState } from "react"
import React from 'react'
import axios from "axios"
import Navbar from '../common/Navbar';
import Electronics from "../assests/Home/electronicshsopping.jpg";
import GirlShopping from "../assests/Home/girlsshopping.jpg";
import HouseHold from "../assests/Home/household.jpg";
import ManShopping from "../assests/Home/manshopping.jpg";
import { useNavigate } from 'react-router-dom';

import Acer1 from "../assests/Electronics/laptop/Acer lite Ryzen 3.jpg";
import Apple from "../assests/Electronics/laptop/Apple macbook.jpg";
import Dell_1 from "../assests/Electronics/laptop/Dell inspiron.jpg";
import Dell_2 from "../assests/Electronics/laptop/Dell latitude.jpg";
import Dell_3 from "../assests/Electronics/laptop/Dell_windows11.jpg";
import HP_1 from "../assests/Electronics/laptop/HP 15s.jpg";
import HP_2 from "../assests/Electronics/laptop/HP Intelcore i3.jpg";
import HP_3 from "../assests/Electronics/laptop/HP laptop dual.jpg";
import HP_4 from "../assests/Electronics/laptop/HP victus.jpg";
import HP_5 from "../assests/Electronics/laptop/HP_1.jpg";
import laptop_1 from "../assests/Electronics/laptop/laptop1.png";
import laptop_2 from "../assests/Electronics/laptop/laptop2.png";
import laptop_3 from "../assests/Electronics/laptop/laptop3.png";
import lenovo_1 from "../assests/Electronics/laptop/lenovo Ideapad.jpg";
import lenovo_2 from "../assests/Electronics/laptop/Lenovo Quadcore.jpg";
import lenovo_3 from "../assests/Electronics/laptop/Lenovo Thinkpad2.jpg";

//mobile
import Apple_1 from "../assests/Electronics/mobile/Appile iphone13.jpg";
import Apple_2 from "../assests/Electronics/mobile/Apple iphone 15.jpg";
import Apple_3 from "../assests/Electronics/mobile/Apple iphone16.jpg";
import Oppo_1 from "../assests/Electronics/mobile/oppo A34G.jpg";
import Oppo_2 from "../assests/Electronics/mobile/oppo A58.jpg";
import Oppo_3 from "../assests/Electronics/mobile/oppo K12.jpg";
import realme_1 from "../assests/Electronics/mobile/realme C63.jpg";
import realme_2 from "../assests/Electronics/mobile/realme Narzo N61.jpg";
import realme_3 from "../assests/Electronics/mobile/realme_1.jpg";
import realme_4 from "../assests/Electronics/mobile/realme_P2Pro.jpg";
import samsung_1 from "../assests/Electronics/mobile/Samsung galaxy F05.jpg";
import samsung_2 from "../assests/Electronics/mobile/Samsung Galaxy F15 5G.jpg";
import samsung_3 from "../assests/Electronics/mobile/Samsung Galaxy M35.jpg";
import samsung_4 from "../assests/Electronics/mobile/Samsung galaxy S24.jpg";
import Vivo_1 from "../assests/Electronics/mobile/Vivo T35G.jpg";
import Vivo_2 from "../assests/Electronics/mobile/Vivo V30 Pro.jpg";

//monitor
import AcerMonitor from "../assests/Electronics/monitor/Acer_1.jpg";
import DellMonitor_1 from "../assests/Electronics/monitor/Dell_1.jpg";
import DellMonitor_2 from "../assests/Electronics/monitor/Dell_2.jpg";
import DellMonitor_3 from "../assests/Electronics/monitor/Dell_3.jpg";
import FrontechMonitor from "../assests/Electronics/monitor/Frontech_1.jpg";
import LenovoMonitor_1 from "../assests/Electronics/monitor/Lenovo_4.jpg";
import MarqMonitor_1 from "../assests/Electronics/monitor/Marq_1.jpg";
import ZebronicsMonitor_1 from "../assests/Electronics/monitor/Zebronics_1.jpg";
//mobile acessories
import BestorUSB from "../assests/Electronics/mobile accesories/BestorUSB.jpg";
import Boult from "../assests/Electronics/mobile accesories/Boult.jpg";
import Cloat from "../assests/Electronics/mobile accesories/Cloat80W.jpg";
import Kotsun from "../assests/Electronics/mobile accesories/Kotsun.jpg";
import NAFA from "../assests/Electronics/mobile accesories/NAFA Bluetooth.jpg";
import Portronics from "../assests/Electronics/mobile accesories/Portronics.jpg";
import Roarx from "../assests/Electronics/mobile accesories/RoarX 20W.jpg";
import Wallstand from "../assests/Electronics/mobile accesories/wall mobile stand.jpg";

const Home = () => {
    const navigate = useNavigate();
 // Fetch categories from backend
 useEffect(() => {
  window.scrollTo(0, 0);
  addproducts();
}, []);


async function addproducts() {
  const today = new Date();
  const date = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const categoryname = "Electronics";

  let categorydata = await axios.get(`http://localhost:5000/api/categorybyname/${categoryname}`);
  let productsdata = [{
      name: "Laptop", category: { name: categorydata.data.name, _id: categorydata.data._id }, images: [{ imgurl: Acer1, name: "Acer i3", price: "Rs.40,000", stock: 6 },
      { imgurl: Apple, name: "Apple Mac series4", price: "Rs.45,000", stock: 8 }, { imgurl: Dell_1, name: "Dell Vostra 15", price: "Rs.36,000", stock: 4 }, { imgurl: Dell_2, name: "Dell latitude", price: "Rs.48,000", stock: 2 },
      { imgurl: Dell_3, name: "Dell Windows 11", price: "Rs.55,000", stock: 15 },
      { imgurl: HP_1, name: "HP AMD Ryzen 3", price: "Rs.58,000", stock: 10 }, { imgurl: HP_2, name: "HP Omen", price: "Rs.60,000", stock: 1 }, { imgurl: HP_3, name: "HP 15s", price: "Rs.60,500", stock: 9 }, { imgurl: HP_4, name: "HP Laptop 240 G9 (2024)", price: "Rs.49,500", stock: 18 },
      { imgurl: HP_5, name: "HP 255 G10 AMD Ryzen 5 ", price: "Rs.52,500", stock: 22 }, { imgurl: laptop_1, name: "ASUS Vivobook Go 15", price: "Rs.78,500", stock: 3 }, { imgurl: laptop_2, name: "ASUS Vivobook Go 11", price: "Rs.66,500", stock: 7 }, { imgurl: laptop_3, name: "Dell intel5 ", price: "Rs.50,500", stock: 9 },
      { imgurl: lenovo_1, name: "Lenovo V15 G4 ", price: "Rs.61,500", stock: 15 }, { imgurl: lenovo_2, name: "Lenovo IdeaPad Slim 3 AMD", price: "Rs.79,500", stock: 13 }, { imgurl: lenovo_3, name: "HP Pavilion Plus", price: "Rs.99,500", stock: 1 }]
  },
  {
      name: "Mobile", category: { name: categorydata.data.name, _id: categorydata.data._id }, images: [{ imgurl: Apple, name: "Apple iPhone 16", price: "Rs.80,000", stock: 10 }, { imgurl: Apple_2, name: "Apple iPhone 16", price: "Rs.70,000", stock: 9 },
      { imgurl: Apple_3, name: "Apple iPhone 16 plus", price: "Rs.45,000", stock: 45 }, { imgurl: Oppo_1, name: "OPPO A3x 4G (Ocean Blue,64GB)", price: "Rs.70,000", stock: 65 }, { imgurl: Oppo_2, name: "OPPO A77 (Sunset Orange, 128 GB", price: "Rs.50,000", stock: 33 }, { imgurl: Oppo_3, name: "OPPO F27 5G (Amber Orange, 256 GB)  (8 GB RAM)", price: "Rs.50,000", stock: 33 }, { imgurl: realme_1, name: "realme Narzo N61 (Voyage Blue, 64 GB)  (4 GB RAM)", price: "Rs.66,000", stock: 77 }, { imgurl: realme_2, name: "realme P1 5G (Phoenix Red, 128 GB)  (6 GB RAM)", price: "Rs.55,000", stock: 22 }, { imgurl: realme_3, name: "realme 14x 5G (Golden Glow, 128 GB)  (6 GB RAM)", price: "Rs.22,000", stock: 66 },
      { imgurl: realme_4, name: "OPPO A77 (Sunset Orange, 128 GB) ", price: "Rs.43,000", stock: 66 }, { imgurl: samsung_1, name: "SAMSUNG Galaxy S24+ 5G (Cobalt Violet, 256 GB)  (12 GB RAM)", price: "Rs.45,000", stock: 102 }, { imgurl: samsung_2, name: "Samsung Galaxy F15 5G", price: "Rs.66,000", stock: 23 }, { imgurl: samsung_3, name: "Samsung Galaxy M35", price: "Rs.34,000", stock: 23 }, { imgurl: samsung_4, name: "Samsung galaxy S24", price: "Rs.22,000", stock: 11 }, { imgurl: Vivo_1, name: "Vivo T35G", price: "Rs.33,000", stock: 15 }, { imgurl: Vivo_2, name: "Vivo V30 Pro", price: "Rs.22,000", stock: 22 }]
  },

  {
      name: "Monitor", category: { name: categorydata.data.name, _id: categorydata.data._id }, images: [{ imgurl: AcerMonitor, name: "Acer Nitro 60.45 cm (23.8 inch)", price: "Rs.33,000", stock: 2 }, { imgurl: DellMonitor_1, name: "DELL 60.96 cm (24 inch) Full HD IPS Panel 99%", price: "Rs.32,000", stock: 9 }, { imgurl: DellMonitor_2, name: "DELL 49.53 cm (19.5 inch) HD with Contrast Ratio 600:1/600:1(Dynamic)", price: "Rs.32,000", stock: 9 }, { imgurl: DellMonitor_3, name: "DELL P-Series 54.61 cm (21.5 inch) Full HD IPS Panel with 99%sRGB", price: "Rs.22,000", stock: 9 }, { imgurl: FrontechMonitor, name: "Frontech - 48.26 cm (19 inch) HD LED Backlit", price: "Rs.22,000", stock: 9 }, { imgurl: LenovoMonitor_1, name: "Lenovo 63.5 cm (25 inch) Full HD VA Pane", price: "Rs.22,000", stock: 22 }, { imgurl: ZebronicsMonitor_1, name: "ZEBRONICS 60.96 cm (24 inch)", price: "Rs.15,000", stock: 12 }]
  },

  {
      name: "Mobile Accessories", category: { name: categorydata.data.name, _id: categorydata.data._id }, images: [{ imgurl: BestorUSB, name: "USB Cable for mobile", price: "Rs.270", stock: 55 }, { imgurl: Boult, name: "Boult Mustang Torq with 50 Hrs Battery", price: "Rs.777", stock: 12 }, { imgurl: Cloat, name: " Laptop cleaning kit ", price: "Rs.44", stock: 13 }, { imgurl: Kotsun, name: " Kotsun Quick Charger", price: "Rs.299", stock: 1 }, { imgurl: NAFA, name: " NAFA Bluettoth", price: "Rs.449", stock: 1 }, { imgurl: Portronics, name: "Portronics charger", price: "Rs.88", stock: 1 }, { imgurl: Roarx, name: "RoarX Lightning Cable 6", price: "Rs.44", stock: 64 }, {
          imgurl: Wallstand,
          name: "Mobile Wall mount stand", price: "Rs.455", stock: 223
      }]
  }]
  // let productsdata = [{ name: "Laptop", category: { name: categorydata.data.name, _id: categoryd
  // ata.data._id }, images: ["../assests/Electronics/laptop/laptop1.png", "../assests/Electronics/laptop/laptop2.png", "../assests/Electronics/laptop/laptop3.png"], price: 40000, stocks: 10 },
  // { name: "Mobile", category: { name: categorydata.data.name, _id: categorydata.data._id }, images: ["../assests/Electronics/mobile/mobile1.png", "../assests/Electronics/mobile/mobile2.png", "../assests/Electronics/mobile/mobile3.png", "../assests/Electronics/mobile/mobile4.png"], price: 20000, stocks: 20 },
  // ]
  //console.log("the productsdat",productsdata);
  axios.post("http://localhost:5000/api/products", productsdata).then((res) => {
      console.log(res.data)
  }).catch(() => {
      console.log("Error fetching data")
  })
}

        return( <div>
        <div className="container m-auto pl-[25%] pr-[25%] mt-10 flex flex-row flex-wrap items-center justify-around">
    {/* Hero Section */}
    <div className=" mb-8 cursor-pointer" onClick={() => navigate("/electronics")} >
      <img
        src={Electronics}
        alt="Hero"
        className=" w-[25vw]] h-[20vw] object-cover "
      />
      </div>

      <div className=" mb-8 cursor-pointer" >
      <img
        src={GirlShopping}
        alt="Hero"
        className=" w-[25vw]] h-[20vw] object-cover "
      />
      </div>

      <div className=" mb-8 cursor-pointer" >
      <img
        src={HouseHold}
        alt="Hero"
        className=" w-[25vw]] h-[20vw] object-cover "
      />
      </div>

      <div className=" mb-8 cursor-pointer" >
      <img
        src={ManShopping}
        alt="Hero"
        className="w-[25vw]] h-[20vw] object-cover "
      />
      </div>
      </div>
      </div>
    )
  };
export default Home