import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "components/Application.scss";


import NavBar from "components/NavBar";
import ProductCardList from "components/ProductCardList";


export default function Application(props) {

  //const [activeTab, setItem] = useState("Shop")
  let imageList = [
    {
      id: 1,
      name: "Nature photography",
      description: "It looked as it would seem in a storybook. The sights, the sounds, the smells and the tastes were out of the world. The sky, punched with clouds stretching like a dome. I could smell the caramel in the air and the music of the meadow echoed in my ears.",
      price: 120,
      stock: 11,
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgs2LWfxghY2RmJt1sSMMMWK3C2werAeH0mA&usqp=CAU"
    },
    {
      id: 2,
      name: "Nature Insects",
      description: "This is a test picture",
      price: 220,
      stock: 0,
      src: "https://i1.wp.com/digital-photography-school.com/wp-content/uploads/2019/10/Karthika-Gupta-Compelling-Nature-Photos-6.jpg?fit=1500%2C1000&ssl=1"
    },
    {
      id: 3,
      name: "Sunset",
      description: "This is a test picture",
      price: 200,
      stock: 2,
      src: "https://www.rwongphoto.com/images/xl/RW8461.jpg"
    },
    {
      id: 4,
      name: "Nature photography",
      description: "This is a test picture",
      price: 220,
      stock: 0,
      src: "https://composeclick.com/wp-content/uploads/2018/05/nature-1.jpg"
    },
    {
      id: 5,
      name: "Sunset",
      description: "This is a test picture",
      price: 220,
      stock: 0,
      src: "https://i0.wp.com/digital-photography-school.com/wp-content/uploads/2018/10/bluebells,_oxfordshire.jpg?fit=1500%2C1000&ssl=1"
    },
    {
      id: 6,
      name: "Nature photography",
      description: "This is a test picture",
      price: 100,
      stock: 10,
      src: "https://expertphotography.com/wp-content/uploads/2018/07/nature-photography-green-tree-plant-leaves.jpg"
    },
    {
      id: 7,
      name: "Nature photography",
      description: "This is a test picture",
      price: 12,
      stock: 20,
      src: "https://assets.hongkiat.com/uploads/nature-photography/autumn-poolside.jpg"
    }
  ]

  return (
    <main className="layout">
      <NavBar />
      <section className="product_display">
        <ProductCardList products={imageList} />
      </section>
    </main>
  );
}
