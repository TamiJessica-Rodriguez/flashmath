import axios from 'axios';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadSubmission } from '../../controllers/userController';

const FileUploadPreview = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    // Hanterar filuppladdning
    const onDrop = (acceptedFiles: File[]) => {
        setSelectedFiles(acceptedFiles);
        setMessage(null);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
        },
    });

    // Skickar fil till backend
    const handleUpload = async () => {
        if (!selectedFiles.length) {
            setMessage('Vänligen välj en fil först.');
            return;
        }

        try {
            setUploading(true);
            const response = await uploadSubmission(selectedFiles[0], 'Min inlämning'); // Titel kan vara dynamisk
            console.log('Inlämning uppladdad:', response);
            setMessage('Inlämningen har laddats upp!');
            setSelectedFiles([]);
        } catch (error) {
            console.error('Error:', error);
            if (axios.isAxiosError(error)) {
                setMessage(error.response?.data?.message || 'Ett fel uppstod vid uppladdning.');
            } else {
                setMessage('Ett fel uppstod vid uppladdning.');
            }
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <div {...getRootProps()} className={`p-4 border-2 ${isDragActive ? 'border-blue-500' : 'border-gray-300'} rounded`}>
                <input {...getInputProps()} />
                <p className="text-center text-gray-500">{selectedFiles.length ? selectedFiles[0].name : 'Dra och släpp en PDF här eller klicka för att välja en fil.'}</p>
            </div>
            {selectedFiles.length > 0 && (
                <div className="mt-4 flex justify-between items-center">
                    <p className="text-sm text-gray-700">Fil vald: {selectedFiles[0].name}</p>
                    <button onClick={() => setSelectedFiles([])} className="text-red-500 text-sm underline hover:text-red-700">
                        Ta bort
                    </button>
                </div>
            )}
            <button onClick={handleUpload} disabled={uploading || !selectedFiles.length} className={`mt-4 bg-blue-500 text-white py-2 px-4 rounded ${uploading ? 'opacity-50' : 'hover:bg-blue-600'}`}>
                {uploading ? 'Laddar upp...' : 'Ladda upp'}
            </button>
            {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
        </div>
    );
};

export default FileUploadPreview;
