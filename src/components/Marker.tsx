import React from 'react';

const Marker: React.FC<MarkerProps> = ({ topLeft, topRight, bottomLeft, bottomRight, label, color = 'red', onClick }) => {
    if (!topLeft || !topRight || !bottomLeft || !bottomRight) {
        return null;
    }
    const width = topRight.x - topLeft.x;
    const height = bottomLeft.y - topLeft.y;

    return (
        <div
            onClick={onClick}
            style={{
                position: 'absolute',
                top: `${topLeft.y}px`,
                left: `${topLeft.x}px`,
                width: `${width}px`,
                height: `${height}px`,
                border: `2px solid ${color === 'transparent' ? 'transparent' : 'rgba(255, 0, 0, 0.2)'}`,
                backgroundColor: color === 'transparent' ? 'transparent' : 'rgba(255, 0, 0, 0.2)',
                cursor: 'pointer',
            }}
            title={label}
        ></div>
    );
};

export default Marker;
