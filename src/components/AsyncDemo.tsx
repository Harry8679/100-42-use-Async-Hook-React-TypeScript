import BasicAsyncDemo from './BasicAsyncDemo';
import FormSubmissionDemo from './FormSubmissionDemo';
import FileUploadDemo from './FileUploadDemo';
import ApiCallDemo from './ApiCallDemo';
import DataProcessingDemo from './DataProcessingDemo';
import MultiStepDemo from './MultiStepDemo';
import StatusFlowDemo from './StatusFlowDemo';

const AsyncDemo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
            🔄 useAsync Hook
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
            Projet 42/100 • Async Operations
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm">
            Hook avancé pour gérer les opérations asynchrones avec statuts et gestion d'erreurs
          </p>
        </div>

        {/* Demos */}
        <div className="space-y-8">
          {/* Row 1 */}
          <div className="grid lg:grid-cols-2 gap-8">
            <BasicAsyncDemo />
            <FormSubmissionDemo />
          </div>

          {/* Row 2 */}
          <div className="grid lg:grid-cols-2 gap-8">
            <FileUploadDemo />
            <ApiCallDemo />
          </div>

          {/* Row 3 */}
          <div className="grid lg:grid-cols-2 gap-8">
            <DataProcessingDemo />
            <MultiStepDemo />
          </div>

          {/* Row 4 */}
          <StatusFlowDemo />

          {/* Features */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              ✨ Fonctionnalités
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">4 Statuts</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    idle, pending, success, error
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Execute Manual</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Exécution à la demande
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Reset Function</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Réinitialisation
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Boolean Helpers</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    isIdle, isPending...
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Error Handling</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Gestion d'erreurs
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Promise Tracking</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Suivi des promesses
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Generic Types</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Types génériques
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Type-Safe</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    100% TypeScript
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Code Examples - Continue dans le prochain message */}
        </div>
      </div>
    </div>
  );
};

export default AsyncDemo;