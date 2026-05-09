import { useState } from 'react';
import axios from 'axios';

function AddAssetForm({ onAssetAdded }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [serial_number, setSerialNumber] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post('/api/assets', {
        name: name,
        category: category,
        serial_number: serial_number
      });
      onAssetAdded();
      setName('');
      setCategory('');
      setSerialNumber('');
    } catch (error) {
      console.error('Error adding asset:', error);
    }
  };

return (
  <div className="flex gap-3 mb-4">
    <input
      className="border border-gray-300 rounded px-3 py-2 text-sm flex-1"
      placeholder="Asset name"
      value={name}
      onChange={e => setName(e.target.value)}
    />
    <input
      className="border border-gray-300 rounded px-3 py-2 text-sm flex-1"
      placeholder="Category"
      value={category}
      onChange={e => setCategory(e.target.value)}
    />
    <input
      className="border border-gray-300 rounded px-3 py-2 text-sm flex-1"
      placeholder="Serial number"
      value={serial_number}
      onChange={e => setSerialNumber(e.target.value)}
    />
    <button
      onClick={handleSubmit}
      className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
    >
      Add Asset
    </button>
  </div>
);
}

export default AddAssetForm;