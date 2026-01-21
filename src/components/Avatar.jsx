import React from 'react';

const Avatar = ({ name }) => {
    const initial = name ? name.charAt(0).toUpperCase() : '?';

    const style = {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: '#89CFF0', // Baby Blue
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '14px',
        border: '1px solid #e1e4e8' // Optional subtle border for contrast against white
    };

    return (
        <div style={style}>
            {initial}
        </div>
    );
};

export default Avatar;
