import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFilePdf, FaFileCsv, FaFileVideo, FaDownload, FaEye, FaSearch, FaPlus, FaFilter, FaFileImage, FaFileArchive, FaEllipsisV } from 'react-icons/fa';
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

    useEffect(() => {
        // Load user files from storage
        const userFiles = storageService.getFiles(user?.email || 'guest');

        // Mock data merged with user data
        const mockData = [
            { id: 'mock1', title: 'Introduction to React', type: 'pdf', date: '2023-10-15', size: '2.4 MB' },
            { id: 'mock2', title: 'Advanced State Management', type: 'video', date: '2023-10-18', size: '150 MB' },
            { id: 'mock3', title: 'User Data Analysis', type: 'csv', date: '2023-10-20', size: '45 KB' },
        ];

        // Combine: User files first (so they appear at the top)
        const allFiles = [...userFiles, ...mockData];
        setLectures(allFiles);
        setFilteredLectures(allFiles);
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

    const handleView = (item) => {
        const fileName = item.title || item.name;
        // Open a new tab (simulation)
        window.open('', '_blank');

        // Or show a modal if preferred, but "View opens it" usually means new tab or modal.
        // Since we don't have the real file, we'll inform the user in a realistic way or just rely on the new tab opening.
    };

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
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
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

            {filteredLectures.length > 0 ? (
                <div className="results-grid">
                    {filteredLectures.map((item, index) => (
                        <div key={item.id || index} className="lecture-card">
                            <div className="card-top">
                                <div className={`icon-box ${(item.type || item.name?.split('.').pop())?.toLowerCase()}`}>
                                    {getIcon(item)}
                                </div>
                                <div className="card-actions-top">
                                    {/* Optional robust actions menu if needed, using View/Download buttons at bottom for now */}
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
                                    <FaEye /> View
                                </button>
                                <button className="footer-btn download-btn" onClick={() => handleDownload(item)}>
                                    <FaDownload /> Download
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <div className="empty-icon-box">
                        <FaSearch />
                    </div>
                    <h3>No lectures found</h3>
                    <p>Try adjusting your search or filter criteria.</p>
                </div>
            )}
        </div>
    );
};

export default Results;
