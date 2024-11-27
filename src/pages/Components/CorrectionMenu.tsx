// import React from 'react';
// import { useSelector } from 'react-redux';
// import { IRootState } from '../../store';

// interface CorrectionMenuProps {
//     marker: { x: number; y: number; label: string };
//     onClose: () => void;
//     onSelect: (newLabel: string) => void;
//     options: string[];
// }

// const CorrectionMenu: React.FC<CorrectionMenuProps> = ({ marker, onClose, onSelect, options }) => {
//     const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

//     return (
//         <ul
//             style={{
//                 position: 'absolute',
//                 left: marker.x,
//                 top: marker.y,
//                 backgroundColor: '#fff',
//                 border: '1px solid #ccc',
//                 padding: '10px',
//                 zIndex: 1000,
//                 minWidth: '170px',
//                 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//                 listStyleType: 'none',
//                 margin: 0,
//             }}
//         >
//             {options.map((option, index) => (
//                 <li key={index} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
//                     <button
//                         type="button"
//                         onClick={() => {
//                             onSelect(option);
//                             onClose();
//                         }}
//                         style={{
//                             background: 'none',
//                             border: 'none',
//                             color: '#007bff',
//                             cursor: 'pointer',
//                             width: '100%',
//                             textAlign: 'left',
//                             padding: '8px 12px',
//                             transition: 'background-color 0.3s',
//                         }}
//                         onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f8ff')}
//                         onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
//                     >
//                         {option}
//                     </button>
//                 </li>
//             ))}
//         </ul>
//     );
// };

// export default CorrectionMenu;
