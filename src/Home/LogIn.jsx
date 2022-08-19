import React, { useState } from 'react';
import PropTypes from 'prop-types';

async function loginUser(credentials) {
  return fetch('http://localhost:8000/api-token-auth/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }
 

export function LogIn({ setToken }) {

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
      
    });
    setToken(token)
  }

  return (
    <div >
    <form onSubmit={handleSubmit}>
      <div class="form-group">
        <label for="exampleDropdownFormEmail2">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleDropdownFormEmail2"
          placeholder="email@example.com"
          onChange={e => setUserName(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label for="exampleDropdownFormPassword2">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleDropdownFormPassword2"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="dropdownCheck2" />
        <label class="form-check-label" for="dropdownCheck2">
          Remember me
        </label>
      </div>
      <button type="submit" class="btn btn-primary">
        Sign in
      </button>
    </form>
    </div>
  );
}

LogIn.propTypes = {
setToken: PropTypes.func.isRequired
}
export default LogIn;
