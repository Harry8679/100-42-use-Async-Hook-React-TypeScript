import { useAsync } from '../hooks';

const fetchUserData = async (): Promise<{ name: string; email: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    name: 'John Doe',
    email: 'john@example.com',
  };
};

const BasicAsyncDemo = () => {
  const { data, status, error, execute, reset } = useAsync(fetchUserData);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Async Basique
      </h3>

      <div className="space-y-6">
        {/* Status Display */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              Statut actuel :
            </span>
            <span
              className={`px-4 py-2 rounded-full font-bold ${
                status === 'idle'
                  ? 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                  : status === 'pending'
                  ? 'bg-blue-500 text-white animate-pulse'
                  : status === 'success'
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
              }`}
            >
              {status.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Content */}
        {status === 'idle' && (
          <div className="p-12 bg-gray-100 dark:bg-gray-700/20 rounded-xl text-center">
            <div className="text-6xl mb-4">⏸️</div>
            <p className="text-gray-600 dark:text-gray-400">
              Cliquez sur "Charger" pour démarrer
            </p>
          </div>
        )}

        {status === 'pending' && (
          <div className="p-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
            <div className="flex items-center justify-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              <div className="text-blue-700 dark:text-blue-400 font-semibold">
                Chargement en cours...
              </div>
            </div>
          </div>
        )}

        {status === 'success' && data && (
          <div className="p-6 bg-green-100 dark:bg-green-900/20 rounded-xl border-2 border-green-500 animate-scale-in">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">✅</span>
              <div className="font-bold text-green-700 dark:text-green-400 text-xl">
                Succès !
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">👤</span>
                <span className="text-gray-800 dark:text-white font-semibold">
                  {data.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">📧</span>
                <span className="text-gray-800 dark:text-white">{data.email}</span>
              </div>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="p-6 bg-red-100 dark:bg-red-900/20 rounded-xl border-2 border-red-500 animate-scale-in">
            <div className="flex items-center gap-3">
              <span className="text-4xl">❌</span>
              <div>
                <div className="font-bold text-red-700 dark:text-red-400 text-xl">
                  Erreur
                </div>
                <p className="text-red-600 dark:text-red-500">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => execute()}
            disabled={status === 'pending'}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors"
          >
            {status === 'pending' ? '⏳ Chargement...' : '▶ Charger'}
          </button>
          <button
            onClick={reset}
            disabled={status === 'idle' || status === 'pending'}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors"
          >
            🔄 Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicAsyncDemo;