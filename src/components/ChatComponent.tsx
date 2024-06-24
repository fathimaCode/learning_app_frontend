import { useState } from "react"
import { chatsInterface  } from "../model/chatsInterface"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store/store"
import Utils from "../pages/common/utils"
import { postToMessage } from "../store/slice/messageSlice"

interface chatProps{
    message:chatsInterface[]
    customer:boolean
}
const ChatComponent:React.FC<chatProps>= ({message,customer})=>{
    const dispatch = useDispatch<AppDispatch>()
    const userid = localStorage.getItem("userid")
    const [myMessage,setMessage] =useState("")
    console.log(message)
    function sendChat(): void {
     
        if(userid){
            const message :chatsInterface={
                userid:customer?userid:"1",
                message:myMessage,
                message_to:customer?"1":userid,
                message_at:new Utils().getCurrentDateTime()
            }
            dispatch(postToMessage(message))
            setMessage("")
        }
       
    }

    return (
        <>
     <section id="pricing" className="pricing">
      <div className="container" data-aos="fade-up" style={{margin:"100px"}}>

        <div className="row">

        
          <div className="col-lg-12  mt-md-0">
            <div className="box featured">
              <h3>Chat </h3>
                <div className="chat_container">
                 {message.map(msg=>(
                  < div key={msg.message}>
                  {msg.userid==userid?(<>
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

         

        </div>

      </div>
    </section>
        </>
    )
}

export default ChatComponent
