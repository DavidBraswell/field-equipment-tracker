import { useState, useEffect } from 'react';
import axios from 'axios';

function AssignModal({ asset, onClose, onAssigned }) {
  const [jobSites, setJobSites] = useState([]);
  const [selectedSite, setSelectedSite] = useState('');

  useEffect(() => {
    axios.get('/api/job_sites')
      .then(response => {
        setJobSites(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.post('/api/assignments', {
        asset_id: asset.id,
        job_site_id: selectedSite
      });
      onAssigned();
      onClose();
    } catch (error) {
      console.error('Error creating assignment:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">Assign Asset</h2>
        <p className="text-sm text-gray-500 mb-4">{asset.name}</p>
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Job Site</label>
        <select
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedSite}
          onChange={e => setSelectedSite(e.target.value)}
        >
          <option value="">-- Select a site --</option>
          {jobSites.map(site => (
            <option key={site.id} value={site.id}>{site.name}</option>
          ))}
        </select>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedSite}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            Confirm Assignment
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssignModal;