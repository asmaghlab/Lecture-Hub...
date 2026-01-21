import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt, FaFilePdf, FaFileCsv, FaFileImage, FaFileVideo, FaTimes, FaFileArchive, FaList } from 'react-icons/fa';
import toast from 'react-hot-toast';
import './Upload.css';

const Upload = () => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const onDrop = useCallback(acceptedFiles => {
        setFiles(prev => {
            // Filter duplicates efficiently within the setter to avoid dependency on 'files' in useCallback
            const newFiles = acceptedFiles.filter(file => !prev.some(f => f.name === file.name));
            if (newFiles.length < acceptedFiles.length) {
                toast('Some files were already added', { icon: 'ℹ️', id: 'dup-toast' });
            }
            if (newFiles.length > 0) {
                toast.success(`Added ${newFiles.length} file(s)`, { id: 'add-toast' });
                return [...prev, ...newFiles];
            }
            return prev;
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: true,
        maxSize: 100 * 1024 * 1024 // 100MB
    });

    const removeFile = (name) => {
        setFiles(prev => prev.filter(file => file.name !== name));
    };

    const clearAll = () => {
        setFiles([]);
        setUploadProgress(0);
    };

    const handleUpload = async () => {
        if (files.length === 0) return;

        setUploading(true);
        setUploadProgress(0);
        const loadingToast = toast.loading('Starting upload...');

        // Simulate upload progress
        const totalSteps = 20;
        for (let i = 1; i <= totalSteps; i++) {
            await new Promise(resolve => setTimeout(resolve, 100)); // Simulate network
            const progress = Math.round((i / totalSteps) * 100);
            setUploadProgress(progress);
            toast.loading(`Uploading... ${progress}%`, { id: loadingToast });
        }

        toast.dismiss(loadingToast);
        toast.success('Files uploaded successfully!', { duration: 4000 });
        setFiles([]);
        setUploading(false);
        setUploadProgress(0);
    };

    const getFileIcon = (fileName) => {
        const ext = fileName.split('.').pop().toLowerCase();
        if (ext === 'pdf') return <FaFilePdf className="file-icon pdf" />;
        if (ext === 'csv') return <FaFileCsv className="file-icon csv" />;
        if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return <FaFileImage className="file-icon image" />;
        if (['mp4', 'mov', 'avi'].includes(ext)) return <FaFileVideo className="file-icon video" />;
        if (['zip', 'rar', '7z'].includes(ext)) return <FaFileArchive className="file-icon zip" />;
        return <FaFilePdf className="file-icon default" />; // Fallback icon
    };

    const formatSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="upload-page">
            <div className="upload-header">
                <h1>Upload Files</h1>
                <p>Upload PDFs, CSVs, images, videos, or ZIP files</p>
            </div>

            <div className={`dropzone-area ${isDragActive ? 'active' : ''}`} {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="dropzone-content">
                    <div className="cloud-icon-wrapper">
                        <FaCloudUploadAlt />
                    </div>
                    <h3>Drag & drop files here</h3>
                    <p className="or-text">or click to browse</p>

                    <div className="file-types-badges">
                        <span className="badge">PDF</span>
                        <span className="badge">CSV</span>
                        <span className="badge">Images</span>
                        <span className="badge">Videos</span>
                        <span className="badge">ZIP</span>
                    </div>

                    <p className="max-size">Max: 100MB</p>
                </div>
            </div>

            <div className="files-list-container">
                <div className="list-header">
                    <span className="list-title">
                        <FaList /> Files ({files.length})
                    </span>
                    <button onClick={clearAll} className="clear-btn" disabled={uploading || files.length === 0}>Clear</button>
                </div>

                {files.length > 0 ? (
                    <div className="files-list">
                        {files.map((file, index) => (
                            <div key={`${file.name}-${index}`} className="file-item">
                                <div className="file-info-left">
                                    {getFileIcon(file.name)}
                                    <div className="file-details">
                                        <span className="filename">{file.name}</span>
                                        <span className="filesize">{formatSize(file.size)}</span>
                                    </div>
                                </div>
                                <div className="file-info-right">
                                    <button
                                        onClick={() => removeFile(file.name)}
                                        className="remove-btn"
                                        aria-label="Remove file"
                                        disabled={uploading}
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-files-placeholder">
                        <p>No files selected yet</p>
                    </div>
                )}

                <div className="upload-footer">
                    {uploading && (
                        <div className="progress-bar-container">
                            <div
                                className="progress-bar-fill"
                                style={{ width: `${uploadProgress}%` }}
                            ></div>
                            <span className="progress-text">{uploadProgress}%</span>
                        </div>
                    )}

                    <button
                        className="upload-action-btn"
                        onClick={handleUpload}
                        disabled={uploading || files.length === 0}
                    >
                        <FaCloudUploadAlt />
                        {uploading ? `Uploading...` : `Upload ${files.length > 0 ? files.length : ''} File(s)`}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Upload;
