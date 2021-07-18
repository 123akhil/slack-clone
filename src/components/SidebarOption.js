import React from 'react';
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { enterRoom } from '../features/appSlice';
import {db} from "../firebase";
import CloseIcon from '@material-ui/icons/Close';

const SidebarOption = ({Icon, title, addChannelOption, id ,status }) => {
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
        const confirmBox = window.confirm(
        "Do you really want to delete this Channel?"
      )
      if (confirmBox === true) {
        event.stopPropagation();
        if (id) {
            db.collection('rooms').doc(id).delete()
        }
      }
    };

    return (
        <SidebarOptionContainer
           onClick = {addChannelOption ? addChannel : selectChannel}
        >
            {Icon && <span style={{
                transform: status? 'rotate(-90deg)': 'none',
                transition: 'all 0.5s'
            }}><Icon fontSize="small" style={{padding : 10}} /></span>}  
            {Icon ? (
              <h3>{title}</h3>
         ): (             
                <SidebarOptionChannel>
                     #   {title}
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
 
 /* > h3 > span {
     padding: 10px 15px;
 } */
`;

const SidebarOptionChannel = styled.h3`
     font-size: 15px;
     padding: 8px 16px;
     display: flex;
     align-items: center;
     justify-content: space-between; 
     width: 100%;
     > .MuiSvgIcon-root {
        display: flex; 
        padding-right:10px;      
        font-size: 16px;     
    }
`;

