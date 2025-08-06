// "use client";

// import {
//   CallControls,
//   CallParticipantsList,
//   useCallStateHooks,
//   CallStatsButton,
//   PaginatedGridLayout,
//   SpeakerLayout,
//   // useCall,
//   CallingState,
// } from "@stream-io/video-react-sdk";
// import React, { useState } from "react";
// import "@stream-io/video-react-sdk/dist/css/styles.css";
// import { Users, LayoutList } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useRouter, useSearchParams } from "next/navigation";
// import EndCall from "@/components/ui/EndCall";
// import Loader from "@/components/ui/Loader";


// type CallLayoutType = "grid" | "speaker";

// const MeetingCall = () => {
//   const searchParams = useSearchParams();
//   const isPersonal = !!searchParams.get('personal')
//   // const call = useCall();
//   const [layout, setLayout] = useState<CallLayoutType>("grid");
//   const [showParticipant, setShowParticipant] = useState(false);
// const {useCallCallingState} = useCallStateHooks();
// const callingState = useCallCallingState();
// const router = useRouter();
// if(callingState != CallingState.JOINED) return <Loader/>

//   const renderLayout = () => {
//     switch (layout) {
//       case "grid":
//         return <PaginatedGridLayout />;
//       case "speaker":
//         return <SpeakerLayout />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <section className="w-full h-screen relative">
//       <div className="flex justify-center gap-4 p-4 bg-black text-white">
//         <button onClick={() => setLayout("grid")}>Grid View</button>
//         <button onClick={() => setLayout("speaker")}>Speaker View</button>
//       </div>

//       <div className="h-[calc(100vh-160px)]">{renderLayout()}</div>

//       {showParticipant && (
//         <div className="absolute right-0 top-0 h-full w-80 bg-[#1e1e1e]">
//           <CallParticipantsList onClose={() => setShowParticipant(false)} />
//         </div>
//       )}

//       <div className="fixed bottom-0 left-0 w-full flex items-center justify-center gap-5 p-4 bg-black">
//         <CallControls onLeave={()=>router.push('/')}/>

//         <DropdownMenu>
//           <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
//             <LayoutList size={20} className="text-white" />
//           </DropdownMenuTrigger>
//           <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
//             {["Grid", "Speaker"].map((item, index) => (
//               <div key={index}>
//                 <DropdownMenuItem
//                   onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
//                 >
//                   {item}
//                 </DropdownMenuItem>
//                 {index < 1 && (
//                   <DropdownMenuSeparator className="border-dark-1" />
//                 )}
//               </div>
//             ))}
//           </DropdownMenuContent>
//         </DropdownMenu>

//         <CallStatsButton />

//         <button
//           onClick={() => setShowParticipant((prev) => !prev)}
//           className="cursor-pointer rounded-2xl bg-[#19232d] p-2 hover:bg-[#4c535b]"
//         >
//           <Users size={20} className="text-white" />
//         </button>
//         {!isPersonal && <EndCall/>}
//       </div>
//     </section>
//   );
// };

// export default MeetingCall;
"use client";

import {
  CallControls,
  CallParticipantsList,
  useCallStateHooks,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  CallingState,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { Users, LayoutList, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, useSearchParams } from "next/navigation";
import EndCall from "@/components/ui/EndCall";
import Loader from "@/components/ui/Loader";

// Add a new layout type
type CallLayoutType = "grid" | "speaker" | "spotlight";

const MeetingCall = () => {
  const searchParams = useSearchParams();
  const isPersonal = !!searchParams.get('personal');
  // Initialize with the new layout type
  const [layout, setLayout] = useState<CallLayoutType>("spotlight");
  const [showParticipant, setShowParticipant] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const router = useRouter();

  if (callingState !== CallingState.JOINED) {
    return (
        <Loader />
    );
  }

  const renderLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker":
        return <SpeakerLayout />;
      // New case for the spotlight layout
      case "spotlight":
        return <SpeakerLayout participantsBarPosition="bottom" />;
      default:
        return null;
    }
  };

  return (
    <section className="min-h-screen w-full relative flex flex-col items-center justify-center
                        bg-gradient-to-br from-[#1A1C20] via-[#121417] to-[#1A1C20] text-gray-100 p-4 sm:p-6">

      <div className="flex-grow w-full max-w-7xl h-[calc(100vh-120px)] sm:h-[calc(100vh-140px)] rounded-xl overflow-hidden shadow-2xl border border-gray-700">
        {renderLayout()}
      </div>

      {showParticipant && (
        <div className="fixed right-0 top-0 h-full w-full sm:w-80 bg-gray-900 bg-opacity-90 backdrop-blur-sm z-50 p-4 transform transition-transform duration-300 ease-in-out">
            <button
                onClick={() => setShowParticipant(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
                <X size={24} />
            </button>
            <div className="h-full pt-10">
                <CallParticipantsList onClose={() => setShowParticipant(false)} />
            </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 w-full flex items-center justify-center gap-4 p-4 z-50
                      bg-gray-900 bg-opacity-70 backdrop-blur-md rounded-t-xl shadow-lg
                      flex-wrap">
        
        <CallControls onLeave={() => router.push('/')} />

        <div className="flex items-center gap-2 sm:gap-4">
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="cursor-pointer rounded-full bg-gray-800 p-3 hover:bg-gray-700 transition-colors
                                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500">
                <LayoutList size={20} className="text-white" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-gray-700 bg-gray-800 text-white rounded-xl shadow-lg">
              {["Grid", "Speaker", "Spotlight"].map((item, index) => (
                <div key={index}>
                  <DropdownMenuItem
                    onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
                    className="cursor-pointer hover:bg-gray-700 transition"
                  >
                    {item}
                  </DropdownMenuItem>
                  {index < 2 && (
                    <DropdownMenuSeparator className="border-gray-700" />
                  )}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <CallStatsButton />

          <button
            onClick={() => setShowParticipant((prev) => !prev)}
            className="cursor-pointer rounded-full bg-gray-800 p-3 hover:bg-gray-700 transition-colors
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
          >
            <Users size={20} className="text-white" />
          </button>
          
          {!isPersonal && <EndCall />}
        </div>
      </div>
    </section>
  );
};

export default MeetingCall;