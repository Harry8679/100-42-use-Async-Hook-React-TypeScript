import { useState } from 'react';
import { useAsync } from '../hooks';
import type { FormData } from '../types';

const submitForm = async (formData: FormData): Promise<{ success: boolean; message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  // Simulate random error
  if (Math.random() > 0.7) {
    throw new Error('Erreur réseau. Veuillez réessayer.');
  }
  
  return {
    success: true,
    message: `Formulaire soumis avec succès pour ${formData.name}`,
  };
};

const FormSubmissionDemo = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const { data, status, error, execute, reset } = useAsync(submitForm);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await execute(formData);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', message: '' });
    reset();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Soumission de Formulaire
      </h3>

      <div className="space-y-6">
        {status === 'success' && data ? (
          <div className="p-6 bg-green-100 dark:bg-green-900/20 rounded-xl border-2 border-green-500 animate-scale-in">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-5xl">🎉</span>
              <div>
                <div className="font-bold text-green-700 dark:text-green-400 text-xl">
                  Message envoyé !
                </div>
                <p className="text-green-600 dark:text-green-500">{data.message}</p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
            >
              📝 Envoyer un autre message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Nom
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={status === 'pending'}
                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-blue-500 rounded-lg text-gray-800 dark:text-white transition-colors disabled:opacity-50"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={status === 'pending'}
                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-blue-500 rounded-lg text-gray-800 dark:text-white transition-colors disabled:opacity-50"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                disabled={status === 'pending'}
                rows={4}
                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-blue-500 rounded-lg text-gray-800 dark:text-white transition-colors resize-none disabled:opacity-50"
                placeholder="Votre message..."
              />
            </div>

            {error && (
              <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-lg border-2 border-red-500 animate-scale-in">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">❌</span>
                  <p className="text-red-600 dark:text-red-500 font-semibold">{error}</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'pending'}
              className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors"
            >
              {status === 'pending' ? '📤 Envoi en cours...' : '📧 Envoyer'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FormSubmissionDemo;