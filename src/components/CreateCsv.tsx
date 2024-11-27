import { Image } from '../types/Image';

export const createCsv = (images: Image[]) => {
    const creatorName = 'Admin';

    let csvContent = `Skapad av,${creatorName}\n`;
    csvContent += `\n`;

    csvContent += `Datum,ProcessID,Filnamn,URL,Antal Markeringar,Hittad Komponent,Antal\n`;

    images.forEach((image) => {
        const totalMarkers = image.markers?.length || 0;

        const labelCounts: { [key: string]: number } = {};
        image.markers?.forEach((marker) => {
            const label = marker.label || 'Okänd komponent';
            labelCounts[label] = (labelCounts[label] || 0) + 1;
        });

        csvContent += `${image.date || 'N/A'},${image.id},${image.fileName || 'Unknown'},${image.dataURL || 'N/A'},${totalMarkers},,\n`;

        Object.entries(labelCounts).forEach(([label, count]) => {
            csvContent += `,,,"",${label},${count}\n`;
        });

        csvContent += '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `summary_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};
