import React, { useEffect, useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconX from '../../components/Icon/IconX';
import IconFile from '../../components/Icon/IconFile';
import { useNavigate } from 'react-router-dom';
import { uploadFiles } from '../../controllers/imageController';
import { useDropzone } from 'react-dropzone';

const FileUploadPreview = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [files, setFiles] = useState<File[]>([]);

    React.useEffect(() => {
        dispatch(setPageTitle('Filuppladdning'));
    }, [dispatch]);

    const onDrop = (acceptedFiles: File[]) => {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpg', '.jpeg', '.png'],
            'application/pdf': ['.pdf'],
        },
        maxFiles: 20,
    });

    const handleNavigate = async () => {
        try {
            const response = await uploadFiles(files);
            console.log('Uploaded Files:', response);
            navigate('/bildhantering');
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    const handleRemoveFile = (index: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    return (
        <div>
            <div className="multiple-file-upload panel">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Filuppladdning</h5>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600" onClick={handleNavigate} disabled={files.length === 0}>
                        Gå vidare
                    </button>
                </div>
                <div className="custom-file-container mb-5" data-upload-id="mySecondImage">
                    <div className="label-container">
                        <label>Ladda upp dina filer här - PDF, PNG, JPG </label>
                        <button type="button" className="custom-file-container__image-clear" title="Clear All" onClick={() => setFiles([])}>
                            ×
                        </button>
                    </div>
                    <div
                        {...getRootProps()}
                        className={`upload__image-wrapper p-4 border-2 ${isDragActive ? 'border-blue-500 bg-blue-100' : 'border-gray-300'} min-h-[300px] flex flex-col items-center justify-center`}
                    >
                        <input {...getInputProps()} />
                        {files.length === 0 ? (
                            <div className="flex flex-col items-center text-gray-500">
                                <IconFile className="w-12 h-12 mb-2" />
                                <p>Välj filer... eller släpp dem här</p>
                            </div>
                        ) : (
                            <div className="grid gap-4 sm:grid-cols-3 grid-cols-1 mt-4 w-full items-center justify-center">
                                {files.map((file, index) => (
                                    <div key={index} className="relative flex flex-col items-center p-2 border rounded shadow">
                                        <button
                                            type="button"
                                            className="absolute top-1 right-1 bg-dark-light dark:bg-dark dark:text-white-dark rounded-full p-0.5"
                                            title="Remove File"
                                            onClick={() => handleRemoveFile(index)}
                                        >
                                            <IconX className="w-3 h-3" />
                                        </button>

                                        {file.type === 'application/pdf' ? (
                                            <div className="flex flex-col items-center">
                                                <IconFile className="w-12 h-12 text-gray-500 mb-2" />
                                                <p className="text-sm text-gray-700 dark:text-white w-full text-center">{file.name}</p>
                                            </div>
                                        ) : (
                                            <img src={URL.createObjectURL(file)} alt="Preview" className="object-cover shadow rounded w-32 h-32 mb-2" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileUploadPreview;
