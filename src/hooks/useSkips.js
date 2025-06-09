import { useState, useEffect } from 'react';
import { API_URL } from '../config'; // 

const useSkips = () => {
    const [skipOptions, setSkipOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchSkips = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                const transformedData = data.map(skip => ({
                    id: skip.id,
                    size: `${skip.size} Yard`,
                    hirePeriod: `${skip.hire_period_days} day hire period`,
                    price: skip.price_before_vat,
                    description: `Ideal for various projects, holds approx. ${skip.size * 10} bin bags.`,
                    imageUrl: `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${skip.size}-yarder-skip.jpg`,
                    roadsidePlacementAllowed: skip.allowed_on_road,
                }));
                setSkipOptions(transformedData);
            } catch (e) {
                setError(e.message);
                console.error("Failed to fetch skip data:", e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSkips();
    }, []);
    return { skipOptions, isLoading, error };
};

export default useSkips;