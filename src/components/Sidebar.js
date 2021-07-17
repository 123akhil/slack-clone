import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import React from 'react';
import styled from "styled-components";
import CreateIcon from "@material-ui/icons/Create";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AppsIcon from "@material-ui/icons/Apps";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import SidebarOption from './SidebarOption';
import {useCollection} from "react-firebase-hooks/firestore";
import {auth, db} from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
// import CloseIcon from '@material-ui/icons/Close';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const Sidebar = () => {
    const [status,setStatus]=React.useState(false);
    const [channels] = useCollection(db.collection("rooms"));
    const [user] = useAuthState(auth);
    // const onAdd = () => {
    //     setStatus(!status);
    // }
    return (
        <SidebarContainer>
          <SidebarHeader>
             <SidebarInfo>
               <h2> CASDM BASE </h2>
               <h3>
                   <FiberManualRecordIcon /> 
                    {user.displayName}
                </h3>
             </SidebarInfo>
             <CreateIcon />
          </SidebarHeader>

          <SidebarOption Icon={InsertCommentIcon} title="Threads"/>
          <SidebarOption Icon={InboxIcon} title="Mentions & reactions"/>
          <SidebarOption Icon={DraftsIcon} title="Saved Items"/>
          <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser"/>
          <SidebarOption Icon={PeopleAltIcon} title="People & user groups"/>
          <SidebarOption Icon={AppsIcon} title="Apps"/>
          <SidebarOption Icon={FileCopyIcon} title="File browser"/>
          <SidebarOption Icon={ExpandLessIcon} title="Show less"/>
          <hr />
          <hide onClick={() => setStatus(!status)}>
          {status?<SidebarOption Icon={ChevronRightIcon} title="Channels"/>:<SidebarOption Icon={ExpandMoreIcon} title="Channels"/>}
           </hide>
          <hr />
         <SidebarOption Icon={AddIcon} addChannelOption title="Add Channel"/>
         {status? <SideHide>
            {channels?.docs.map( doc => (
                <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
            ))}
          </SideHide>:null}
        </SidebarContainer>
    )
}

export default Sidebar

const SidebarContainer = styled.div`
    color: white;
    background-color: var(--slack-color);
    flex: 0.3;
    border-top: 1px solid #49274b;
    max-width: 260px;
    margin-top: 60px;

    overflow-y: auto;
     position: relative;
    &::-webkit-scrollbar {
        width: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background: #663e68;
        border-radius: 20px;
    }
    &::-webkit-scrollbar-track {
        background: var(--slack-color);
        border-radius: 20px;
    }

    >hr {
      margin-top: 10px ;
      margin-bottom: 10px;
      border: 1px solid #49274b;
    }
`;

const SidebarHeader = styled.div`
    display: flex;
    border-bottom: 1px solid #49274b;
    padding: 13px;

    > .MuiSvgIcon-root {
        padding: 8px;
        color: #49274b;
        font-size: 18px;
        background-color: white;
        border-radius: 999px;
    }
`;

const SidebarInfo = styled.div`
    flex:1;
    

    > h2 {
        font-size: 15px;
        font-weight: 900;
        margin-bottom: 5px;
    }

    > h3 {
        display: flex;
        font-size: 13px;
        font-weight: 400;
        align-items: center;
    }

    > h3 > .MuiSvgIcon-root {
        font-size: 14px;
        margin-top: 1px;
        margin-right: 2px;
        color: green;
    }
`;

const SideHide = styled.div`
`;

const hide = styled.div`
`;