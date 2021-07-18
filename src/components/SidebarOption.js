import React from 'react';
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { enterRoom } from '../features/appSlice';
import {db} from "../firebase";
import CloseIcon from "@material-ui/icons/Close"

<<<<<<< HEAD
const SidebarOption = ({Icon, title, addChannelOption, id }) => {
=======

const SidebarOption = ({Icon, title, addChannelOption, id, status }) => {
>>>>>>> master2
    const dispatch = useDispatch(); //shoot action into the global store
    
    
    const addChannel = () => {
         const channelName = prompt('Please enter the channel name');

         if (channelName) {
             db.collection('rooms').add({
                 name: channelName,
             });
         }
    };
    const selectChannel = () => {
         if(id){
            dispatch(enterRoom({
                roomId: id,
              })
            );
         }
    };

    const deleteChannel = (event) => {
        event.stopPropagation();
        if (id) {
            db.collection('rooms').doc(id).delete()
        }
    }

    return (
        <SidebarOptionContainer
           onClick = {addChannelOption ? addChannel : selectChannel}
        >
            {Icon && <span style={{
                transform: status? 'rotate(-90deg)': 'none',
                transition: 'all 0.3s'
            }}><Icon fontSize="small" style={{ padding: 10 }} />
                </span>}  
            {Icon ? (
              <h3>{title}</h3>
         ): (             
                <SidebarOptionChannel>
                    <span>#</span> {title}
                        <CloseIcon onClick={deleteChannel}/>
                </SidebarOptionChannel>  
             
         )}  
        </SidebarOptionContainer>
    );
}

export default SidebarOption

const SidebarOptionContainer = styled.div`
display: flex;
align-items: center;
font-size: 12px;
padding-left: 2px;
cursor: pointer;


 :hover {
     opacity: 0.9;
     background-color: #340e36;
 }

 > h3 {
     font-weight: 450;
 }
 
 > h3 > span {
     padding: 15px;
 }
`;

const SidebarOptionChannel = styled.h3`
     font-weight: 300;
    display: flex;
    align-items: center;
`;

