// import { jsPDF } from 'jspdf';
// import { Image } from '../types/Image';

// export const createPdf = (images: Image[], logoUrl?: string, message?: string | null) => {
//     const doc = new jsPDF();

//     images.forEach((image, index) => {
//         if (index > 0) doc.addPage();

//         if (logoUrl) {
//             doc.addImage(logoUrl, 'PNG', 10, 10, 30, 15);
//         } else {
//             doc.setFontSize(12);
//             doc.text('Logo Placeholder', 10, 20);
//         }

//         doc.setFontSize(12);
//         doc.text(`Datum: ${image.date || 'Unknown'}`, 10, 40);

//         if (message && message.trim()) {
//             doc.setFontSize(14);
//             const pageWidth = doc.internal.pageSize.width;
//             const textWidth = doc.getTextWidth(message);
//             doc.text(message, (pageWidth - textWidth) / 2, 50);
//         }

//         doc.setFontSize(16);
//         doc.text(image.fileName || 'Unknown', 10, 60);

//         if (image.dataURL) {
//             doc.addImage(image.dataURL, 'JPEG', 10, 70, 180, 100);
//         }

//         // Markers Section
//         doc.setFontSize(12);
//         doc.text('Markeringar:', 10, 180);

//         const labelCounts: { [key: string]: number } = {};
//         image.markers?.forEach((marker) => {
//             const label = marker.label || 'Unknown Marker';
//             labelCounts[label] = (labelCounts[label] || 0) + 1;
//         });

//         let yPosition = 190;
//         Object.entries(labelCounts).forEach(([label, count]) => {
//             doc.text(`- ${label}: ${count}`, 10, yPosition);
//             yPosition += 10;
//         });

//         doc.setFontSize(10);
//         doc.text('Powered by trAI', doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
//         doc.text(`Sida ${index + 1}`, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10);
//     });

//     doc.save(`summary_${new Date().toLocaleDateString()}.pdf`);
// };

// export const handlePDFDownload = (images: Image[], logoUrl: string) => {
//     const message = 'Om ett litet infomeddelande ska vara på plats så kan det vara här, till exempel!';
//     createPdf(images, logoUrl, message);
// };
