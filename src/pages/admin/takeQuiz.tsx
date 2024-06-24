import { useState } from "react"
import CustomerNavBar from "../../components/CustomerNavBar"
import data from "../../course_content/data.json"
import Button from 'react-bootstrap/Button';
import quiz1 from "../../../public/assets/img/quiz1.png"
import quiz2 from "../../../public/assets/img/quiz2.png"
const TakeQuiz: React.FC = () => {
    const courseId = localStorage.getItem("courseId")
    const courseData = data.courses.find(course => course.courseId === courseId)
    const quizes = courseData?.quizzes
    const totalLength = quizes?.length
    const [viewResult, setViewResult] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [points, setPoints] = useState(0)
    const [selectedOption, setselectedOption] = useState("")
  
    function handleNext(answer:string): void {
        if(selectedOption==answer){
            setPoints(points+1)
        }
        if(totalLength==currentIndex+1){
            console.log(`result :${points}`)
            setViewResult(true)
        }
        else{
            setCurrentIndex(currentIndex+1)
            setselectedOption("")
        }
      
    }

    function handleOptions(a: any): void {
        console.log(a)
        setselectedOption(a)
      
    }

    return (
        <>
            <CustomerNavBar />
            <section id="blog" className="blog" style={{ margin: 100 }}>
                <div className="container" data-aos="fade-up">
                    <div className="row">
                        <div className="col-lg-12 entries">
                            <article className="entry entry-single">
                            
                                <h1>Quiz </h1>

                                {viewResult?(<> 
                                
                                
                              
                                <h1 style={{textAlign:"center"}}>Total Score: {points*10}/{totalLength}0</h1>
                                
                                {points>3?(<> 
                                <h4 style={{color:"green"}}>Good Score</h4>
                                
                                <div className="result">
                                <img src={quiz2} alt="" />
                                    </div>
                                </>
                                ):(<>
                                <h4 style={{color:"red"}}>Try Hard to get good score</h4>
                                    <div className="result">
                                    <img src={quiz1} alt="" />
                                    </div>
                                 
                                 </>
                                )}
                                
                                </>):
                                (<>
                                <p>Total Questions: {totalLength} </p>
                                {quizes &&(
                                    <>
                                    
                                    <h2 className="entry-title">{currentIndex+1}. {quizes[currentIndex].question} </h2>
                                    <div className="sidebar-item tags">
                                            <ul style={{display:"flex",listStyle:"none"}}>
                                            <li style={{padding:10}}><Button variant={selectedOption=="a"? "success":"outline-success"} onClick={()=>handleOptions("a",)}>{quizes[currentIndex].options.a}</Button> </li>
                                                <li style={{padding:10}}><Button variant={selectedOption=="b"? "success":"outline-success"} onClick={()=>handleOptions("b")}>{quizes[currentIndex].options.b}</Button> </li>
                                                <li style={{padding:10}}><Button variant={selectedOption=="c"? "success":"outline-success"} onClick={()=>handleOptions("c")}> {quizes[currentIndex].options.c}</Button></li>
                                                <li style={{padding:10}}><Button variant={selectedOption=="d"? "success":"outline-success"} onClick={()=>handleOptions("d")}> {quizes[currentIndex].options.d}</Button></li>
                                            </ul>
                                        </div>
                                      
                                      {currentIndex+1==totalLength?(<><Button onClick={()=>handleNext(quizes[currentIndex].correctAnswer)}  variant="outline-success" >Submit </Button></>):(<> <Button  variant="outline-success" onClick={()=>handleNext(quizes[currentIndex].correctAnswer)}>Next </Button></>)} 
                                    </>
                                    
                                )}
                                
                                </>)}
                               
                               
                            </article>
                        </div>

                    </div>
                </div>
            </section>
        </>

    )
}
export default TakeQuiz