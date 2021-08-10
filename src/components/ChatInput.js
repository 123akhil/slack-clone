import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { useState } from 'react';
import { auth, db } from '../firebase';
import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import AttachmentIcon from '@material-ui/icons/Attachment';
// import {Button ,icon} from "semantic-ui-react";
// import ImageUpload from './ImageUpload';
// import Upload from './Upload';
// import ImageGrid from './ImageGrid';
const ChatInput = ({channelName , channelId, chatRef}) => {
    const [input, setInput] = useState('');//picking text from the inputfield
    const [user] = useAuthState(auth);
    // const [fileDialog, setfileDialog] = useState(false);
    const sendMessage = e => {
        e.preventDefault(); //prevent from refresh
        if(!channelId){
            return false;
        }
        db.collection('rooms').doc(channelId).collection('messages').add({
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user.displayName,
            userImage: user.photoURL, //check for attachments
        });

        chatRef?.current?.scrollIntoView({behavior: "smooth"});
        
        setInput("");
    };
    const Imageyo = ()=>{
        console.log('yoooo');
    }
    // const createActionButtons = () => {
    //     return <>
    //        <Button Icon={AttachmentIcon} onClick={() => setfileDialog(true)} />
    //   </>
    // }
    // const uploadImage = (file,contentType) =>{

    // }
    return (
        <ChatInputContainer>
            <form>
                <input value={input} onChange={e => setInput(e.target.value)} placeholder={`Message #${channelName}`} />
                <Button hidden type='submit' onClick={sendMessage}>
                    SEND
                </Button>
                <AttachmentIcon onClick={Imageyo} />
                {/* <Button  onClick={() => setfileDialog(true)}>
                    Image
                </Button> */}
                 
            </form>
            {/* <Upload /> */}
            {/* <ImageGrid /> */}
                {/* <ImageUpload uploadImage={uploadImage} open={fileDialog} onClose={() => setfileDialog(false)} onClick={()=>setfileDialog(true)} /> */}
    
        </ChatInputContainer>
    )
}

export default ChatInput

const ChatInputContainer = styled.div`
  border-radius: 20px;
  > form {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
  }

  > form > input {
      position: fixed;
      bottom: 30px;
      width: 60%;
      border: 1px solid gray;
      border-radius: 3px;
      padding: 20px;
      outline: none;
      font-family: Georgia, 'Times New Roman', Times, serif;
  }
  > form > button {
      display: none;
  }
  >form > .MuiSvgIcon-root {
        position: fixed;
        bottom:30px;
        right: 60px;
        font-size: 35px;
        background-color: transparent;
        color:gray;
        padding:10px;
        border-radius: 4px;
        cursor: pointer;
        :hover {
            opacity: 0.9;
            background-color: gray;
            color: #3b3636;
        }
    } 
`;

// const Image = styled.div`
//    > .MuiSvgIcon-root {

//         position: fixed;
//         bottom:30px;
//         right: 60px;
//         font-size: 35px;
//         background-color: #4e4a4a;
//         color:darkgray;
//         padding:10px;
//         border-radius: 4px;
//         cursor: pointer;
//         top:50%;
//         :hover {
//             opacity: 0.9;
//             background-color: gray;
//             color: #3b3636;
//         }
//     } 
// `;

