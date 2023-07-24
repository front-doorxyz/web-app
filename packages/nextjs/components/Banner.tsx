import React, { useContext } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GeneralContext } from "~~/providers/GeneralContext";

type Props = {};

const Banner = (props: Props) => {
  const { setSearch } = useContext(GeneralContext);
  return (
    <div className="flex items-center h-[15vh] min-h-[150px]  bg-primary ">
      <div className="flex flex-col  justify-center ml-[2%] w-[80vw] gap-4">
        <div id="info" className="text-3xl font-bold font-bai-jamjuree">
          Find your dream job
        </div>
        <div id="search" className="relative">
          <input
            type="text"
            onChange={e => setSearch(e.target.value)}
            placeholder="Search here"
            className="input input-bordered input-accent pl-10 w-full"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
