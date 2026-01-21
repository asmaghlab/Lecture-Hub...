import React from 'react';

const Avatar = ({ name }) => {
    const initial = name ? name.charAt(0).toUpperCase() : '?';

    const style = {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: '#e0f2fe', // Very light, elegant blue (Sky 100)
        color: '#0369a1', // Darker blue for text contrast (Sky 700)
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '700',
        fontSize: '14px',
        border: '1.5px solid #bae6fd' // Soft border (Sky 200)
    };

    return (
        <div style={style}>
            {initial}
        </div>
    );
};

export default Avatar;
