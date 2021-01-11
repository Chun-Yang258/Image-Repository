import React, { useState, useRef } from 'react';
import "./UploadForm.scss";

import UploadFormFileItem from "./UploadFormFileItem";
import { addImageStorage } from "../../firebase/firebase.utils";

export default function MultipleImageUploadComponent(props) {

    const [file, setFile] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const fileInputRef = useRef();

    let fileList = file.map(item => (
        <UploadFormFileItem setFile={setFile} key={item.key} {...item} />    
    ))

    const uploadMultipleFiles = (e) => {
        let fileObj = [];
        let fileArray = [];
        var filteredfiles = [...e.target.files].filter( s => s.type.includes("image") )
        fileObj.push(filteredfiles);

        Object.keys(fileObj[0]).forEach((key) => {
            let name = fileObj[0][key].name;
            let previewURL = URL.createObjectURL(fileObj[0][key])
            let elementKey = "image-" + key 
            fileArray.push({
                key: elementKey,
                id: key,
                filename: name, 
                previewURL: previewURL, 
                description: "", 
                displayName: name, 
                price: 0, 
                src: "",
                stock: 0
            })         
        }) 

        setFile(fileArray);
        setSelectedFiles(filteredfiles);
    }

    const handleCancelAll = e => {
        e.preventDefault();
        setFile([]);
        setSelectedFiles([]);
        fileInputRef.current.value = "";
    }

    const handleSubmit = e => {
        e.preventDefault();

        for(let i = 0; i < selectedFiles.length; i++) {
            let singlefile = selectedFiles[i]           
            let fileInfo = [...file].find(item => item.filename === singlefile.name)
            addImageStorage(singlefile, fileInfo)
        }
        setFile([]);
        setSelectedFiles([]);
        fileInputRef.current.value = "";
    }

    let fileLabel = file.length ? `Selected ${file.length} files` : "Choose file"
    
    return (
        <form className="upload-form">
            <div className="form-group multi-preview">
                <div className="accordion md-accordion" id="accordionEx" role="tablist" aria-multiselectable="true">
                    {fileList}
                </div>
            </div>

            <div className="form-group">       
                <div className="input-group">
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="inputGroupFile04" onChange={uploadMultipleFiles} ref={fileInputRef} multiple />
                        <label className="custom-file-label" htmlFor="inputGroupFile04">{fileLabel}</label>
                    </div>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={handleCancelAll}><img src="images/trash.png" alt="Remove All" className="trash" /></button>
                    </div>
                </div>
            </div>
            <button type="button" className="btn btn-info btn-block" onClick={handleSubmit}>Upload</button>
        </form>
    )
}
