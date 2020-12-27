import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

import Button from "components/Button";

import MenuItem from "components/MenuItem";
import Menu from "components/Menu";

storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));


storiesOf("MenuItem", module) 
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  }) // Provides the default background color for our component
  .add("Unselected", () => <MenuItem name="Shop" />) // To define our stories, we call add() once for each of our test states to generate a story
  .add("Selected", () => <MenuItem name="My Inventory" selected />)
  .add("Clickable", () => (
    <MenuItem name="Upload" setItem={action("setActiveTab")} /> // action() allows us to create a callback that appears in the actions panel when clicked
  ));

let menuItems = [
  {
    id: 1,
    name: "Shop"
  },
  {
    id: 2,
    name: "My Inventory"
  },
  {
    id: 3,
    name: "Upload"
  }
]

storiesOf("Menu", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Shop", () => (
    <Menu menuItems={menuItems} activeTab={"Shop"} setItem={action("setActiveTab")} />
  ))
  .add("My Inventory", () => (
    <Menu menuItems={menuItems} activeTab={"My Inventory"} setItem={action("setActiveTab")} />
  ));