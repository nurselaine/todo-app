import React, { useEffect, useState } from "react";
import cookie from 'react-cookies';
import jwt_decode from 'jwt-decode';
export let util = {validateToken: null};

export const AuthContext = React.createContext();

const testUsers = {
  admin: {
    username: 'admin',
    password: 'ADMIN',
    email: 'admin@fakeuser.com',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTBlZDFiMzNjZTQ5MDAxODlmMzhiNyIsImNhcGFiaWxpdGllcyI6WyJjcmVhdGUiLCJ1cGRhdGUiLCJyZWFkIiwiZGVsZXRlIl0sInR5cGUiOiJ1c2VyIiwiaWF0IjoxNjU4OTA3OTMxLCJleHAiOjE2NTg5MTE1MzF9.bqe-52if5K50rGn30P4fheuAa2qWuxse9tWiuH4cnUM',
  },
  editor: {
    username: 'editor',
    password: 'EDITOR',
    email: 'editor@fakeuser.com',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTBlZjk5MzNjZTQ5MDAxODlmMzhiYSIsImNhcGFiaWxpdGllcyI6WyJjcmVhdGUiLCJ1cGRhdGUiLCJyZWFkIl0sInR5cGUiOiJ1c2VyIiwiaWF0IjoxNjU4OTA4NTY5LCJleHAiOjE2NTg5MTIxNjl9.073ppQCHbplYN9befn8JElcP4zgFX6TEe_ARUQZc0KU',
  },
  user: {
    username: 'user',
    password: 'USER',
    email: 'user@fakeuser.com',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTBmMGZjMzNjZTQ5MDAxODlmMzhjMCIsImNhcGFiaWxpdGllcyI6WyJyZWFkIl0sInR5cGUiOiJ1c2VyIiwiaWF0IjoxNjU4OTA4OTI0LCJleHAiOjE2NTg5MTI1MjR9.t7c7k2LbaTxsdfYjx_WC3QiP4MycU8sZryVyXQqJQH',
  }
  
};

const AuthProvider = ({children}) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    let token = cookie.load('auth');
    if(token){
      util.validateToken(token);
    }
  }, []);

  const can = (capability) => {
    return user?.capabilities?.includes(capability);
    // capabilities is an array of with capabilities recieved in decoded token
  };

  const login = (username, password) => {
    console.log('login form');
    let authCredentials = testUsers[username];

    if(authCredentials && authCredentials.password === password){
      try {
        util.validateToken(authCredentials.token);
      } catch (e) {
        console.error(e);
        setError(e);
        console.log(error);
      }
    }
  };
  
  util.validateToken = function(token){
    console.log('validate token');
    try{
      let validUser = jwt_decode(token);
      console.log('valid user', validUser);
      if(validUser){
        setUser(validUser);
        setIsLoggedIn(true);
        console.log('I am logged in');
        console.log(user);
      }
    } catch (e) {
      setError(e);
      console.log(error);
    }
  };

  const logout = () => {
    setUser({});
    setIsLoggedIn(false);
    setError(null);
    cookie.remove('auth');
  }

  let values = {
    user,
    isLoggedIn,
    error,
    can, 
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;