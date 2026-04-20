import { useState } from 'react';
import { useAsync } from '../hooks';
import type { FileUploadResponse } from '../types';

const uploadFile = async (file: File): Promise<FileUploadResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  
  // Simulate random error
  if (Math.random() > 0.8) {
    throw new Error('Erreur lors du téléchargement du fichier');
  }
  
  return {
    success: true,
    filename: file.name,
    size: file.size,
    uploadedAt: new Date().toISOString(),
  };
};

const FileUploadDemo = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { data, status, error, execute, reset } = useAsync(uploadFile);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      reset();
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      await execute(selectedFile);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    reset();
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Upload de Fichier
      </h3>

      <div className="space-y-6">
        {status === 'success' && data ? (
          <div className="p-6 bg-green-100 dark:bg-green-900/20 rounded-xl border-2 border-green-500 animate-scale-in">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-5xl">✅</span>
              <div>
                <div className="font-bold text-green-700 dark:text-green-400 text-xl">
                  Fichier téléchargé !
                </div>
                <p className="text-green-600 dark:text-green-500">
                  Upload terminé avec succès
                </p>
              </div>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">📄</span>
                <span className="text-gray-800 dark:text-white font-semibold">
                  {data.filename}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">💾</span>
                <span className="text-gray-600 dark:text-gray-400">
                  {formatBytes(data.size)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🕐</span>
                <span className="text-gray-600 dark:text-gray-400">
                  {new Date(data.uploadedAt).toLocaleString('fr-FR')}
                </span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full mt-4 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
            >
              📤 Télécharger un autre fichier
            </button>
          </div>
        ) : (
          <>
            {/* File Input */}
            <div className="p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-center hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
              <input
                type="file"
                onChange={handleFileChange}
                disabled={status === 'pending'}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer block"
              >
                <div className="text-6xl mb-4">📁</div>
                <div className="text-gray-700 dark:text-gray-300 font-semibold mb-2">
                  Cliquez pour sélectionner un fichier
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-500">
                  ou glissez-déposez ici
                </div>
              </label>
            </div>

            {/* Selected File */}
            {selectedFile && (
              <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">📄</span>
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-white">
                        {selectedFile.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {formatBytes(selectedFile.size)}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedFile(null)}
                    disabled={status === 'pending'}
                    className="p-2 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <span className="text-2xl">🗑️</span>
                  </button>
                </div>
              </div>
            )}

            {/* Upload Progress */}
            {status === 'pending' && (
              <div className="p-6 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                  <div>
                    <div className="text-blue-700 dark:text-blue-400 font-semibold">
                      Téléchargement en cours...
                    </div>
                    <div className="text-sm text-blue-600 dark:text-blue-500">
                      Veuillez patienter
                    </div>
                  </div>
                </div>
                <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-3 overflow-hidden">
                  <div className="bg-blue-500 h-full animate-pulse" style={{ width: '70%' }}></div>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-lg border-2 border-red-500 animate-scale-in">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">❌</span>
                  <p className="text-red-600 dark:text-red-500 font-semibold">{error}</p>
                </div>
              </div>
            )}

            {/* Upload Button */}
            <button
              onClick={handleUpload}
              disabled={!selectedFile || status === 'pending'}
              className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors"
            >
              {status === 'pending' ? '⏳ Upload en cours...' : '📤 Télécharger'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUploadDemo;