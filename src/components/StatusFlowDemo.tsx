import { useAsync } from '../hooks';

const simulateOperation = async (): Promise<{ message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { message: 'Opération réussie !' };
};

const StatusFlowDemo = () => {
  const { data, status, error, execute, reset, isIdle, isPending, isSuccess, isError } =
    useAsync(simulateOperation);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Flux de Statuts
      </h3>

      <div className="space-y-6">
        {/* Status Flow Diagram */}
        <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <h4 className="font-bold text-gray-800 dark:text-white mb-4">
            Diagramme de flux :
          </h4>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                isIdle
                  ? 'bg-gray-500 text-white scale-110'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              IDLE
            </div>
            <span className="text-2xl">→</span>
            <div
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                isPending
                  ? 'bg-blue-500 text-white scale-110 animate-pulse'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              PENDING
            </div>
            <span className="text-2xl">→</span>
            <div className="flex gap-3">
              <div
                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                  isSuccess
                    ? 'bg-green-500 text-white scale-110'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                SUCCESS
              </div>
              <span className="text-gray-500 dark:text-gray-500">ou</span>
              <div
                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                  isError
                    ? 'bg-red-500 text-white scale-110'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                ERROR
              </div>
            </div>
          </div>
        </div>

        {/* Boolean Helpers */}
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg border-2 ${
            isIdle
              ? 'bg-gray-100 dark:bg-gray-700 border-gray-500'
              : 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700'
          }`}>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                isIdle
              </span>
              <span className={`text-2xl ${isIdle ? 'animate-bounce' : ''}`}>
                {isIdle ? '✅' : '❌'}
              </span>
            </div>
          </div>

          <div className={`p-4 rounded-lg border-2 ${
            isPending
              ? 'bg-blue-100 dark:bg-blue-900/20 border-blue-500'
              : 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700'
          }`}>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                isPending
              </span>
              <span className={`text-2xl ${isPending ? 'animate-spin' : ''}`}>
                {isPending ? '⏳' : '❌'}
              </span>
            </div>
          </div>

          <div className={`p-4 rounded-lg border-2 ${
            isSuccess
              ? 'bg-green-100 dark:bg-green-900/20 border-green-500'
              : 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700'
          }`}>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                isSuccess
              </span>
              <span className={`text-2xl ${isSuccess ? 'animate-bounce' : ''}`}>
                {isSuccess ? '✅' : '❌'}
              </span>
            </div>
          </div>

          <div className={`p-4 rounded-lg border-2 ${
            isError
              ? 'bg-red-100 dark:bg-red-900/20 border-red-500'
              : 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700'
          }`}>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                isError
              </span>
              <span className={`text-2xl ${isError ? 'animate-bounce' : ''}`}>
                {isError ? '✅' : '❌'}
              </span>
            </div>
          </div>
        </div>

        {/* Current Status Display */}
        <div className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Statut actuel
          </div>
          <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-4">
            {status.toUpperCase()}
          </div>
          {data && (
            <div className="text-green-700 dark:text-green-400">
              {data.message}
            </div>
          )}
          {error && (
            <div className="text-red-700 dark:text-red-400">
              {error}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => execute()}
            disabled={isPending}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors"
          >
            {isPending ? '⏳ En cours...' : '▶ Exécuter'}
          </button>
          <button
            onClick={reset}
            disabled={isIdle || isPending}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors"
          >
            🔄 Reset
          </button>
        </div>

        <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            💡 Les helpers booléens (isIdle, isPending, isSuccess, isError) facilitent la gestion conditionnelle !
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatusFlowDemo;