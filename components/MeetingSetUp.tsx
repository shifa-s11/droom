
"use client";

import React, { useEffect, useState } from "react";
import {
  useCall,
  useCallStateHooks,
  useDeviceList,
  VideoPreview,
} from "@stream-io/video-react-sdk";

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

  // Load default device selections
  useEffect(() => {
    if (videoDevices.length > 0) setSelectedCam(videoDevices[0].deviceId);
    if (audioDevices.length > 0) setSelectedMic(audioDevices[0].deviceId);
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

  const handleJoin = async () => {
    // Ensure the camera/mic states are respected
    if (!isCamMuted) await camera.enable();
    else await camera.disable();

    if (!isMicMuted) await microphone.enable();
    else await microphone.disable();

    await call.join(); // Now safely join
    setIsSet(true);
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5 text-white px-4">
      <h1 className="text-2xl font-bold">Setup</h1>

      <VideoPreview className="rounded-xl border w-full max-w-md aspect-video" />

      <div className="flex flex-col gap-4 w-full max-w-md">
        <div className="flex gap-4">
          <button
            onClick={toggleCamera}
            className="bg-blue-500 px-4 py-2 rounded"
          >
            {isCamMuted ? "Turn Camera On" : "Turn Camera Off"}
          </button>
          <button
            onClick={toggleMic}
            className="bg-green-500 px-4 py-2 rounded"
          >
            {isMicMuted ? "Unmute Mic" : "Mute Mic"}
          </button>
        </div>

        {!isCamMuted && (
          <label className="flex flex-col text-white">
            Camera:
            <select
              value={selectedCam}
              onChange={(e) => handleCamChange(e.target.value)}
              className="text-black p-2 rounded mt-1"
            >
              {videoDevices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Camera (${device.deviceId})`}
                </option>
              ))}
            </select>
          </label>
        )}

        {!isMicMuted && (
          <label className="flex flex-col text-white">
            Microphone:
            <select
              value={selectedMic}
              onChange={(e) => handleMicChange(e.target.value)}
              className="text-black p-2 rounded mt-1"
            >
              {audioDevices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Mic (${device.deviceId})`}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <button
        onClick={handleJoin}
        className="mt-6 bg-blue-600 px-6 py-2 rounded hover:bg-blue-500 transition-colors"
      >
        Join Meeting
      </button>
    </div>
  );
};

export default MeetingSetUp;


