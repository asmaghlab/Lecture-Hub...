import React from 'react';

const Avatar = ({ name }) => {
    const initial = name ? name.charAt(0).toUpperCase() : '?';

    // Generate a consistent color based on the name
    const getColor = (str) => {
        let hash = 0;
        if (!str) return '#ccc';
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
        return '#' + '00000'.substring(0, 6 - c.length) + c;
    };

    const style = {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: getColor(name),
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '14px'
    };

    return (
        <div style={style}>
            {initial}
        </div>
    );
};

export default Avatar;
