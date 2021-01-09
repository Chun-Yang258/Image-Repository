import React, {Fragment} from "react";

import InventoryItem from "components/UserInventory/InventoryItem";

export default function InventoryList(props){

    const inventoryList = props.inventory.map(item => {
        
        return (
            <InventoryItem key={item.id} item={item} />
          )
    })

    const emptyTbody = (
        <tr>
            <td colSpan="4" className="text-center text-info font-weight-bold">You do not have any image!</td>
        </tr>
    )

    return(
        <Fragment>
            {props.inventory.length === 0 ? emptyTbody : inventoryList}
        </Fragment>      
    )
}