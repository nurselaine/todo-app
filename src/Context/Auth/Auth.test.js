import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
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
            ({ user, error, isLoggedIn, login }) => {
              expectedUser = user;
              expectedError = error;
              expectIsLoggedIn = isLoggedIn;
              return (
                <>
                  <h1>Auth Provider Initial State</h1>
                  <h3 data-testid='auth-user'>user: {JSON.stringify(user)}</h3>
                  <h3 data-testid='auth-error'>error: {error}</h3>
                  <h3 data-testid='auth-isLoggedIn'>is logged in to be {isLoggedIn}</h3>
                  <button data-testid='login-btn' onClick={() => login(username, password)}>login</button>
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
    const button = screen.getByTestId('login-btn');

    expect(user).toHaveTextContent('user:', expectedUser);
    expect(error).toHaveTextContent(`error:`);
    expect(loggedIn).toHaveTextContent('is logged in to be ', expectIsLoggedIn.toString());
    
    fireEvent.click(button, {target: {value : {username: 'user', password: 'USER'}}});
    expect(user).toHaveTextContent('user:', expectedUser);
    // expect(validateTokenSpy).toHaveBeenCalled();
    
  });
})