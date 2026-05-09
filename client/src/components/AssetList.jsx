import { useState, useEffect } from 'react';
import axios from 'axios';
import AssignModal from './AssignModal';
import AddAssetForm from './AddAssetForm';

function AssetList() {
  const [assets, setAssets] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const fetchAssets = () => {
    axios.get('/api/assets')
      .then(response => {
        setAssets(response.data);
      })
      .catch(error => {
        console.error('Error fetching assets:', error);
      });
  };

  const fetchAssignments = () => {
    axios.get('/api/assignments')
      .then(response => {
        setAssignments(response.data);
      })
      .catch(error => {
        console.error('Error fetching assignments:', error);
      });
  };

  useEffect(() => {
    fetchAssets();
    fetchAssignments();
  }, []);

  const handleReturn = async (assignmentId) => {
    try {
      await axios.patch(`/api/assignments/${assignmentId}/return`);
      fetchAssets();
      fetchAssignments();
    } catch (error) {
      console.error('Error returning asset:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Assets</h2>
      <AddAssetForm onAssetAdded={fetchAssets}/>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assets.map(asset => {
              const assignment = assignments.find(a => a.asset_name === asset.name);
              return (
                <tr key={asset.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{asset.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{asset.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{asset.serial_number}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${asset.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {asset.status === 'available' && (
                      <button
                        onClick={() => setSelectedAsset(asset)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Assign
                      </button>
                    )}
                    {asset.status === 'deployed' && assignment && (
                      <button
                        onClick={() => handleReturn(assignment.id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Return
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {selectedAsset && (
        <AssignModal
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
          onAssigned={() => {
            fetchAssets();
            fetchAssignments();
          }}
        />
      )}
    </div>
  );
}

export default AssetList;