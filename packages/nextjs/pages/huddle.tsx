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
    // <div className="grid grid-cols-2">
    //   <div>
    //     <h1 className="text-6xl font-bold">
    //       Welcome to{" "}
    //       <a className="text-blue-600" href="https://huddle01.com">
    //         Huddle01 SDK!
    //       </a>
    //     </h1>

    //     <h2 className="text-2xl">Room State</h2>
    //     <h3 className="break-words">{JSON.stringify(state.value)}</h3>

    //     <h2 className="text-2xl">Me Id</h2>
    //     <div className="break-words">{JSON.stringify(state.context.peerId)}</div>
    //     <h2 className="text-2xl">DisplayName</h2>
    //     <div className="break-words">{JSON.stringify(state.context.displayName)}</div>
    //     <h2 className="text-2xl">Recording Data</h2>
    //     <div className="break-words">{JSON.stringify(recordingData)}</div>

    //     <h2 className="text-2xl">Error</h2>
    //     <div className="break-words text-red-500">{JSON.stringify(state.context.error)}</div>
    //     <h2 className="text-2xl">Peers</h2>
    //     <div className="break-words">{JSON.stringify(peers)}</div>
    //     <h2 className="text-2xl">Consumers</h2>
    //     <div className="break-words">{JSON.stringify(state.context.consumers)}</div>

    //     <h2 className="text-3xl text-blue-500 font-extrabold">Idle</h2>
    //     <input
    //       type="text"
    //       placeholder="Your Project Id"
    //       value={projectId}
    //       onChange={e => setProjectId(e.target.value)}
    //       className="border-2 bg-secondary bg-primary h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mr-2"
    //     />
    //     <button
    //       disabled={!initialize.isCallable}
    //       onClick={() => {
    //         initialize(projectId);
    //       }}
    //     >
    //       INIT
    //     </button>

    //     <br />
    //     <br />
    //     <h2 className="text-3xl text-red-500 font-extrabold">Initialized</h2>
    //     <input
    //       type="text"
    //       placeholder="Your Room Id"
    //       value={roomId}
    //       onChange={e => setRoomId(e.target.value)}
    //       className="border-2 bg-secondary bg-primary h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mr-2"
    //     />
    //     <input
    //       type="text"
    //       placeholder="Your Access Token (optional)"
    //       value={accessToken}
    //       onChange={e => setAccessToken(e.target.value)}
    //       className="border-2 bg-secondary bg-primary h-10 px-5 pr-16 rpnounded-lg text-sm focus:outline-none mr-2"
    //     />
    //     <button
    //       disabled={!joinLobby.isCallable}
    //       onClick={() => {
    //         if (accessToken) joinLobby(roomId, accessToken);
    //         else joinLobby(roomId);
    //       }}
    //     >
    //       JOIN_LOBBY
    //     </button>
    //     <br />
    //     <br />
    //     <h2 className="text-3xl text-yellow-500 font-extrabold">Lobby</h2>
    //     <div className="flex gap-4 flex-wrap">
    //       <input
    //         type="text"
    //         placeholder="Your Room Id"
    //         value={displayNameText}
    //         onChange={e => setDisplayNameText(e.target.value)}
    //         className="border-2 bg-secondary bg-primary h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mr-2"
    //       />
    //       <button
    //         disabled={!setDisplayName.isCallable}
    //         onClick={() => {
    //           setDisplayName(displayNameText);
    //         }}
    //       >
    //         {`SET_DISPLAY_NAME error: ${displayNameError}`}
    //       </button>
    //       <button disabled={!fetchVideoStream.isCallable} onClick={fetchVideoStream}>
    //         FETCH_VIDEO_STREAM
    //       </button>

    //       <button disabled={!fetchAudioStream.isCallable} onClick={fetchAudioStream}>
    //         FETCH_AUDIO_STREAM
    //       </button>

    //       <button disabled={!joinRoom.isCallable} onClick={joinRoom}>
    //         JOIN_ROOM
    //       </button>
    //       <button disabled={!state.matches("Initialized.JoinedLobby")} onClick={() => send("LEAVE_LOBBY")}>
    //         LEAVE_LOBBY
    //       </button>
    //       <button disabled={!stopVideoStream.isCallable} onClick={stopVideoStream}>
    //         STOP_VIDEO_STREAM
    //       </button>
    //       <button disabled={!stopAudioStream.isCallable} onClick={stopAudioStream}>
    //         STOP_AUDIO_STREAM
    //       </button>
    //     </div>
    //     <br />
    //     <h2 className="text-3xl text-green-600 font-extrabold">Room</h2>
    //     <div className="flex gap-4 flex-wrap">
    //       <button disabled={!produceAudio.isCallable} onClick={() => produceAudio(micStream)}>
    //         PRODUCE_MIC
    //       </button>

    //       <button disabled={!produceVideo.isCallable} onClick={() => produceVideo(camStream)}>
    //         PRODUCE_CAM
    //       </button>

    //       <button disabled={!stopProducingAudio.isCallable} onClick={() => stopProducingAudio()}>
    //         STOP_PRODUCING_MIC
    //       </button>

    //       <button disabled={!stopProducingVideo.isCallable} onClick={() => stopProducingVideo()}>
    //         STOP_PRODUCING_CAM
    //       </button>

    //       <button
    //         disabled={!startRecording.isCallable}
    //         onClick={() => startRecording(`${window.location.href}rec/${roomId}`)}
    //       >
    //         {`START_RECORDING error: ${error}`}
    //       </button>
    //       <button disabled={!stopRecording.isCallable} onClick={stopRecording}>
    //         STOP_RECORDING
    //       </button>

    //       <button disabled={!leaveRoom.isCallable} onClick={leaveRoom}>
    //         LEAVE_ROOM
    //       </button>
    //     </div>

    //     {/* Uncomment to see the Xstate Inspector */}
    //     {/* <Inspect /> */}
    //   </div>
    //   <div>
    //     Me Video:
    //     <video ref={videoRef} autoPlay muted></video>
    //     <div className="grid grid-cols-4">
    //       {Object.values(peers)
    //         .filter(peer => peer.cam)
    //         .map(peer => (
    //           <>
    //             role: {peer.role}
    //             <Video key={peer.peerId} peerId={peer.peerId} track={peer.cam} debug />
    //           </>
    //         ))}
    //       {Object.values(peers)
    //         .filter(peer => peer.mic)
    //         .map(peer => (
    //           <Audio key={peer.peerId} peerId={peer.peerId} track={peer.mic} />
    //         ))}
    //     </div>
    //   </div>
    // </div>

    <div className="grid grid-cols-2">
      <div>
        <div className="bg-primary rounded-lg p-4 shadow-md">
          <h1 className="text-3xl font-bold">Room Details</h1>
          <h2 className="text-lg mb-2">Room State</h2>
          <p className="break-words text-sm">{JSON.stringify(state.value)}</p>

          <div className="flex mt-4">
            <div className="w-1/2">
              <h2 className="text-lg mb-2">Me Id</h2>
              <p className="break-words text-sm">{JSON.stringify(state.context.peerId)}</p>

              <h2 className="text-lg mt-4 mb-2">Display Name</h2>
              <p className="break-words text-sm">{JSON.stringify(state.context.displayName)}</p>
            </div>

            <div className="w-1/2">
              <h2 className="text-lg mb-2">Recording Data</h2>
              <p className="break-words text-sm">{JSON.stringify(recordingData)}</p>

              <h2 className="text-lg mt-4 mb-2">Error</h2>
              <p className="break-words text-sm text-red-500">{JSON.stringify(state.context.error)}</p>
            </div>
          </div>

          <div className="flex mt-4">
            <div className="w-1/2">
              <h2 className="text-lg mb-2">Peers</h2>
              <p className="break-words text-sm">{JSON.stringify(peers)}</p>
            </div>

            <div className="w-1/2">
              <h2 className="text-lg mb-2">Consumers</h2>
              <p className="break-words text-sm">{JSON.stringify(state.context.consumers)}</p>
            </div>
          </div>
        </div>

        <div className="bg-primary rounded-lg p-4 shadow-md">
          <h1 className="text-3xl font-bold">Room Controls</h1>
          <div className="mb-6">
            <h2 className="text-3xl text-blue-500 font-extrabold">Idle</h2>
            <div className="flex items-center mt-2">
              <input
                type="text"
                placeholder="Your Project Id"
                value={projectId}
                onChange={e => setProjectId(e.target.value)}
                className="border-2 bg-secondary bg-primary h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mr-2"
              />
              <button
                disabled={!initialize.isCallable}
                onClick={() => {
                  initialize(projectId);
                }}
                className="btn btn-primary"
              >
                INIT
              </button>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-3xl text-red-500 font-extrabold">Initialized</h2>
            <div className="flex items-center mt-2">
              <input
                type="text"
                placeholder="Your Room Id"
                value={roomId}
                onChange={e => setRoomId(e.target.value)}
                className="border-2 bg-secondary bg-primary h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mr-2"
              />
              <input
                type="text"
                placeholder="Your Access Token (optional)"
                value={accessToken}
                onChange={e => setAccessToken(e.target.value)}
                className="border-2 bg-secondary bg-primary h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mr-2"
              />
              <button
                disabled={!joinLobby.isCallable}
                onClick={() => {
                  if (accessToken) joinLobby(roomId, accessToken);
                  else joinLobby(roomId);
                }}
                className="btn btn-primary"
              >
                JOIN_LOBBY
              </button>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-3xl text-yellow-500 font-extrabold">Lobby</h2>
            <div className="flex flex-wrap items-center mt-2 gap-4">
              <input
                type="text"
                placeholder="Your Room Id"
                value={displayNameText}
                onChange={e => setDisplayNameText(e.target.value)}
                className="border-2 bg-secondary bg-primary h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mr-2"
              />
              <button
                disabled={!setDisplayName.isCallable}
                onClick={() => {
                  setDisplayName(displayNameText);
                }}
                className="btn btn-primary"
              >
                {`SET_DISPLAY_NAME error: ${displayNameError}`}
              </button>
              <button disabled={!fetchVideoStream.isCallable} onClick={fetchVideoStream} className="btn btn-primary">
                FETCH_VIDEO_STREAM
              </button>
              <button disabled={!fetchAudioStream.isCallable} onClick={fetchAudioStream} className="btn btn-primary">
                FETCH_AUDIO_STREAM
              </button>
              <button disabled={!joinRoom.isCallable} onClick={joinRoom} className="btn btn-primary">
                JOIN_ROOM
              </button>
              <button
                disabled={!state.matches("Initialized.JoinedLobby")}
                onClick={() => send("LEAVE_LOBBY")}
                className="btn btn-primary"
              >
                LEAVE_LOBBY
              </button>
              <button disabled={!stopVideoStream.isCallable} onClick={stopVideoStream} className="btn btn-primary">
                STOP_VIDEO_STREAM
              </button>
              <button disabled={!stopAudioStream.isCallable} onClick={stopAudioStream} className="btn btn-primary">
                STOP_AUDIO_STREAM
              </button>
            </div>
          </div>
          <div>
            <h2 className="text-3xl text-green-600 font-extrabold">Room</h2>
            <div className="flex flex-wrap items-center mt-2 gap-4">
              <button
                disabled={!produceAudio.isCallable}
                onClick={() => produceAudio(micStream)}
                className="btn btn-primary"
              >
                PRODUCE_MIC
              </button>
              <button
                disabled={!produceVideo.isCallable}
                onClick={() => produceVideo(camStream)}
                className="btn btn-primary"
              >
                PRODUCE_CAM
              </button>
              <button
                disabled={!stopProducingAudio.isCallable}
                onClick={() => stopProducingAudio()}
                className="btn btn-primary"
              >
                STOP_PRODUCING_MIC
              </button>
              <button
                disabled={!stopProducingVideo.isCallable}
                onClick={() => stopProducingVideo()}
                className="btn btn-primary"
              >
                STOP_PRODUCING_CAM
              </button>
              <button
                disabled={!startRecording.isCallable}
                onClick={() => startRecording(`${window.location.href}rec/${roomId}`)}
                className="btn btn-primary"
              >
                {`START_RECORDING error: ${error}`}
              </button>
              <button disabled={!stopRecording.isCallable} onClick={stopRecording} className="btn btn-primary">
                STOP_RECORDING
              </button>
              <button disabled={!leaveRoom.isCallable} onClick={leaveRoom} className="btn btn-primary">
                LEAVE_ROOM
              </button>
            </div>
          </div>
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
