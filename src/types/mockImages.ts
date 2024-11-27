import { Image } from '../types/Image';

export const mockImages: Image[] = [
    {
        id: 1,
        fileName: 'Mock Image 1',
        date: '2024-11-13',
        dataURL: '/mockImage1.jpg',
        markers: [
            {
                topLeft: { x: 574, y: 140 },
                topRight: { x: 619, y: 140 },
                bottomLeft: { x: 574, y: 181 },
                bottomRight: { x: 619, y: 181 },
                label: 'Lamputtag 2500 ÖG',
                onClick: () => console.log('Marker clicked: Eluttag'),
            },
        ],
    },
    {
        id: 2,
        fileName: 'Mock Image 2',
        date: '2024-11-13',
        dataURL: '/mockImage2.png',
        markers: [
            {
                topLeft: { x: 361, y: 277 },
                topRight: { x: 396, y: 277 },
                bottomLeft: { x: 361, y: 316 },
                bottomRight: { x: 396, y: 316 },
                label: 'Lamputtag, ovan U-tak',
                onClick: () => console.log('Marker clicked: Strömbrytare'),
            },
        ],
    },
    {
        id: 3,
        fileName: 'Mock Image 3',
        date: '2024-11-13',
        dataURL: '/mockImage1.jpg',
        markers: [
            {
                topLeft: { x: 574, y: 140 },
                topRight: { x: 619, y: 140 },
                bottomLeft: { x: 574, y: 181 },
                bottomRight: { x: 619, y: 181 },
                label: 'Lamputtag 2500 ÖG',
                onClick: () => console.log('Marker clicked: Eluttag'),
            },
        ],
    },
];
