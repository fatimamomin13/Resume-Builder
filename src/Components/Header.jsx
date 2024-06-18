import React from "react";
import resumeImg from "../assets/resume.svg";

const Header = () => {
  return (
    <>
      <div className="header flex flex-col justify-center items-center mt-10">
        <div className="text-center font-semibold">
          <h1 className="text-6xl m-8 lg:m-10 font-bold"> Resume Builder</h1>
          <div className="header-img m-8 lg:m-10 flex items-center justify-center">
            <img className="h-72" src={resumeImg} alt="resume graphic" />
          </div>
          <h2 className="text-4xl m-8 lg:m-10">
            Make a Resume that stand out <br></br>
            It's Free!
          </h2>
        </div>
      </div>
    </>
  );
};

export default Header;
