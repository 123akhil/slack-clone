import styled from "styled-components";
import React, { useEffect, useRef } from 'react';
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { useSelector } from "react-redux";
import { selectRoomId } from "../features/appSlice";
import ChatInput from "./ChatInput";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Message from "./Message";
import SearchIcon from '@material-ui/icons/Search';
//message karah
const Chat = () => {
    const chatRef = useRef(null);
    const roomId = useSelector(selectRoomId);//to grab(pull) the roomId from global store 
    const [roomDetails] = useDocument(
        roomId && db.collection("rooms").doc(roomId)
    );
    const [roomMessages, loading] = useCollection(
        roomId && db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp","asc")
    );

    useEffect(() =>{
      chatRef?.current?.scrollIntoView({behavior: "smooth"});
    }, [roomId, loading]);
    
    
    return (
        
        <ChatContainer>
          {roomDetails && roomMessages && (
            <>
            <Header>
               <HeaderLeft>
                  <h4><strong>#{roomDetails?.data().name}</strong></h4>
                  <StarBorderOutlinedIcon />
               </HeaderLeft>
               <HeaderSearch>
                 <SearchIcon />
                 <input placeholder= {`Search #${roomDetails?.data().name}`} />
                </HeaderSearch>
               <HeaderRight>
                  <p>
                     <InfoOutlinedIcon /> Details
                  </p>
               </HeaderRight>
            </Header>
            <ChatMessages>
              {roomMessages?.docs.map(doc => {
                  const { message, timestamp, user, userImage } = doc.data();

                    return (
                      <Message
                         Key={doc.id}
                         message={message}
                         timestamp={timestamp}
                         user={user}
                         userImage={userImage}
                      />
                    );
            })}
            <ChatBottom ref ={chatRef} />
            </ChatMessages>

            <ChatInput 
               chatRef ={chatRef}
               channelName={roomDetails?.data().name}
               channelId={roomId}
            />
          </>  
          )}
          
        </ChatContainer>
    );
}

export default Chat;

const ChatContainer = styled.div`
flex: 0.7;
flex-grow: 1;
margin-top: 60px;

overflow-y: auto;
     position: relative;
    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background: gray;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        background: white;
        border-radius: 10px;
    }
`;

const Header = styled.div`
   display: flex;
   justify-content: space-between;
   padding: 18px;
   border-bottom: 1px solid lightgray;
   
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;

   > h4 {
       display: flex;
       text-transform: lowercase;
       margin-right: 10px;
   }

      .MuiSvgIcon-root {
       margin-left: 2px;
       font-size: 24px;
       cursor: pointer;
        :hover {
            opacity: 0.9;
            color: yellow;
        }
   }
`;
const HeaderSearch = styled.div`
    opacity: 1;
    border-radius: 6px;
    background-color: transparent;
    text-align: center;
    display: flex;
    padding: 0 10px;
    margin-left: 320px;
    color: grey;
    border: 1px gray solid;
    align-items: center;
    height: 30px;
    position: fixed;
    > input {
        background-color: transparent;
        border: none;
        text-align: center;
        min-width: 30vw;
        outline: 0;
        font-family: Georgia, 'Times New Roman', Times, serif;
        color: black;
    }

`;
const HeaderRight = styled.div`
   > p {
       display: flex;
       align-items: center;
       font-size: 14px;
   }

   > p > .MuiSvgIcon-root {
       margin-right: 5px;
       font-size: 16px;
   }
`;
const ChatBottom = styled.div`
   padding-bottom: 200px;
`;
const ChatMessages = styled.div`
`;


