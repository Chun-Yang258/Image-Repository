import React from "react";

import "./FormInput.scss";
const classNames = require('classnames');
export default function FormInput({ handleChange, label, value, ...otherProps }){
    let formClass = classNames("form-input-label", {'shrink': value.length})
    return (
        <div className="group">
            <input className='form-input' onChange={handleChange} {...otherProps} required />
            {
                label ? 
                    (<label className={formClass}>
                        {label}
                    </label>) 
                    : null
            }
        </div>
    )
}