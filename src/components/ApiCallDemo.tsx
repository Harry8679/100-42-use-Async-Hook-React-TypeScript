import { useState } from 'react';
import { useAsync } from '../hooks';
import type { User } from '../types';

const fetchUser = async (userId: number): Promise<User> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const ApiCallDemo = () => {
  const [userId, setUserId] = useState(1);
  const { data, status, error, execute, reset } = useAsync(fetchUser);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Appel API
      </h3>

      <div className="space-y-6">
        {/* User Selector */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Sélectionner un utilisateur (ID: {userId})
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={userId}
            onChange={(e) => setUserId(parseInt(e.target.value))}
            disabled={status === 'pending'}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500 disabled:opacity-50"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500 mt-1">
            <span>1</span>
            <span>10</span>
          </div>
        </div>

        {/* Status Badge */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              Statut :
            </span>
            <span
              className={`px-4 py-2 rounded-full font-bold ${
                status === 'idle'
                  ? 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                  : status === 'pending'
                  ? 'bg-purple-500 text-white animate-pulse'
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
            <div className="text-6xl mb-4">👤</div>
            <p className="text-gray-600 dark:text-gray-400">
              Cliquez sur "Charger" pour récupérer les données
            </p>
          </div>
        )}

        {status === 'pending' && (
          <div className="p-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl">
            <div className="flex items-center justify-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
              <div className="text-purple-700 dark:text-purple-400 font-semibold">
                Chargement de l'utilisateur #{userId}...
              </div>
            </div>
          </div>
        )}

        {status === 'success' && data && (
          <div className="p-6 bg-green-100 dark:bg-green-900/20 rounded-xl border-2 border-green-500 animate-scale-in">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {data.name.charAt(0)}
              </div>
              <div>
                <div className="text-xl font-bold text-gray-800 dark:text-white">
                  {data.name}
                </div>
                <div className="text-gray-600 dark:text-gray-400">@{data.username}</div>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-xl">📧</span>
                <span className="text-gray-700 dark:text-gray-300">{data.email}</span>
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
            onClick={() => execute(userId)}
            disabled={status === 'pending'}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors"
          >
            {status === 'pending' ? '⏳ Chargement...' : '🔄 Charger'}
          </button>
          <button
            onClick={reset}
            disabled={status === 'idle' || status === 'pending'}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors"
          >
            🗑️ Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiCallDemo;