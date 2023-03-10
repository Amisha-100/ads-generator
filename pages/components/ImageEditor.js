import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

function ImageEditor() {
    const [file, setFile] = useState(null)
    
    function handleDrop(acceptedFiles) {
        setFile(acceptedFiles[0])
    }
    
    const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop })

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                file ? (<img src={URL.createObjectURL(file)} alt="Uploaded image" />) : (
                <p>Drag 'n' drop some files here, or click to select files</p>)
            }
        </div>
    )
}