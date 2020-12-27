import React, { useState } from "react";

import "components/Application.scss";
import Menu from "components/Menu";

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

export default function Application(props) {

  const [activeTab, setItem] = useState("Shop")

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Images Shop"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <Menu 
            menuItems={menuItems}
            activeTab={activeTab}
            setItem={setItem}
          />
        </nav>
        <img
          className="sidebar__canmera sidebar--centered"
          src="images/canmera.png"
          alt="Beautiful Images"
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
