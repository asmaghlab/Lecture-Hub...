import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFilePdf, FaFileCsv, FaFileVideo, FaDownload, FaEye, FaSearch, FaPlus, FaFilter, FaFileImage, FaFileArchive, FaTimes, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { storageService } from '../../services/storage.service';
import Swal from 'sweetalert2';
import './Results.css';

const Results = () => {
    const { user } = useAuth();
    const [lectures, setLectures] = useState([]);
    const [filteredLectures, setFilteredLectures] = useState([]);
    const [filterType, setFilterType] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewModal, setViewModal] = useState(null);
    const itemsPerPage = 6;

    useEffect(() => {
        // Load user files from storage
        const userFiles = storageService.getFiles(user?.email || 'guest');

        // Only use the files uploaded by the user, no static/mock data
        setLectures(userFiles);
        setFilteredLectures(userFiles);
    }, [user]);

    useEffect(() => {
        let result = lectures;

        // Apply Search
        if (searchTerm) {
            result = result.filter(item =>
                (item.title || item.name)?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply Type Filter
        if (filterType !== 'all') {
            result = result.filter(item => {
                const itemType = (item.type || item.name?.split('.').pop())?.toLowerCase();
                if (filterType === 'image') return ['jpg', 'jpeg', 'png', 'gif'].includes(itemType);
                if (filterType === 'video') return ['mp4', 'mov', 'avi', 'video'].includes(itemType);
                if (filterType === 'pdf') return itemType === 'pdf';
                if (filterType === 'csv') return itemType === 'csv';
                if (filterType === 'archive') return ['zip', 'rar', '7z'].includes(itemType);
                return true;
            });
        }

        setFilteredLectures(result);
    }, [lectures, searchTerm, filterType]);

    const getIcon = (item) => {
        const type = (item.type || item.name?.split('.').pop())?.toLowerCase();
        switch (type) {
            case 'pdf': return <FaFilePdf className="res-icon pdf" />;
            case 'csv': return <FaFileCsv className="res-icon csv" />;
            case 'mp4': case 'mov': case 'avi': case 'video': return <FaFileVideo className="res-icon video" />;
            case 'jpg': case 'jpeg': case 'png': case 'gif': case 'image': return <FaFileImage className="res-icon image" />;
            case 'zip': case 'rar': case '7z': return <FaFileArchive className="res-icon zip" />;
            default: return <FaFilePdf className="res-icon" />;
        }
    };

    const handleDownload = (item) => {
        const fileName = item.title || item.name;

        Swal.fire({
            title: 'Downloading...',
            text: `Preparing ${fileName} for download.`,
            icon: 'info',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        }).then(() => {
            // Simulate download action
            const link = document.createElement('a');
            link.href = '#'; // In a real app, this would be the file URL
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            Swal.fire({
                title: 'Downloaded!',
                text: `${fileName} has been downloaded successfully.`,
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            });
        });
    };

    const handleDelete = (item) => {
        const fileName = item.title || item.name;

        Swal.fire({
            title: 'Delete File?',
            text: `Are you sure you want to delete "${fileName}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                const userFiles = storageService.getFiles(user?.email || 'guest');
                const updatedFiles = userFiles.filter(f => f.id !== item.id && f.name !== item.name);
                localStorage.setItem(`files_${user?.email || 'guest'}`, JSON.stringify(updatedFiles));

                setLectures(prev => prev.filter(f => f.id !== item.id));

                Swal.fire({
                    title: 'Deleted!',
                    text: `${fileName} has been deleted.`,
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    };

    const handleView = (item) => {
        setViewModal(item);
    };

    const closeModal = () => {
        setViewModal(null);
    };

    const handleDownloadFromModal = (item) => {
        closeModal();
        const fileName = item.title || item.name;

        // Show loading alert
        Swal.fire({
            title: 'Downloading...',
            text: `Preparing ${fileName} for download.`,
            icon: 'info',
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        }).then(() => {
            // Create a dummy file blob for demonstration
            // In a real app, this would be the actual file data
            const blob = new Blob(['This is a sample file content'], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);

            // Create download link and trigger download
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            // Show success message
            Swal.fire({
                title: 'Downloaded!',
                text: `${fileName} has been downloaded successfully.`,
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            });
        });
    };

    const handleOpenInNewTab = () => {
        const newWindow = window.open('about:blank', '_blank');
        if (newWindow) {
            newWindow.document.write('<html><body><h1>File Preview</h1><p>In a real application, the file would be displayed here.</p></body></html>');
        }
    };

    // Pagination logic
    const totalPages = Math.ceil(filteredLectures.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentLectures = filteredLectures.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="results-page">
            <div className="results-header-section">
                <div className="header-top">
                    <h1 className="page-title">Your Lectures</h1>
                    <Link to="/upload" className="add-more-btn">
                        <FaPlus /> <span>Add New</span>
                    </Link>
                </div>

                <div className="controls-container">
                    <div className="search-wrapper">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search lectures..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button className="clear-search" onClick={() => setSearchTerm('')}>
                                <FaTimes />
                            </button>
                        )}
                    </div>

                    <div className="filter-wrapper">
                        <FaFilter className="filter-icon" />
                        <select
                            className="filter-dropdown"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="all">All Types</option>
                            <option value="pdf">PDF Documents</option>
                            <option value="video">Videos</option>
                            <option value="csv">CSV Spreadsheets</option>
                            <option value="image">Images</option>
                            <option value="archive">Archives (ZIP)</option>
                        </select>
                    </div>
                </div>
            </div>

            {currentLectures.length > 0 ? (
                <>
                    <div className="results-grid">
                        {currentLectures.map((item, index) => (
                            <div key={item.id || index} className="lecture-card">
                                <div className="card-top">
                                    <div className={`icon-box ${(item.type || item.name?.split('.').pop())?.toLowerCase()}`}>
                                        {getIcon(item)}
                                    </div>
                                </div>

                                <div className="card-body">
                                    <h3 className="lecture-title" title={item.title || item.name}>
                                        {item.title || item.name}
                                    </h3>
                                    <p className="lecture-date">{item.date}</p>
                                    <span className="lecture-size">
                                        {item.size && (typeof item.size === 'number' ? (item.size / 1024 / 1024).toFixed(2) + ' MB' : item.size)}
                                    </span>
                                </div>

                                <div className="card-footer">
                                    <button className="footer-btn view-btn" onClick={() => handleView(item)}>
                                        <FaEye /> <span>View</span>
                                    </button>
                                    <button className="footer-btn delete-btn" onClick={() => handleDelete(item)}>
                                        <FaTrash /> <span>Delete</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                className="page-btn"
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <FaChevronLeft /> Previous
                            </button>

                            <div className="page-numbers">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        className={`page-num ${currentPage === i + 1 ? 'active' : ''}`}
                                        onClick={() => paginate(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                className="page-btn"
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next <FaChevronRight />
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="empty-state">
                    <div className="empty-icon-box">
                        <FaSearch />
                    </div>
                    <h3>No lectures found</h3>
                    <p>Try adjusting your search or filter criteria.</p>
                </div>
            )}

            {viewModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>
                            <FaTimes />
                        </button>

                        <div className="modal-header">
                            <div className="modal-icon-large">
                                {getIcon(viewModal)}
                            </div>
                            <h2 className="modal-title">{viewModal.title || viewModal.name}</h2>
                            <p className="modal-subtitle">
                                {(viewModal.type || viewModal.name?.split('.').pop())?.toUpperCase()} Preview
                            </p>
                            <p className="modal-description">
                                PDF preview is available in a new tab or you can download the file.
                            </p>
                        </div>

                        <div className="modal-footer">
                            <div className="modal-actions">
                                <button className="modal-action-btn open-btn" onClick={handleOpenInNewTab}>
                                    <FaEye /> Open in New Tab
                                </button>
                                <button className="modal-action-btn download-btn" onClick={() => handleDownloadFromModal(viewModal)}>
                                    <FaDownload /> Download
                                </button>
                            </div>
                            <button className="modal-close-btn" onClick={closeModal}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Results;
