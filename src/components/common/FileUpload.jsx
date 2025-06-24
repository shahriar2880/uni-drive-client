import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = () => {
    const onDrop = useCallback((acceptedFiles) => {
        // Handle the files here
        console.log(acceptedFiles);
        // You can save the files to the server or perform other actions
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}>
            <input {...getInputProps()} />
            <p>Drag and drop files here, or click to select files</p>
        </div>
    );
};

export default FileUpload;