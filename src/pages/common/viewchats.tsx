import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { getAllMessage } from "../../store/slice/messageSlice";
import { chatsInterface } from "../../model/chatsInterface";
import SideBar from "../../components/Sidebar";

import InstructorChatComponent from "../../components/InstructorChatComponent";

const ViewChats: React.FC = () => {
    const messageList = useSelector((state: RootState) => state.chats.chats);
    const dispatch = useDispatch<AppDispatch>();
    const [useridChat, setUseridChat] = useState("")
    useEffect(() => {
        dispatch(getAllMessage());
    }, [dispatch]);

    const chatsInfo: chatsInterface[] = messageList;
    const displayedUserIds = new Set<string>();
    function chatUserId(userid: string): void {
        setUseridChat(userid)
    }
    function refreshUserIds(): void {
        setUseridChat("");
        dispatch(getAllMessage());
    }
    return (
        <>
            <div className="instructor_page">
                <SideBar />
                <div className="display_chatbox">
                <div className="row">
                    <h3 className="view_chats">View Chat Details <i className="ri-restart-fill" onClick={refreshUserIds}></i></h3>
                    
                    <div className="viewchats_userid">
                    {chatsInfo.map(chat => {
                        if (!displayedUserIds.has(chat.userid)&& chat.userid !="1") {
                            displayedUserIds.add(chat.userid);
                            
                            return (
                                <div key={chat.userid}>
                                    <h4 className="view_chatid" onClick={()=>chatUserId(chat.userid)}>{chat.userid}</h4>
                                </div>
                            );
                        }
                        return null;
                    })}

                    </div>
                 
                </div>

                <InstructorChatComponent userid={useridChat} />

                </div>
                
            </div>
        </>
    );
}

export default ViewChats;
