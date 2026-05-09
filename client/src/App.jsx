import AssetList from './components/AssetList';
import JobSiteList from './components/JobSiteList';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-700 text-white px-8 py-4 shadow">
        <h1 className="text-2xl font-bold tracking-tight">Field Equipment Tracker</h1>
        <p className="text-blue-200 text-sm">Fictional Company LLC — Internal Tool</p>
      </nav>
      <main className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-8">
        <AssetList />
        <JobSiteList />
      </main>
    </div>
  );
}

export default App;