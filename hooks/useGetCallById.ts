import { useState, useEffect } from 'react';
import { Call } from '@stream-io/video-react-sdk';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
export const useGetCallById = (callId) => {
    const [call, setCall] = useState<Call>();
    const [loading, setLoading] = useState(true);
    const client = useStreamVideoClient(); 
    
    useEffect(() => {
        if (!callId) {
            setLoading(false);
            return;
        }
        const fetchCall = async () => {
        const result = await client?.queryCalls({
          filter_conditions:{
            id: callId,
          }
        })
    if(result && result.calls.length > 0) {
        setCall(result.calls[0]);}
        setLoading(false);

    }
            if (callId) {
        fetchCall();
        }
}, [callId, client]);
    
    return { call, loading };

}