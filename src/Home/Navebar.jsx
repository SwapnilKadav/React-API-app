import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { PostsMain } from "../components/posts";
import LogIn from "./LogIn";
import useToken from "../components/posts/useToken";
import Table from "./Table"

export function Navebar() {
  const { token, setToken } = useToken();

  if (!token) {
    return <LogIn setToken={setToken} />;
  }
  return (
    <Router>
      <div></div>
      <div>
        <nav class="navbar sticky-top navbar-light bg-light">
          <ul>
            <li>
              <Link class="btn btn" type="button" to="/">
                Home
              </Link>
              <Link class="btn btn" type="button" to="/Table">
                Table
              </Link>
            </li>
          </ul>
        </nav>

        <hr />
        <Switch>
          <Route path="/" exact element={<PostsMain />}>
            <PostsMain />
          </Route>
          <Route path="/login" element={<LogIn />}>
            <LogIn />
          </Route>
          <Route path="/Table" element={<Table/>}>
            <Table />
          </Route>
          {/* <Route path="/GET" component={GET}>
            <GET />
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

// function GET() {
//   return (
//     <div>
//       <h2 >GET</h2>
//     </div>
//   );
// }
