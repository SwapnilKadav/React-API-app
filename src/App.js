import React, { useState } from "react";
import { PostsMain } from "./components/posts";
import { Navebar } from "./Home/Navebar";
import { LogIn} from "./Home/LogIn"
import "./App.css";


export const App = () => {
  return (
    <>
      <div >
        <h1 align = 'center'>Product Table</h1>
      </div>
      <Navebar/>
    </>
  );
};

export default App;
