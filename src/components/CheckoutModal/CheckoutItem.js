import React from "react";

export default function CheckoutItem(props){
    const { id, name, src, description, price } = props.item;
    // if image doesn't show up, then the item probably not available, so remove it from shopping cart
    const handleError = () => {
        props.handleRemove(props.item)
    }

    return(
        <tr key={id}>
            <td className="checkout-image">
                <img src={src} alt="Item Not Available, please Remove it from you cart" className="img-thumbnail" onError={handleError} />
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