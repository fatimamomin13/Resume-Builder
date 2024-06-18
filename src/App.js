import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";
import Header from "./Components/Header";
import Body from "./Components/Body";

function App() {
  const [showComponent, setShowComponent] = useState(false);
  const componentRef = useRef(null);

  const fadeIn = useSpring({
    opacity: showComponent ? 1 : 0,
    transform: showComponent ? "translateY(0)" : "translateY(-20px)",
  });

  useEffect(() => {
    if (showComponent) {
      componentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showComponent]);

  const handleButtonClick = () => {
    setShowComponent(!showComponent);
  };

  return (
    <div className="App">
      <Header />
      <div class="flex items-center justify-center">
        <button
          className="bg-main-color text-white h-16 w-48 flex self-center text-center py-2 px-4 m-8 lg:m-2 rounded-full hover:bg-main-hover"
          onClick={handleButtonClick}
        >
          <span className="inline-block w-full text-center py-2 text-xl">
            Get Started
          </span>
        </button>
      </div>

      {showComponent && (
        <animated.div ref={componentRef} style={fadeIn}>
          <Body />
        </animated.div>
      )}
    </div>
  );
}

export default App;
