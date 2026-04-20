import { useAsync } from '../hooks';
import type { ProcessingResult } from '../types';

const processData = async (items: number): Promise<ProcessingResult> => {
  const startTime = Date.now();
  const results: string[] = [];
  
  for (let i = 1; i <= items; i++) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    results.push(`Item ${i} traité`);
  }
  
  const duration = Date.now() - startTime;
  
  return {
    processed: items,
    total: items,
    duration,
    results,
  };
};

const DataProcessingDemo = () => {
  const { data, status, error, execute, reset } = useAsync(processData);

  const handleProcess = (count: number) => {
    execute(count);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Traitement de Données
      </h3>

      <div className="space-y-6">
        {status === 'idle' && (
          <>
            <div className="p-8 bg-gray-100 dark:bg-gray-700/20 rounded-xl text-center">
              <div className="text-6xl mb-4">⚙️</div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Sélectionnez le nombre d'items à traiter
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[5, 10, 20].map((count) => (
                <button
                  key={count}
                  onClick={() => handleProcess(count)}
                  className="px-6 py-4 bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-bold text-lg transition-all transform hover:scale-105"
                >
                  {count} items
                </button>
              ))}
            </div>
          </>
        )}

        {status === 'pending' && (
          <div className="p-8 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              <div className="text-blue-700 dark:text-blue-400 font-semibold">
                Traitement en cours...
              </div>
            </div>
            <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-4 overflow-hidden">
              <div className="bg-blue-500 h-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          </div>
        )}

        {status === 'success' && data && (
          <div className="space-y-4 animate-scale-in">
            <div className="p-6 bg-green-100 dark:bg-green-900/20 rounded-xl border-2 border-green-500">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">✅</span>
                <div className="font-bold text-green-700 dark:text-green-400 text-xl">
                  Traitement terminé !
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
                  <div className="text-sm text-gray-500 dark:text-gray-500 mb-1">
                    Traités
                  </div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {data.processed}
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
                  <div className="text-sm text-gray-500 dark:text-gray-500 mb-1">
                    Total
                  </div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {data.total}
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
                  <div className="text-sm text-gray-500 dark:text-gray-500 mb-1">
                    Durée
                  </div>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {(data.duration / 1000).toFixed(1)}s
                  </div>
                </div>
              </div>

              <div className="max-h-40 overflow-y-auto space-y-1">
                {data.results.map((result, index) => (
                  <div
                    key={index}
                    className="p-2 bg-white dark:bg-gray-800 rounded text-sm text-gray-700 dark:text-gray-300"
                  >
                    ✓ {result}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={reset}
              className="w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
            >
              🔄 Nouveau traitement
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="p-6 bg-red-100 dark:bg-red-900/20 rounded-xl border-2 border-red-500 animate-scale-in">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">❌</span>
              <div>
                <div className="font-bold text-red-700 dark:text-red-400 text-xl">
                  Erreur de traitement
                </div>
                <p className="text-red-600 dark:text-red-500">{error}</p>
              </div>
            </div>
            <button
              onClick={reset}
              className="w-full px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
            >
              🔄 Réessayer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataProcessingDemo;