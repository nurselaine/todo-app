import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Auth from '../../Components/Auth/Auth';
import Login from '../../Components/Login/Login';
import Signup from '../../Components/Signup/Signup';
import AuthProvider, { AuthContext, util } from './Auth';
// if exported as default, it does not need {} but since Context is just exported it must be destructered

describe('Auth Context', () => {
  test('Provides methods and state for user validation', () => {

    let expectedUser = {};
    let expectedError = null;
    let expectIsLoggedIn = false;

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
    
    const username = testUsers.user.username;
    const password = testUsers.user.password;

    // const validateTokenSpy = jest.spyOn(util, 'validateToken');
    

    render (

      <AuthProvider>
        <AuthContext>
          {
            ({ user, setUser, error, setError, isLoggedIn, setIsLoggedIn, login }) => {
              expectedUser = user;
              expectedError = error;
              expectIsLoggedIn = isLoggedIn;
              return (
                <>
                  <h1>Auth Provider Initial State</h1>
                  <h3 data-testid='auth-user'>user: {JSON.stringify(user)}</h3>
                  <h3 data-testid='auth-error'>error: {error}</h3>
                  <h3 data-testid='auth-isLoggedIn'>is logged in to be {isLoggedIn.toString()}</h3>
                  <button data-testid='user-btn' onClick={() => setUser({username: 'user', password: 'password'})}>login</button>
                  <button data-testid='error-btn' onClick={() => setError('there is an error')}>error</button>
                  <button data-testid='login-btn' onClick={() => setIsLoggedIn(true)}>is logged in</button>
                </>
              )
            }
          }
        </AuthContext>
      </AuthProvider>
    );

    const user = screen.getByTestId('auth-user');
    const error = screen.getByTestId('auth-error');
    const loggedIn = screen.getByTestId('auth-isLoggedIn');
    const setUser = screen.getByTestId('user-btn');
    const setError = screen.getByTestId('error-btn');
    const setLogin = screen.getByTestId('login-btn');

    expect(user).toHaveTextContent('user:', expectedUser);
    expect(error).toHaveTextContent(`error:`);
    expect(loggedIn).toHaveTextContent('is logged in to be ', expectIsLoggedIn.toString());
    
    // fireEvent.click(button, {target: {value : {username: 'user', password: 'USER'}}});
    fireEvent.click(setUser);
    fireEvent.click(setError);
    fireEvent.click(setLogin);
          // console.log(user.textContent);
          // console.log(error.textContent);
          // console.log(loggedIn.textContent);

    expect(user).toHaveTextContent('user:', expectedUser);
    expect(error).toHaveTextContent(`error: there is an error`);
    expect(loggedIn).toHaveTextContent('is logged in to be ', expectIsLoggedIn.toString());
    // expect(validateTokenSpy).toHaveBeenCalled();
    
  });

  test('Handles login and validates user login', () => {
    render (

      <AuthProvider>
        <AuthContext>
          {
            ({ user, error, isLoggedIn }) => {
              return (
                <>
                  <Login />
                  <h1>Auth Provider logged in State</h1>
                  <h3 data-testid='auth-user'>user: {JSON.stringify(user.capabilities)}</h3>
                  <h3 data-testid='auth-error'>error: {error}</h3>
                  <h3 data-testid='auth-isLoggedIn'>is logged in to be {isLoggedIn.toString()}</h3>
                </>
              )
            }
          }
        </AuthContext>
      </AuthProvider>
    );

    const user = screen.getByTestId('auth-user');
    const error = screen.getByTestId('auth-error');
    const loggedIn = screen.getByTestId('auth-isLoggedIn');

    let usernameInput = screen.getByPlaceholderText('Username');
    let passwordInput = screen.getByPlaceholderText('Password');
    let button = screen.getByText('Login');

    fireEvent.change(usernameInput, {target: { value: 'admin' }});
    fireEvent.change(passwordInput, {target: { value: 'ADMIN' }});
    fireEvent.click(button);

          console.log(user.textContent);
          console.log(error.textContent);
          console.log(loggedIn.textContent);

    expect(user).toHaveTextContent('user: ["create","update","read","delete"]');
    expect(error).toHaveTextContent(`error:`);
    expect(loggedIn).toHaveTextContent('is logged in to be ', true);

    const logoutButton = screen.getByText('Log Out');
    fireEvent.click(logoutButton);
  });

  test('Renders content with Auth component based on capabilitiess', () => {
    render (

      <AuthProvider>
        <AuthContext.Consumer>
          {
            ({ user, error, isLoggedIn }) => {
              return (
                <>
                  <Login />
                  <Auth capability="read">

                    <p data-testid='test-read'>I am authorized to read</p>
                  </Auth>
                  <Auth capability="delete">

                    <p data-testid='test-delete'>I am authorized to delete</p>
                  </Auth>
                  <h1>Auth Provider logged in State</h1>
                  <h3 data-testid='auth-user'>user: {JSON.stringify(user.capabilities)}</h3>
                  <h3 data-testid='auth-error'>error: {error}</h3>
                  <h3 data-testid='auth-isLoggedIn'>is logged in to be {isLoggedIn.toString()}</h3>
                </>
              )
            }
          }
        </AuthContext.Consumer>
      </AuthProvider>
    );

    let usernameInput = screen.getByPlaceholderText('Username');
    let passwordInput = screen.getByPlaceholderText('Password');
    let button = screen.getByText('Login');

    fireEvent.change(usernameInput, {target: { value: 'user' }});
    fireEvent.change(passwordInput, {target: { value: 'USER' }});
    fireEvent.click(button);

    let authorized = screen.queryByTestId('test-read');
    let notAuthorized = screen.queryByTestId('test-delete');
          
        console.log(authorized); 

    expect(authorized).toHaveTextContent('I am authorized to read');
    expect(notAuthorized).not.toBeInTheDocument();
  });

  test('Handles Sign up and login with user token', () => {
    render (

      <AuthProvider>
        <AuthContext>
          {
            ({ user, error, isLoggedIn }) => {
              return (
                <>
                  <Signup />
                  <h1>Auth Provider Sign Up Validation</h1>
                  <h3 data-testid='auth-user'>user: {JSON.stringify(user.capabilities)}</h3>
                  <h3 data-testid='auth-error'>error: {error}</h3>
                  <h3 data-testid='auth-isLoggedIn'>is logged in to be {isLoggedIn.toString()}</h3>
                </>
              )
            }
          }
        </AuthContext>
      </AuthProvider>
    );

    const user = screen.getByTestId('auth-user');
    const error = screen.getByTestId('auth-error');
    const loggedIn = screen.getByTestId('auth-isLoggedIn');

    let usernameInput = screen.getByPlaceholderText('Username');
    let passwordInput = screen.getByPlaceholderText('Password');
    let fullnameInput = screen.getByPlaceholderText('Fullname');
    let emailInput = screen.getByPlaceholderText('Email');
    let button = screen.getByText('Sign Up!');

    fireEvent.change(usernameInput, {target: { value: 'fdnjagnek' }});
    fireEvent.change(passwordInput, {target: { value: 'fnwjagw' }});
    fireEvent.change(fullnameInput, {target: { value: 'fjaegbsf'}});
    fireEvent.change(emailInput, {target: { value: 'fjaegbsf'}});
    fireEvent.click(button);

          console.log(user.textContent);
          console.log(error.textContent);
          console.log(loggedIn.textContent);

    expect(user).toHaveTextContent('user: ["create","update","read","delete"]');
    expect(error).toHaveTextContent(`error:`);
    expect(loggedIn).toHaveTextContent('is logged in to be ', true);

    const logoutButton = screen.getByText('Log Out');
    fireEvent.click(logoutButton);
  });
})