import React from 'react';
import './Upload.css';

const Upload = () => {
    return (
        <div className="upload-container">
            <h2>Upload Files</h2>
            <div className="upload-area">
                <p>Drag and drop files here or click to select</p>
                <input type="file" multiple className="file-input" />
            </div>
        </div>
    );
};

export default Upload;
