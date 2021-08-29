import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { useState } from "react";
import { auth, db } from "../firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
// import VideocamIcon from "@material-ui/icons/Videocam";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import GifIcon from "@material-ui/icons/Gif";
// import Modal from "./Modal/Modal";
// import Giphy from "./Giphy";

const ChatInput = ({ channelName, channelId, chatRef }) => {
  const [input, setInput] = useState(""); //picking text from the inputfield
  const [user] = useAuthState(auth);
  // const [showModal, setShowModal] = useState(false);
  // const [GIFData, setGIFData] = useState({});
  const sendMessage = (e) => {
    e.preventDefault(); //prevent from refresh
    if (!channelId) {
      return false;
    }
    db.collection("rooms").doc(channelId).collection("messages").add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user.displayName,
      userImage: user.photoURL, //check for attachments
    });

    chatRef?.current?.scrollIntoView({ behavior: "smooth" });

    setInput("");
  };
  return (
    <ChatInputContainer>
      <InputBody>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${channelName}`}
          />
          <Button hidden type="submit" onClick={sendMessage}>
            SEND
          </Button>
        </form>
      </InputBody>
      <InputIcons>
        <Icons>
          <PhotoIcon />
          <p> Images </p>
        </Icons>
        <Icons>
          <Gifs fontSize="large" />
          <p> Gif's</p>
          {/* {showModal && (
                    <Modal show={showModal} onClose={() => setShowModal(false)}>
                        {/* <Giphy setGIFData={setGIFData} /> */}
          {/* </Modal> */}
        </Icons>
      </InputIcons>
    </ChatInputContainer>
  );
};

export default ChatInput;

const ChatInputContainer = styled.div`
  align-items: center;
  text-align: center;
  margin-left: 0%;
  margin-right: 5%;
  background-color: #f3ecec;
  width: 90%;
  position: fixed;
  bottom: 0px;
  border-top: 1px solid lightgray;
  > hr {
    border-top: 1px solid gray;
  }
`;
const InputBody = styled.div`
  padding-top: 3px;
  display: flex;
  justify-content: space-around;
  border-radius: 20px;
  > form {
  }

  > form > input {
    background-color: white;
    text-align: center;
    width: 48vw;
    color: black;
    border: 1px solid gray;
    border-radius: 4px;
    padding: 12px;
    font-family: Georgia, "Times New Roman", Times, serif;
  }
  > form > button {
    display: none;
  }
`;
const InputIcons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0;
  border-top-width: 1px;
  margin-left: 22%;
  margin-right: 22%;
`;
const Icons = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
  cursor: pointer;
  > p {
    align-items: flex-start;
    padding: 0;
    margin: 0;
    font-size: 14px;
    font-weight: bold;
  }
  :hover {
    background-color: white;
  }
`;
const PhotoIcon = styled(PhotoCameraIcon)`
  cursor: pointer;
  color: #b5d310;
  margin-right: 4px;
`;
const Gifs = styled(GifIcon)`
  cursor: pointer;
  color: #d68996;
`;
