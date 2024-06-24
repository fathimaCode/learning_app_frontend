import { useDispatch, useSelector } from "react-redux";
import ChatComponent from "../../components/ChatComponent"
import CustomerNavBar from "../../components/CustomerNavBar"
import { chatsInterface } from "../../model/chatsInterface"
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { getMessageList } from "../../store/slice/messageSlice";


const CustomerChat:React.FC= ()=>{
    const messageList = useSelector((state: RootState) => state.chats.chats);
    const userId = localStorage.getItem('userid');
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        if (userId) {
            dispatch(getMessageList(userId));
        }
    }, [dispatch, userId]);

   
    const chatsInfo: chatsInterface[] = messageList
   
    return (
        <>
           <CustomerNavBar />
            <ChatComponent message={chatsInfo} customer={true}/>
        </>
    )
}

export default CustomerChat