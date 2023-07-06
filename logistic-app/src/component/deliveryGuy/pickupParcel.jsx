import { useState } from "react";
import axios from 'axios';

const PickupParcels = ({ parcelId, onPickup }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePickup = async () => {
    try {
      setLoading(true);
      setError('');

      await axios.put(`/parcels/${parcelId}/assign`);

      onPickup();
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <button disabled={loading} onClick={handlePickup}>
        {loading ? 'Loading...' : 'Pick up Parcel'}
      </button>
    </div>
  );
};

export default PickupParcels;

