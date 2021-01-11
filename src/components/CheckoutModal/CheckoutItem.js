import React from "react";

export default function CheckoutItem(props){
    const { id, name, src, description, price } = props.item;

    return(
        <tr key={id}>
            <td className="checkout-image">
                <img src={src} alt={name} className="img-thumbnail" />
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
                <img src="images/trash.png" alt="delete" className="trash" onClick={() => props.handleRemove(props.item)} />
            </td>
        </tr>
    );
}