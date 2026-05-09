import { useState, useEffect } from 'react';
import axios from 'axios';

function AssetList() {
  const [assets, setAssets] = useState([]);

useEffect(() => {
  axios.get('/api/assets')
      .then(response => {
      setAssets(response.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, []);

  return (
    <div>
      {assets.map(item => <p key={item.id}>{item.name}</p>)}
    </div>
  );
}

export default AssetList;