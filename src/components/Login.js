import { Button } from '@material-ui/core';
import React from 'react'
import styled from 'styled-components';
import { auth, provider } from '../firebase';

const Login = () => {
 const signIn = e => {
     e.preventDefault();
     auth.signInWithPopup(provider).catch((error) =>
     alert(error.message));
};
    return (
        <LoginContainer>
           <LoginInnerContainer>
               <img src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg" alt="" />
               <h1>Sign in to the CASDM BASE</h1>

               <Button onClick={signIn}>
                   Sign in with Google
               </Button>
           </LoginInnerContainer>
        </LoginContainer>
    )
}

export default Login

const LoginContainer = styled.div`
    display: grid;
    background-color: #f8f8f8;
    height: 100vh;
    place-items: center;
`;

const LoginInnerContainer =styled.div`

    border-radius: 10px;
    background-color: white;
    padding: 100px;
    text-align: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12) , 0 1px 2px rgba(0, 0, 0, 0.24);

  >img {
      object-fit: contain;
      height: 100px;
      margin-bottom: 40px;
  }

  >button {
      margin-top: 50px;
      text-transform: inherit;
      background-color: #0a8d48;
      color: white;
  }
`;

