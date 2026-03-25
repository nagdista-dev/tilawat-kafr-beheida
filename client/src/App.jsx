import React from "react";
import { images } from "./assets/assets";

const App = () => {
  return (
    <div className="max-h-screen">
      <img
        src={images.logo}
        alt="logo"
        className="w-full h-screen object-cover"
      />
    </div>
  );
};

export default App;
