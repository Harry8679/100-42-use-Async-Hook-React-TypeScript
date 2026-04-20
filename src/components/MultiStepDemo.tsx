import { useState } from 'react';
import { useAsync } from '../hooks';

interface StepResult {
  step: number;
  title: string;
  completed: boolean;
}

const executeStep = async (step: number): Promise<StepResult> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  const steps = [
    { step: 1, title: 'Validation des données', completed: true },
    { step: 2, title: 'Traitement du paiement', completed: true },
    { step: 3, title: 'Confirmation de commande', completed: true },
  ];
  
  return steps[step - 1];
};

const MultiStepDemo = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const { data, status, error, execute, reset } = useAsync<StepResult>(
    (step: number) => executeStep(step)
  );

  const handleNextStep = async () => {
    const result = await execute(currentStep);
    if (result?.completed) {
      setCompletedSteps([...completedSteps, currentStep]);
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setCompletedSteps([]);
    reset();
  };

  const allStepsCompleted = completedSteps.length === 3;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Processus Multi-Étapes
      </h3>

      <div className="space-y-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex-1 flex items-center">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                    completedSteps.includes(step)
                      ? 'bg-green-500 text-white'
                      : step === currentStep && status === 'pending'
                      ? 'bg-blue-500 text-white animate-pulse'
                      : step === currentStep
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {completedSteps.includes(step) ? '✓' : step}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center">
                  Étape {step}
                </div>
              </div>
              {step < 3 && (
                <div
                  className={`h-1 flex-1 mx-2 transition-all ${
                    completedSteps.includes(step)
                      ? 'bg-green-500'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Current Step Content */}
        {!allStepsCompleted && (
          <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">
                {currentStep === 1 && '📋'}
                {currentStep === 2 && '💳'}
                {currentStep === 3 && '✅'}
              </div>
              <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                {currentStep === 1 && 'Validation des données'}
                {currentStep === 2 && 'Traitement du paiement'}
                {currentStep === 3 && 'Confirmation de commande'}
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Étape {currentStep} sur 3
              </p>
            </div>

            {status === 'pending' && (
              <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg mb-4">
                <div className="flex items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                  <span className="text-blue-700 dark:text-blue-400 font-semibold">
                    Traitement en cours...
                  </span>
                </div>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-lg mb-4 border-2 border-red-500">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">❌</span>
                  <p className="text-red-600 dark:text-red-500 font-semibold">{error}</p>
                </div>
              </div>
            )}

            {data && status === 'success' && (
              <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg mb-4 animate-scale-in">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <p className="text-green-700 dark:text-green-400 font-semibold">
                    {data.title} - Terminé !
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={handleNextStep}
              disabled={status === 'pending'}
              className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors"
            >
              {status === 'pending'
                ? '⏳ Traitement...'
                : currentStep === 3
                ? '✅ Terminer'
                : '➡️ Étape suivante'}
            </button>
          </div>
        )}

        {/* Completion */}
        {allStepsCompleted && (
          <div className="p-8 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl border-2 border-green-500 text-center animate-scale-in">
            <div className="text-6xl mb-4">🎉</div>
            <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Processus terminé !
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Toutes les étapes ont été complétées avec succès
            </p>
            <button
              onClick={handleReset}
              className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
            >
              🔄 Recommencer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiStepDemo;