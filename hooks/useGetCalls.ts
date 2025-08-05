import { useEffect, useState } from "react"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useUser } from "@clerk/nextjs";

export const useGetCalls = () => {
    const[calls,setCalls] = useState<Call[]>([])
    const[load,setLoad] = useState(false);
    const client = useStreamVideoClient();
    const {user} = useUser();

    useEffect(()=> {
        const showCalls = async() => {
        if(!client || !user?.id ) return 
        setLoad(true);
        try{
const {calls} = await client.queryCalls({
  filter_conditions: {
    starts_at: { $exists:true },
    $or : [
        { created_by_user_id: user.id },
        { members: { $in: [user.id] } },
    ]
  },
  sort: [{ field: "starts_at", direction: -1 }],

})
setCalls(calls);
        }catch(error){
console.log(error)
        }finally{
            setLoad(false);
        }
        }
        showCalls();
    },[client,user?.id])
    const now = new Date();
    const endedCall = "hii"
    //state holds the dynamic of the current info of the call
    const upcomingCall = calls.filter(({state:{startsAt}}:Call) => {
   return startsAt && new Date(startsAt) > now}
)
    const recordedCall = "hello"
    return {
        endedCall,upcomingCall,recordedCall,load
    }
}