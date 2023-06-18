import React, { useContext } from "react";
import { HuddleIframe } from "@huddle01/iframe";
import { GeneralContext } from "~~/providers/GeneralContext";

type Props = {};

const Interview = (props: Props) => {
  const { sendInterviewMail, roomId, setRoomId, email, setEmail } = useContext(GeneralContext);

  const sendMail = async () => {
    sendInterviewMail(roomId, email);
  };
  //this component will be used to display the interview section. Connecting candidate and interviewer
  return (
    <div className="flex justify-around h-[100vh] gap-4">
      <div className="">
        <div className="card  rounded-lg shadow-lg p-[2%] w-[30vw]">
          <div className="flex flex-col justify-start items-center gap-4 ">
            <div className="text-md md:text-xl">Send someone Room Id for an interview</div>
            <div className="flex flex-col items-center gap-4ho">
              <input
                type="text"
                placeholder="Email"
                className="input input-bordered w-[20vw]"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="room link"
                className="input input-bordered w-[20vw]"
                value={roomId}
                onChange={e => setRoomId(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={sendMail}>
              Send Email
            </button>
          </div>
        </div>
      </div>
      <div className="h-[100vh]">
        <HuddleIframe roomUrl="https://iframe.huddle01.com/" className="w-full h-full aspect-video" />
      </div>
    </div>
  );
};

export default Interview;
