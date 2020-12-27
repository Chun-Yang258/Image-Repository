import React from "react";
import MenuItem from "components/MenuItem";

export default function Menu(props){
    let menuList = props.menuItems.map(item => {
        return (
            <MenuItem 
                key={item.id}
                name={item.name}
                selected={item.name === props.activeTab}
                setItem={props.setItem}
            />
        )
    })

    return (
        <ul>
            {menuList}
        </ul>
    )
}