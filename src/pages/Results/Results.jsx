import React from 'react';
import { FaFilePdf, FaFileCsv, FaFileVideo, FaDownload, FaEye, FaSearch } from 'react-icons/fa';
import './Results.css';

const Results = () => {
    // Mock data for results
    const results = [
        { id: 1, title: 'Introduction to React', type: 'pdf', date: '2023-10-15', size: '2.4 MB' },
        { id: 2, title: 'Advanced State Management', type: 'video', date: '2023-10-18', size: '150 MB' },
        { id: 3, title: 'User Data Analysis', type: 'csv', date: '2023-10-20', size: '45 KB' },
        { id: 4, title: 'Component Lifecycle', type: 'pdf', date: '2023-10-22', size: '1.8 MB' },
        { id: 5, title: 'Hooks Deep Dive', type: 'video', date: '2023-10-25', size: '210 MB' },
        { id: 6, title: 'Routing Structure', type: 'pdf', date: '2023-10-28', size: '3.2 MB' },
    ];

    const getIcon = (type) => {
        switch (type) {
            case 'pdf': return <FaFilePdf className="res-icon pdf" />;
            case 'csv': return <FaFileCsv className="res-icon csv" />;
            case 'video': return <FaFileVideo className="res-icon video" />;
            default: return <FaFilePdf className="res-icon" />;
        }
    };

    return (
        <div className="results-page">
            <div className="results-header">
                <h1>Lecture Results</h1>
                <div className="search-bar">
                    <FaSearch className="search-icon" />
                    <input type="text" placeholder="Search lectures..." />
                </div>
            </div>

            <div className="results-grid">
                {results.map(item => (
                    <div key={item.id} className="result-card">
                        <div className="card-icon">
                            {getIcon(item.type)}
                        </div>
                        <div className="card-content">
                            <h3>{item.title}</h3>
                            <div className="card-meta">
                                <span>{item.date}</span>
                                <span>•</span>
                                <span>{item.size}</span>
                            </div>
                        </div>
                        <div className="card-actions">
                            <button className="action-btn view" title="View">
                                <FaEye />
                            </button>
                            <button className="action-btn download" title="Download">
                                <FaDownload />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Results;
