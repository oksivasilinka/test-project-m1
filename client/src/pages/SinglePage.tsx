import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {fetchItem} from "../api/fetch-api";

type ItemType = {
  id: number;
  name: string;
  description: string;
};

function SinglePage() {
  const { id } = useParams();
  const [item, setItem] = useState<ItemType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
        if (id) {
            fetchItem({id})
                .then((res) => setItem(res))
                .catch((err) => setError(err))
                .finally(() => setLoading(false))
        }
      }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }



  return (
    <div className="detail">
        <Link to={'/'}>Go Back</Link>
      <h2>Item Details</h2>
      <p>ID: {item?.id}</p>
      <p>Name: {item?.name}</p>
      <p>Description: {item?.description}</p>
    </div>
  );
}

export default SinglePage;
