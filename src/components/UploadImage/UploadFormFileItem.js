import React, { useState } from "react";
import { Collapse, Button } from "react-bootstrap";

export default function UploadFormFileItem(props) {

    const [open, setOpen] = useState(false);
    const [formParams, setFormParams] = useState(props);

    const { id, filename, previewURL, description, displayName, price, stock} = formParams;

    const handleUpdate = e => {
        props.setFile(prevState => {
            let filteredState = prevState.filter(item => item.filename !== filename)
            filteredState.push({key: `image-${id}`, ...formParams})
            return filteredState;           
        })
        setOpen(!open)
    }

    const handleChange = e => {
        const { value, name } = e.target
        setFormParams(prevState => {
            return{
                ...prevState,
                [name]: value
            }
        })
    }

    return (

    <div className="card">
        <div 
            className="card-header" 
            role="tab" 
            onClick={() => setOpen(!open)} 
            aria-controls={id}
            aria-expanded={open}
        >
            <h5 className="mb-0">
                {filename} {open ? <img src="images/arrowUp.png" alt="close" width="20px" className="float-right"/> : <img src="images/downsideArrow.png" alt="expand" width="20px" className="float-right"/>}
            </h5>           
        </div>
        <Collapse in={open}>
            <div id={id} className="card-body container">
                <div className="row">
                    <div className="col"><img src={previewURL} alt={filename} /></div>
                    <div className="col">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Name:</span>
                            </div>
                            <input 
                                type="text" 
                                className="form-control border" 
                                value={displayName}
                                name="displayName" 
                                placeholder="Image Name" 
                                aria-label="Username" 
                                aria-describedby="basic-addon1"
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon2">Stock: </span>
                            </div>
                            <input 
                                type="text" 
                                className="form-control border" 
                                placeholder="Stock"
                                name="stock" 
                                aria-label="Username" 
                                aria-describedby="basic-addon2" 
                                value={stock}
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon3">Price:$</span>
                            </div>
                            <input 
                                type="text" 
                                className="form-control border" 
                                placeholder="Price" 
                                aria-label="Username" 
                                aria-describedby="basic-addon3" 
                                value={price}
                                name="price"
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            <textarea 
                                className="form-control border border-info" 
                                rows="5" 
                                id="description" 
                                placeholder="Please enter description for your image"
                                value={description}
                                name="description"
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Button className="btn btn-info" onClick={handleUpdate}>UPDATE</Button>
                    </div>
                </div>
            </div>
        </Collapse>
    </div>

    )
}