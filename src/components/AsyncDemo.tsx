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

          {/* Code Examples */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              💻 Exemples d'utilisation
            </h2>

            <div className="space-y-6">
              {/* Basic Usage */}
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">Utilisation basique :</h3>
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
{`import { useAsync } from './hooks';

const fetchData = async () => {
  const response = await fetch('https://api.example.com/data');
  return response.json();
};

const { data, status, error, execute, reset } = useAsync(fetchData);

// status: 'idle' | 'pending' | 'success' | 'error'
// execute: fonction pour déclencher l'opération
// reset: fonction pour réinitialiser l'état`}
                </pre>
              </div>

              {/* Boolean Helpers */}
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">Helpers booléens :</h3>
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
{`const { isIdle, isPending, isSuccess, isError } = useAsync(asyncFn);

return (
  <div>
    {isIdle && <p>Prêt à charger</p>}
    {isPending && <Spinner />}
    {isSuccess && <SuccessMessage />}
    {isError && <ErrorMessage />}
  </div>
);`}
                </pre>
              </div>

              {/* Form Submission */}
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">Soumission de formulaire :</h3>
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
{`const submitForm = async (formData: FormData) => {
  const response = await fetch('/api/submit', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
  return response.json();
};

const { execute, isPending, isSuccess } = useAsync(submitForm);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  await execute(formData);
};

return (
  <form onSubmit={handleSubmit}>
    {/* Form fields */}
    <button disabled={isPending}>
      {isPending ? 'Envoi...' : 'Envoyer'}
    </button>
    {isSuccess && <p>Formulaire envoyé !</p>}
  </form>
);`}
                </pre>
              </div>

              {/* File Upload */}
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">Upload de fichier :</h3>
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
{`const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });
  return response.json();
};

const { data, execute, isPending } = useAsync(uploadFile);

const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
  if (e.target.files?.[0]) {
    await execute(e.target.files[0]);
  }
};

return (
  <div>
    <input type="file" onChange={handleUpload} />
    {isPending && <ProgressBar />}
    {data && <p>Fichier uploadé: {data.filename}</p>}
  </div>
);`}
                </pre>
              </div>

              {/* API Call with Parameters */}
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">Appel API avec paramètres :</h3>
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
{`const fetchUser = async (userId: number) => {
  const response = await fetch(\`/api/users/\${userId}\`);
  return response.json();
};

const { data, execute, isPending } = useAsync(fetchUser);

const [userId, setUserId] = useState(1);

useEffect(() => {
  execute(userId);
}, [userId]); // Re-fetch quand userId change

return (
  <div>
    <select onChange={(e) => setUserId(Number(e.target.value))}>
      <option value="1">User 1</option>
      <option value="2">User 2</option>
    </select>
    {isPending ? <Spinner /> : <UserProfile user={data} />}
  </div>
);`}
                </pre>
              </div>

              {/* Multi-Step Process */}
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">Processus multi-étapes :</h3>
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
{`const [step, setStep] = useState(1);
const { execute, isPending, isSuccess } = useAsync(processStep);

const handleNext = async () => {
  const result = await execute(step);
  if (result) {
    setStep(step + 1);
  }
};

return (
  <div>
    <StepIndicator currentStep={step} />
    <button onClick={handleNext} disabled={isPending}>
      {isPending ? 'Traitement...' : 'Suivant'}
    </button>
  </div>
);`}
                </pre>
              </div>

              {/* Error Recovery */}
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">Récupération d'erreur :</h3>
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
{`const { data, error, execute, reset, isError } = useAsync(fetchData);

const handleRetry = () => {
  reset(); // Réinitialise l'état
  execute(); // Réessaie l'opération
};

return (
  <div>
    {isError && (
      <div className="error">
        <p>Erreur: {error}</p>
        <button onClick={handleRetry}>Réessayer</button>
      </div>
    )}
  </div>
);`}
                </pre>
              </div>

              {/* Immediate Execution */}
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">Exécution immédiate :</h3>
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
{`// Execute automatiquement au montage du composant
const { data, isPending } = useAsync(fetchData, true);

// Équivalent à :
const { data, isPending, execute } = useAsync(fetchData);
useEffect(() => {
  execute();
}, []);`}
                </pre>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">🎯 Cas d'usage courants</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <span>📝</span> Formulaires
                </h3>
                <ul className="text-white/90 text-sm space-y-1">
                  <li>• Soumission de formulaire</li>
                  <li>• Validation asynchrone</li>
                  <li>• Enregistrement de données</li>
                  <li>• Création de ressources</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <span>📤</span> Uploads
                </h3>
                <ul className="text-white/90 text-sm space-y-1">
                  <li>• Upload de fichiers</li>
                  <li>• Upload d'images</li>
                  <li>• Import de données</li>
                  <li>• Batch processing</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <span>🌐</span> API
                </h3>
                <ul className="text-white/90 text-sm space-y-1">
                  <li>• Appels API</li>
                  <li>• CRUD operations</li>
                  <li>• Authentification</li>
                  <li>• Fetch de données</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <span>⚙️</span> Traitement
                </h3>
                <ul className="text-white/90 text-sm space-y-1">
                  <li>• Traitement de données</li>
                  <li>• Processus multi-étapes</li>
                  <li>• Calculs asynchrones</li>
                  <li>• Import/Export</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsyncDemo;