
// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   useCall,
//   useCallStateHooks,
//   useDeviceList,
//   VideoPreview,
// } from "@stream-io/video-react-sdk";
// import {
//   Camera,
//   Mic,
//   VideoOff,
//   MicOff,
//   Play,
// } from "lucide-react";
// const MeetingSetUp = ({ setIsSet }: { setIsSet: (value: boolean) => void }) => {
//   const call = useCall();
//   const { useCameraState, useMicrophoneState } = useCallStateHooks();

//   const {
//     camera,
//     isMute: isCamMuted,
//     selectedDevice: selectedCamDevice,
//     devices: camDevices,
//   } = useCameraState();

//   const {
//     microphone,
//     isMute: isMicMuted,
//     selectedDevice: selectedMicDevice,
//     devices: micDevices,
//   } = useMicrophoneState();

//   const { deviceList: videoDevices } = useDeviceList(camDevices, selectedCamDevice);
//   const { deviceList: audioDevices } = useDeviceList(micDevices, selectedMicDevice);

//   const [selectedCam, setSelectedCam] = useState<string>("");
//   const [selectedMic, setSelectedMic] = useState<string>("");

//   // Load default device selections
//   useEffect(() => {
//     if (videoDevices.length > 0) setSelectedCam(videoDevices[0].deviceId);
//     if (audioDevices.length > 0) setSelectedMic(audioDevices[0].deviceId);
//   }, [videoDevices, audioDevices]);

//   const handleCamChange = async (deviceId: string) => {
//     setSelectedCam(deviceId);
//     await camera.select(deviceId);
//   };

//   const handleMicChange = async (deviceId: string) => {
//     setSelectedMic(deviceId);
//     await microphone.select(deviceId);
//   };

//   const toggleCamera = async () => {
//     if (isCamMuted) {
//       await camera.enable();
//     } else {
//       await camera.disable();
//     }
//   };

//   const toggleMic = async () => {
//     if (isMicMuted) {
//       await microphone.enable();
//     } else {
//       await microphone.disable();
//     }
//   };

//   const handleJoin = async () => {
//     // Ensure the camera/mic states are respected
//     if (!isCamMuted) await camera.enable();
//     else await camera.disable();

//     if (!isMicMuted) await microphone.enable();
//     else await microphone.disable();

//     await call.join(); // Now safely join
//     setIsSet(true);
//   };

//   return (
//     <div className="flex h-screen w-full flex-col items-center justify-center gap-5 text-white px-4">
//       <h1 className="text-2xl font-bold">Setup</h1>

//       <VideoPreview className="rounded-xl border w-full max-w-md aspect-video" />

//       <div className="flex flex-col gap-4 w-full max-w-md">
//         <div className="flex gap-4">
//           <button
//             onClick={toggleCamera}
//             className="bg-blue-500 px-4 py-2 rounded"
//           >
//             {isCamMuted ? "Turn Camera On" : "Turn Camera Off"}
//           </button>
//           <button
//             onClick={toggleMic}
//             className="bg-green-500 px-4 py-2 rounded"
//           >
//             {isMicMuted ? "Unmute Mic" : "Mute Mic"}
//           </button>
//         </div>

//         {!isCamMuted && (
//           <label className="flex flex-col text-white">
//             Camera:
//             <select
//               value={selectedCam}
//               onChange={(e) => handleCamChange(e.target.value)}
//               className="text-black p-2 rounded mt-1"
//             >
//               {videoDevices.map((device) => (
//                 <option key={device.deviceId} value={device.deviceId}>
//                   {device.label || `Camera (${device.deviceId})`}
//                 </option>
//               ))}
//             </select>
//           </label>
//         )}

//         {!isMicMuted && (
//           <label className="flex flex-col text-white">
//             Microphone:
//             <select
//               value={selectedMic}
//               onChange={(e) => handleMicChange(e.target.value)}
//               className="text-black p-2 rounded mt-1"
//             >
//               {audioDevices.map((device) => (
//                 <option key={device.deviceId} value={device.deviceId}>
//                   {device.label || `Mic (${device.deviceId})`}
//                 </option>
//               ))}
//             </select>
//           </label>
//         )}
//       </div>

//       <button
//         onClick={handleJoin}
//         className="mt-6 bg-blue-600 px-6 py-2 rounded hover:bg-blue-500 transition-colors"
//       >
//         Join Meeting
//       </button>
//     </div>
//   );
// };

// export default MeetingSetUp;


"use client";

import React, { useEffect, useState } from "react";
import {
  useCall,
  useCallStateHooks,
  useDeviceList,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import {
  Camera,
  Mic,
  VideoOff,
  MicOff,
  Play,
} from "lucide-react"; 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; 
import { Button } from '@/components/ui/button'
import { Label } from "@/components/ui/label"; 
import { Switch } from "@/components/ui/switch";
import Loader from "@/components/ui/Loader"; 

const MeetingSetUp = ({ setIsSet }: { setIsSet: (value: boolean) => void }) => {
  const call = useCall();
  const { useCameraState, useMicrophoneState } = useCallStateHooks();

  const {
    camera,
    isMute: isCamMuted,
    selectedDevice: selectedCamDevice,
    devices: camDevices,
  } = useCameraState();

  const {
    microphone,
    isMute: isMicMuted,
    selectedDevice: selectedMicDevice,
    devices: micDevices,
  } = useMicrophoneState();

  const { deviceList: videoDevices } = useDeviceList(camDevices, selectedCamDevice);
  const { deviceList: audioDevices } = useDeviceList(micDevices, selectedMicDevice);

  const [selectedCam, setSelectedCam] = useState<string>("");
  const [selectedMic, setSelectedMic] = useState<string>("");

  useEffect(() => {
    if (videoDevices.length > 0) setSelectedCam(videoDevices.at(0)?.deviceId || "");
    if (audioDevices.length > 0) setSelectedMic(audioDevices.at(0)?.deviceId || "");
  }, [videoDevices, audioDevices]);

  const handleCamChange = async (deviceId: string) => {
    setSelectedCam(deviceId);
    await camera.select(deviceId);
  };

  const handleMicChange = async (deviceId: string) => {
    setSelectedMic(deviceId);
    await microphone.select(deviceId);
  };

  const toggleCamera = async () => {
    if (isCamMuted) {
      await camera.enable();
    } else {
      await camera.disable();
    }
  };

  const toggleMic = async () => {
    if (isMicMuted) {
      await microphone.enable();
    } else {
      await microphone.disable();
    }
  };
     if (!call || (videoDevices.length === 0 && audioDevices.length === 0)) {
    return (
        <Loader />
    );
  }

  const handleJoin = async () => {
    if (!isCamMuted) await camera.enable();
    else await camera.disable();

    if (!isMicMuted) await microphone.enable();
    else await microphone.disable();

    await call.join();
    setIsSet(true);
  };


  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 space-y-8
                    bg-gradient-to-br from-[#1A1C20] via-[#121417] to-[#1A1C20] text-gray-100"> {/* Subtle dark gradient background */}
      

      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-6">
        Meeting Setup
      </h1>


      <div className="relative w-full max-w-2xl aspect-video bg-gray-800 rounded-xl overflow-hidden shadow-2xl
                      border border-gray-700"> {/* Subtle border */}
        <VideoPreview className="absolute inset-0 w-full h-full object-cover" />
        {isCamMuted && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <VideoOff className="h-24 w-24 text-gray-400" />
          </div>
        )}
      </div>


      <div className="flex flex-col gap-6 w-full max-w-2xl mt-4">
        <div className="flex items-center justify-center gap-8 py-4 px-6 bg-gray-800 rounded-lg shadow-md">
          <div className="flex items-center gap-3">
            {isCamMuted ? <VideoOff className="h-6 w-6 text-gray-400" /> : <Camera className="h-6 w-6 text-blue-400" />}
            <Label htmlFor="camera-toggle" className="text-lg font-medium text-gray-300">Camera</Label>
            <Switch
              id="camera-toggle"
              checked={!isCamMuted}
              onCheckedChange={toggleCamera}
              className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-600"
            />
          </div>
          <div className="flex items-center gap-3">
            {isMicMuted ? <MicOff className="h-6 w-6 text-gray-400" /> : <Mic className="h-6 w-6 text-blue-400" />}
            <Label htmlFor="mic-toggle" className="text-lg font-medium text-gray-300">Microphone</Label>
            <Switch
              id="mic-toggle"
              checked={!isMicMuted}
              onCheckedChange={toggleMic}
              className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-600"
            />
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {!isCamMuted && (
            <div className="space-y-2">
              <Label htmlFor="camera-select" className="text-gray-300 text-base font-medium">
                Select Camera:
              </Label>
              <Select value={selectedCam} onValueChange={handleCamChange}>
                <SelectTrigger
                  id="camera-select"
                  className="w-full bg-gray-800 text-white border-gray-700 rounded-md
                             focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#121417]" // Updated focus ring offset
                >
                  <SelectValue placeholder="Choose Camera" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white border-gray-700">
                  {videoDevices.map((device) => (
                    <SelectItem key={device.deviceId} value={device.deviceId} className="focus:bg-gray-700">
                      {device.label || `Camera (${device.deviceId})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {!isMicMuted && (
            <div className="space-y-2">
              <Label htmlFor="microphone-select" className="text-gray-300 text-base font-medium">
                Select Microphone:
              </Label>
              <Select value={selectedMic} onValueChange={handleMicChange}>
                <SelectTrigger
                  id="microphone-select"
                  className="w-full bg-gray-800 text-white border-gray-700 rounded-md
                             focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#121417]" // Updated focus ring offset
                >
                  <SelectValue placeholder="Choose Microphone" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white border-gray-700">
                  {audioDevices.map((device) => (
                    <SelectItem key={device.deviceId} value={device.deviceId} className="focus:bg-gray-700">
                      {device.label || `Microphone (${device.deviceId})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>

      <Button
        onClick={handleJoin}
        className="mt-8 w-full max-w-sm bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-4 rounded-full shadow-lg
                   transition-all duration-200 ease-in-out flex items-center justify-center space-x-3 
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#121417] focus:ring-green-400" 
      >
        <Play className="h-7 w-7" />
        <span>Join Meeting</span>
      </Button>
    </div>
  );
};

export default MeetingSetUp;