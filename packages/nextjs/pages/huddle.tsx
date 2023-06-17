import React, { useEffect, useRef, useState } from "react";
import { useEventListener, useHuddle01 } from "@huddle01/react";
import { useDisplayName } from "@huddle01/react/app-utils";
import { Audio, Video } from "@huddle01/react/components";

/* Uncomment to see the Xstate Inspector */
// import { Inspect } from '@huddle01/react/components';
import {
  useAudio,
  useLobby,
  useMeetingMachine,
  usePeers,
  useRecording,
  useRoom,
  useVideo,
} from "@huddle01/react/hooks";
import axios from "axios";

const App = () => {
  // refs
  const videoRef = useRef<HTMLVideoElement>(null);

  const { state, send } = useMeetingMachine();

  const [roomId, setRoomId] = useState("");
  const [displayNameText, setDisplayNameText] = useState("Guest");
  const [projectId, setProjectId] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const { initialize } = useHuddle01();
  const { joinLobby } = useLobby();
  const { fetchAudioStream, produceAudio, stopAudioStream, stopProducingAudio, stream: micStream } = useAudio();
  const { fetchVideoStream, produceVideo, stopVideoStream, stopProducingVideo, stream: camStream } = useVideo();
  const { joinRoom, leaveRoom } = useRoom();

  // Event Listner
  useEventListener("lobby:cam-on", () => {
    if (camStream && videoRef.current) videoRef.current.srcObject = camStream;
  });

  const { peers } = usePeers();

  const { startRecording, stopRecording, error, data: recordingData } = useRecording();

  const { setDisplayName, error: displayNameError } = useDisplayName();

  useEventListener("room:joined", () => {
    console.log("room:joined");
  });
  useEventListener("lobby:joined", () => {
    console.log("lobby:joined");
  });

  useEffect(() => {
    const createRoom = async () => {
      try {
        const response = await axios.get("/api/create-room");
        console.log(response.data);
        // Handle the response data
      } catch (error) {
        console.error(error);
        // Handle the error
      }
    };

    createRoom();
  }, []);

  return (
    <div className="grid grid-cols-2">
      <div>
        <h1 className="text-6xl font-bold">
          Welcome to{" "}
          <a className="text-blue-600" href="https://huddle01.com">
            Huddle01 SDK!
          </a>
        </h1>

        <h2 className="text-2xl">Room State</h2>
        <h3 className="break-words">{JSON.stringify(state.value)}</h3>

        <h2 className="text-2xl">Me Id</h2>
        <div className="break-words">{JSON.stringify(state.context.peerId)}</div>
        <h2 className="text-2xl">DisplayName</h2>
        <div className="break-words">{JSON.stringify(state.context.displayName)}</div>
        <h2 className="text-2xl">Recording Data</h2>
        <div className="break-words">{JSON.stringify(recordingData)}</div>

        <h2 className="text-2xl">Error</h2>
        <div className="break-words text-red-500">{JSON.stringify(state.context.error)}</div>
        <h2 className="text-2xl">Peers</h2>
        <div className="break-words">{JSON.stringify(peers)}</div>
        <h2 className="text-2xl">Consumers</h2>
        <div className="break-words">{JSON.stringify(state.context.consumers)}</div>

        <h2 className="text-3xl text-blue-500 font-extrabold">Idle</h2>
        <input
          type="text"
          placeholder="Your Project Id"
          value={projectId}
          onChange={e => setProjectId(e.target.value)}
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mr-2"
        />
        <button
          disabled={!initialize.isCallable}
          onClick={() => {
            initialize(projectId);
          }}
        >
          INIT
        </button>

        <br />
        <br />
        <h2 className="text-3xl text-red-500 font-extrabold">Initialized</h2>
        <input
          type="text"
          placeholder="Your Room Id"
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mr-2"
        />
        <input
          type="text"
          placeholder="Your Access Token (optional)"
          value={accessToken}
          onChange={e => setAccessToken(e.target.value)}
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rpnounded-lg text-sm focus:outline-none mr-2"
        />
        <button
          disabled={!joinLobby.isCallable}
          onClick={() => {
            if (accessToken) joinLobby(roomId, accessToken);
            else joinLobby(roomId);
          }}
        >
          JOIN_LOBBY
        </button>
        <br />
        <br />
        <h2 className="text-3xl text-yellow-500 font-extrabold">Lobby</h2>
        <div className="flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Your Room Id"
            value={displayNameText}
            onChange={e => setDisplayNameText(e.target.value)}
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mr-2"
          />
          <button
            disabled={!setDisplayName.isCallable}
            onClick={() => {
              setDisplayName(displayNameText);
            }}
          >
            {`SET_DISPLAY_NAME error: ${displayNameError}`}
          </button>
          <button disabled={!fetchVideoStream.isCallable} onClick={fetchVideoStream}>
            FETCH_VIDEO_STREAM
          </button>

          <button disabled={!fetchAudioStream.isCallable} onClick={fetchAudioStream}>
            FETCH_AUDIO_STREAM
          </button>

          <button disabled={!joinRoom.isCallable} onClick={joinRoom}>
            JOIN_ROOM
          </button>

          <button disabled={!state.matches("Initialized.JoinedLobby")} onClick={() => send("LEAVE_LOBBY")}>
            LEAVE_LOBBY
          </button>

          <button disabled={!stopVideoStream.isCallable} onClick={stopVideoStream}>
            STOP_VIDEO_STREAM
          </button>
          <button disabled={!stopAudioStream.isCallable} onClick={stopAudioStream}>
            STOP_AUDIO_STREAM
          </button>
        </div>
        <br />
        <h2 className="text-3xl text-green-600 font-extrabold">Room</h2>
        <div className="flex gap-4 flex-wrap">
          <button disabled={!produceAudio.isCallable} onClick={() => produceAudio(micStream)}>
            PRODUCE_MIC
          </button>

          <button disabled={!produceVideo.isCallable} onClick={() => produceVideo(camStream)}>
            PRODUCE_CAM
          </button>

          <button disabled={!stopProducingAudio.isCallable} onClick={() => stopProducingAudio()}>
            STOP_PRODUCING_MIC
          </button>

          <button disabled={!stopProducingVideo.isCallable} onClick={() => stopProducingVideo()}>
            STOP_PRODUCING_CAM
          </button>

          <button
            disabled={!startRecording.isCallable}
            onClick={() => startRecording(`${window.location.href}rec/${roomId}`)}
          >
            {`START_RECORDING error: ${error}`}
          </button>
          <button disabled={!stopRecording.isCallable} onClick={stopRecording}>
            STOP_RECORDING
          </button>

          <button disabled={!leaveRoom.isCallable} onClick={leaveRoom}>
            LEAVE_ROOM
          </button>
        </div>

        {/* Uncomment to see the Xstate Inspector */}
        {/* <Inspect /> */}
      </div>
      <div>
        Me Video:
        <video ref={videoRef} autoPlay muted></video>
        <div className="grid grid-cols-4">
          {Object.values(peers)
            .filter(peer => peer.cam)
            .map(peer => (
              <>
                role: {peer.role}
                <Video key={peer.peerId} peerId={peer.peerId} track={peer.cam} debug />
              </>
            ))}
          {Object.values(peers)
            .filter(peer => peer.mic)
            .map(peer => (
              <Audio key={peer.peerId} peerId={peer.peerId} track={peer.mic} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
