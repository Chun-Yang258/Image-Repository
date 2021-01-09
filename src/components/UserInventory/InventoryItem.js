import React from "react";

export default function InventoryItem(props){
    const { description, id, name, price, src, stock } = props.item
    return (
        <tr key={id}>
            <td className="image_space">
                <img src={src} alt={name} width="100%" className="img-thumbnail" />
            </td>
            <td >
                <h4>{name}</h4>
                <br />
                <p>{description}</p>
            </td>
            <td >
                {price}
            </td>
            <td >
                {stock}
            </td>
            <td >
                <img src="images/trash.png" alt="delete" className="trash"/>
            </td>
        </tr>
        )
   
}