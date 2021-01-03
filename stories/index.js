import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "components/NavBar";
import ProductCard from "components/ProductCard";
import ProductCardList from "components/ProductCardList"

storiesOf("NavBar", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: false }]
  })
  .add("unlogged NavBar", () =>
    <NavBar />
  )

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
    id: 1,
    name: "Nature photography",
    description: "This is a test picture",
    price: 220,
    stock: 0,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgs2LWfxghY2RmJt1sSMMMWK3C2werAeH0mA&usqp=CAU"
  }
]

let image = {
  id: 1,
  name: "Nature photography",
  description: "It looked as it would seem in a storybook. The sights, the sounds, the smells and the tastes were out of the world. The sky, punched with clouds stretching like a dome. I could smell the caramel in the air and the music of the meadow echoed in my ears.",
  price: 220,
  stock: 11,
  src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgs2LWfxghY2RmJt1sSMMMWK3C2werAeH0mA&usqp=CAU"
}

let sold_out_image = {
  id: 1,
  name: "Nature photography",
  description: "It looked as it would seem in a storybook. The sights, the sounds, the smells and the tastes were out of the world. The sky, punched with clouds stretching like a dome. I could smell the caramel in the air and the music of the meadow echoed in my ears.",
  price: 220,
  stock: 0,
  src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgs2LWfxghY2RmJt1sSMMMWK3C2werAeH0mA&usqp=CAU"
}

storiesOf("Product Card", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Single Product Card", () =>
    <ProductCard key={image.id} {...image} />
  )
  .add("Product sold out", () =>
    <ProductCard key={sold_out_image.id} {...sold_out_image} />
  )
  .add("List of Product Card", () =>
    <ProductCardList products={imageList} />
  )