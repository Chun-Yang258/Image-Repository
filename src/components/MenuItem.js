import React from "react";

import "components/MenuItem.scss";

let classNames = require("classnames");

export default function MenuItem(props) {

    let menuItemClass = classNames("menu__item",{
        "menu__item--selected": props.selected,
    })

    return (
        <li className={menuItemClass} onClick={() => props.setItem(props.name)}>
            <h2 className="text--regular">{props.name}</h2>  
        </li>
    )
}