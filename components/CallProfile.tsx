
// 'use client';
// import { Call, CallRecording } from '@stream-io/video-react-sdk';
// import { useGetCalls } from '@/hooks/useGetCalls';
// import { useRouter } from 'next/navigation';
// import React, { useState, useEffect } from 'react';
// import MeetingCard from './Meeting/MeetingCard';
// import { toast } from "sonner";

// const CallProfile = ({ type }: { type: 'end' | 'upcoming' | 'recording' }) => {
//   const { endedCall, upcomingCall, recordedCall } = useGetCalls();
//   const router = useRouter();
//   const [recordings, setRecordings] = useState<CallRecording[]>([]);
//     const [loadingRecordings, setLoadingRecordings] = useState(false);

//   const getType = () => {
//     switch (type) {
//       case 'end':
//         return endedCall || [];
//       case 'upcoming':
//         return upcomingCall || [];
//       case 'recording':
//         return recordings || []; // ✅ use recordings fetched here
//       default:
//         return [];
//     }
//   };

//   const getNoCallMsg = () => {
//     switch (type) {
//       case 'end':
//         return "Looks like you haven't had any meetings yet. Time to make some history!";
//       case 'upcoming':
//         return "No upcoming meetings. Why not schedule one and get things rolling?";
//       case 'recording':
//         return "No recordings here... yet. Start a meeting and you'll see them show up!";
//       default:
//         return '';
//     }
//   };

// useEffect(() => {
//   if (type !== 'recording') return;
//   if (!recordedCall || recordedCall.length === 0) return;

//   const fetchRecordings = async () => {
//     setLoadingRecordings(true);
//     try {
//       const data = await Promise.all(
//         recordedCall.map((meet) => meet.queryRecordings())
//       );

//       const record = data
//         .filter((call) => call.recordings.length > 0)
//         .flatMap((call) => call.recordings);

//       setRecordings(record);}catch{
// toast.error('Try again later :')
//       }
//      finally {
//       setLoadingRecordings(false);
//     }
//   };

//   fetchRecordings();
// }, [type, recordedCall]);

//   const calls = getType();
//   const noCallMsg = getNoCallMsg();

//   return (
//     <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
//       {calls && calls.length > 0 ? (
//         calls.map((meet: Call | CallRecording) => (
//           <MeetingCard
//             key={(meet as Call).id || (meet as CallRecording).url}
//             icon={
//              type === 'end'
//         ? '/sidebar/previous.svg'
//         : type === 'upcoming'
//         ? '/sidebar/upcoming.svg'
//         : '/sidebar/recording.svg'
//             }
//             description={
//               (meet as Call).state?.custom?.description ||
//               (meet as CallRecording).filename?.substring(0, 20) ||
//               'No description'
//             }
//             date={
//               (meet as Call).state?.startsAt?.toLocaleString() ||
//               (meet as CallRecording).start_time?.toLocaleString() ||
//               'No date'
//             }
//             buttonText={type === 'recording' ? 'Play' : 'Start'}
//             link={
//               type === 'recording'
//                 ? (meet as CallRecording).url
//                 : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meet as Call).id}`
//             }
//             handleClick={
//               type === 'recording'
//                 ? () => router.push((meet as CallRecording).url)
//                 : () => router.push(`/meeting/${(meet as Call).id}`)
//             }
//             isPrevious={type === 'end'}
//             isRecording = {type==='recording'}
//           />
//         ))
//       ) : (
//         <p className="text-lg text-gray-300">{noCallMsg}</p>
//       )}
//     </div>
//   );
// };

// export default CallProfile;

'use client';
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useGetCalls } from '@/hooks/useGetCalls';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import MeetingCard from './Meeting/MeetingCard';
import Loader from './ui/Loader';

const ITEMS_PER_PAGE = 6;

const CallProfile = ({ type }: { type: 'end' | 'upcoming' | 'recording' }) => {
  const { endedCall, upcomingCall, recordedCall,load } = useGetCalls();
  const router = useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getType = () => {
    switch (type) {
      case 'end':
        return endedCall || [];
      case 'upcoming':
        return upcomingCall || [];
      case 'recording':
        return recordings || [];
      default:
        return [];
    }
  };

  const getNoCallMsg = () => {
    switch (type) {
      case 'end':
        return "Looks like you haven't had any meetings yet. Time to make some history!";
      case 'upcoming':
        return "No upcoming meetings. Why not schedule one and get things rolling?";
      case 'recording':
        return "No recordings here... yet. Start a meeting and you'll see them show up!";
      default:
        return '';
    }
  };

  useEffect(() => {
    if (type !== 'recording') return;
    if (!recordedCall || recordedCall.length === 0) return;

    const fetchRecordings = async () => {
      const data = await Promise.all(recordedCall.map((meet) => meet.queryRecordings()));
      const record = data
        .filter((call) => call.recordings.length > 0)
        .flatMap((call) => call.recordings);
      setRecordings(record);
    };

    fetchRecordings();
  }, [type, recordedCall]);
  if(load){
    return (
      
        <Loader />
   
    );
  }

  const calls = getType();
  const noCallMsg = getNoCallMsg();

  // ✅ Pagination logic
  const totalPages = Math.ceil(calls.length / ITEMS_PER_PAGE);
  const paginatedCalls = calls.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {paginatedCalls && paginatedCalls.length > 0 ? (
          paginatedCalls.map((meet: Call | CallRecording) => (
            <MeetingCard
              key={(meet as Call).id || (meet as CallRecording).url}
              meet={meet}
              icon={
                type === 'end'
                  ? '/sidebar/previous.svg'
                  : type === 'upcoming'
                  ? '/sidebar/upcoming.svg'
                  : '/sidebar/recording.svg'
              }
              description={
                (meet as Call).state?.custom?.description ||
                (meet as CallRecording).filename?.substring(0, 20) ||
                'No description'
              }
              date={
                (meet as Call).state?.startsAt?.toLocaleString() ||
                (meet as CallRecording).start_time?.toLocaleString() ||
                'No date'
              }
              buttonText={type === 'recording' ? 'Play' : 'Start'}
              link={
                type === 'recording'
                  ? (meet as CallRecording).url
                  : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meet as Call).id}`
              }
              handleClick={
                type === 'recording'
                  ? () => router.push((meet as CallRecording).url)
                  : () => router.push(`/meeting/${(meet as Call).id}`)
              }
              isPrevious={type === 'end'}
            />
          ))
        ) : (
          <p className="text-lg text-gray-300">{noCallMsg}</p>
        )}
      </div>

      {/* ✅ Pagination controls for ALL types */}
      {calls.length > ITEMS_PER_PAGE && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CallProfile;
