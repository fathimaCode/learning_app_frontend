import { useEffect, useState } from "react"
import { chatsInterface  } from "../model/chatsInterface"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store/store"
import Utils from "../pages/common/utils"
import { getMessageList, postToMessage } from "../store/slice/messageSlice"
interface chatprops{
  userid:string
}

const InstructorChatComponent:React.FC<chatprops>= ({userid})=>{
  const outList = useSelector((state: RootState) => state.chats.chats);
    const dispatch = useDispatch<AppDispatch>()
    console.log(`access userid ${userid}`)
    const [myMessage,setMessage] =useState("")
   
    useEffect(() => {
      if (userid) {
          dispatch(getMessageList(userid));
      }
      console.log("*******************************")
     
     
      console.log(outList)
  }, [dispatch, userid]);
    function sendChat(): void {
     
        if(userid){
            const message :chatsInterface={
                userid:"1",
                message:myMessage,
                message_to:userid,
                message_at:new Utils().getCurrentDateTime()
            }
            dispatch(postToMessage(message))
            setMessage("")
        }
       
    }

    return (
        <>
     <section id="pricing" className="pricing">
      <div className="container" data-aos="fade-up" >

        <div className="row">
        {!userid?(<>
        <h5 style={{marginTop:"200px"}}>Kindly choose userid to view the message</h5>
        </>):
        
        (<>
           <div className="col-lg-12  mt-md-0">
            <div className="box featured">
              <h3>Chat </h3>
                <div className="chat_container">
                 {outList.map(msg=>(
                  < div key={msg.message}>
                  {msg.userid=="1"?(<>
                  <div className="msg_right">

                  {msg.message}<br></br>{msg.message_at}

                  </div>
                  
                  </>):(<>
                    <div className="msg_left">
                    {msg.message}<br></br>{msg.message_at}
                    
                    </div>
                  </>)}
               
                  </div>
                 ))}
                  
                </div>
              <div className="btn-wrap">
              <form className="chat_form" onSubmit={(e) => { e.preventDefault(); sendChat(); }}>
                                        <input
                                            type="text"
                                            placeholder="Type Here"
                                            value={myMessage}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                        <button type="submit" className="btn-buy">Send</button>
                                    </form>
              </div>
            </div>
          </div>
        
        </>)}
        
       

         

        </div>

      </div>
    </section>
        </>
    )
}

export default InstructorChatComponent