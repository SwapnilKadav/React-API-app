import React from "react";
import { PostsMain } from "./components/posts";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

export const App = () => {
  return (
    <>
      <div >
        <h1 align = 'center'>Product Table</h1>
      </div>
      <PostsMain />
    </>
  );
};

export default App;
