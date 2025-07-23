"use client";

import {
  CallControls,
  CallParticipantsList,
  useCallStateHooks,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCall,
  CallingState,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { Users, LayoutList } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSearchParams } from "next/navigation";
import EndCall from "./ui/EndCall";
import Loader from "./ui/Loader";

type CallLayoutType = "grid" | "speaker";

const MeetingCall = () => {
  const searchParams = useSearchParams();
  const isPersonal = !!searchParams.get('personal')
  const call = useCall();
  const [layout, setLayout] = useState<CallLayoutType>("grid");
  const [showParticipant, setShowParticipant] = useState(false);
const {useCallCallingState} = useCallStateHooks();
const callingState = useCallCallingState();
if(callingState != CallingState.JOINED) return <Loader/>

  const renderLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker":
        return <SpeakerLayout />;
      default:
        return null;
    }
  };

  return (
    <section className="w-full h-screen relative">
      <div className="flex justify-center gap-4 p-4 bg-black text-white">
        <button onClick={() => setLayout("grid")}>Grid View</button>
        <button onClick={() => setLayout("speaker")}>Speaker View</button>
      </div>

      <div className="h-[calc(100vh-160px)]">{renderLayout()}</div>

      {showParticipant && (
        <div className="absolute right-0 top-0 h-full w-80 bg-[#1e1e1e]">
          <CallParticipantsList onClose={() => setShowParticipant(false)} />
        </div>
      )}

      <div className="fixed bottom-0 left-0 w-full flex items-center justify-center gap-5 p-4 bg-black">
        <CallControls />

        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <LayoutList size={20} className="text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {["Grid", "Speaker"].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
                >
                  {item}
                </DropdownMenuItem>
                {index < 1 && (
                  <DropdownMenuSeparator className="border-dark-1" />
                )}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <CallStatsButton />

        <button
          onClick={() => setShowParticipant((prev) => !prev)}
          className="cursor-pointer rounded-2xl bg-[#19232d] p-2 hover:bg-[#4c535b]"
        >
          <Users size={20} className="text-white" />
        </button>
        {!isPersonal && <EndCall/>}
      </div>
    </section>
  );
};

export default MeetingCall;


