import { useEffect, useState } from 'react';

const useSubscribersAnalytics = () => {
  const [subscribersData, setSubscribersData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscribersAnalytics = async () => {
      try {
        const response = await fetch('http://localhost:5000/subscribers');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données d\'analyse');
        }
        const data = await response.json();
        setSubscribersData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribersAnalytics();
  }, []);

  return { subscribersData, loading };
};

export default useSubscribersAnalytics;  