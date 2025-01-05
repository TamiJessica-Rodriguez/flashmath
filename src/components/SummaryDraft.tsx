// import { Image } from '../types/Image';
// import Analytics from './Analytics';
// import IconEye from './Icon/IconEye';
// import IconHeart from './Icon/IconHeart';
// import IconSend from './Icon/IconSend';
// import { createPdf, handlePDFDownload } from './CreatePdf';
// import { createCsv } from './CreateCsv';

// interface SummaryDraftProps {
//     image: Image;
//     logoUrl?: string;
// }

// const SummaryDraft = ({ image, logoUrl }: SummaryDraftProps) => {
//     return (
//         <div className="panel">
//             <div className="flex items-center justify-between mb-5">
//                 <h5 className="font-semibold text-lg dark:text-white-light">{image.fileName || 'Unknown'}</h5>
//             </div>
//             <div className="mb-5 flex items-center justify-center">
//                 <div className="max-w-[28rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
//                     <div className="py-7 px-6">
//                         <div className="-mt-7 mb-7 -mx-6 rounded-tl rounded-tr h-[260px] overflow-hidden">
//                             <img src={image.dataURL || '/assets/images/profile-28.jpeg'} className="w-full h-full object-contain" />
//                         </div>
//                         <p className="text-primary text-xs mb-1.5 font-bold break-words overflow-hidden">{image.dataURL}</p>

//                         {image.markers && <Analytics markers={image.markers} />}

//                         <div className="relative flex justify-between mt-6 pt-4 before:w-[250px] before:h-[1px] before:bg-white-light before:inset-x-0 before:top-0 before:absolute before:mx-auto dark:before:bg-[#1b2e4b]">
//                             <div className="flex gap-4 w-full">
//                                 <button type="button" className="btn btn-info w-1/2 gap-2" onClick={() => handlePDFDownload([image], logoUrl ?? '../../public/logo192.png')}>
//                                     <IconSend className="ltr:mr-2 rtl:ml-2 shrink-0" />
//                                     PDF
//                                 </button>
//                                 <button type="button" className="btn btn-info w-1/2 gap-2" onClick={() => createCsv([image])}>
//                                     <IconSend className="ltr:mr-2 rtl:ml-2 shrink-0" />
//                                     CSV
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SummaryDraft;
