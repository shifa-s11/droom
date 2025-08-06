import { useState, useEffect } from 'react';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';

export const useGetCallById = (callId: string | null|undefined) => {
    const [call, setCall] = useState<Call>();
    const [loading, setLoading] = useState(true);
    const client = useStreamVideoClient(); 
    
    useEffect(() => {
        if (!client || !callId) {
            setLoading(false);
            return;
        }

        const fetchCall = async () => {
            try {
                const result = await client.queryCalls({
                    filter_conditions: {
                        id: callId, 
                    }
                });

                if (result && result.calls.length > 0) {
                    setCall(result.calls[0]);
                } else {
                    setCall(undefined);
                }
            } catch (error) {
                console.error("Failed to fetch call:", error);
                setCall(undefined);
            } finally {
                setLoading(false);
            }
        };

        fetchCall();
        
    }, [callId, client]);
    
    return { call, loading };
}