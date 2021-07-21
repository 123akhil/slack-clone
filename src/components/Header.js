import React from 'react'
import styled from "styled-components";
import { Avatar } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const Header = () => {
    const[user] = useAuthState(auth);
    return (
    <HeaderContainer>
        {/* Header Left */}
        <HeaderLeft>
          <HeaderAvatar onClick={() => auth.signOut()}alt={user?.displayName} src ={user?.photoURL} />
          <AccessTimeIcon />
        </HeaderLeft>
            <Heading>
                <h1>CAS-DM</h1>
            </Heading>
        {/* Header Right */}
         <HeaderRight>
             <HelpOutlineIcon />
         </HeaderRight>
    </HeaderContainer>
    );
}

export default Header

const HeaderContainer = styled.div`
    display: flex;
    position: fixed;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    background-color: var(--slack-color);
    color: white;
`;

const HeaderLeft = styled.div`
    align-items: center;
    display: flex;
    flex: 0.3;
    margin-left: 20px;

    > .MuiSvgIcon-root {
        margin-left: 150px;
        /* margin-right: 30px; */
    } 
    
`;
const Heading = styled.div`
   >h1 {
    align-items: center;
    font-family: Georgia, 'Times New Roman', Times, serif;
    letter-spacing: 2px;
   } 
`;


const HeaderRight = styled.div`
     flex: 0.3;
     display: flex;
     align-items: flex-end;

     > .MuiSvgIcon-root {
        margin-left: auto; 
        margin-right: 20px;
    } 
`;

const HeaderAvatar = styled(Avatar)`
    cursor: pointer;

    :hover {
        opacity: 0.8;
    }
`;



