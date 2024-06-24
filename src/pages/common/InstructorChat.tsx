import { useDispatch, useSelector } from "react-redux";
import ChatComponent from "../../components/ChatComponent"

import { chatsInterface } from "../../model/chatsInterface"
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { getAllMessage } from "../../store/slice/messageSlice";
import SideBar from "../../components/Sidebar";


const InstructorChat:React.FC= ()=>{
    const messageList = useSelector((state: RootState) => state.chats.chats);
  
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getAllMessage());
    }, [dispatch]);

   
    const chatsInfo: chatsInterface[] = messageList
   
    return (
        <>
          <div className="instructor_page">
        <SideBar/>
        <ChatComponent message={chatsInfo} customer={false}/>
    </div>
            
        </>
    )
}

export default InstructorChat