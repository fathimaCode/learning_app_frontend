import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomerNavBar from '../../components/CustomerNavBar';
import { AppDispatch, RootState } from '../../store/store';
import { getPurchasedList } from '../../store/slice/purchaseSlice';
import data from '../../course_content/data.json';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ViewChapters from '../admin/viewChapters';
const Dashboard: React.FC = () => {
    const [chapterStatus, setChapterStatus] = useState(false)
    const [courseId, setCourseId] = useState("")
    const userId = localStorage.getItem('userid');
    const dispatch = useDispatch<AppDispatch>();
    const purchases = useSelector((state: RootState) => state.purchase.purchases);
    function handleChapters(courseId: string): void {
        setChapterStatus(true)
        setCourseId(courseId)
        localStorage.setItem("courseId",courseId)
    }
    useEffect(() => {
        if (userId) {
            dispatch(getPurchasedList(userId));
        }
    }, [dispatch, userId]);
    console.log(purchases.length)
    return (
        <>
            <CustomerNavBar />
            {chapterStatus ? (

                <>
                    <ViewChapters courseId={courseId} />
                </>
            ) : (
                <>
                {purchases.length==0?(<>
                <h5 style={{margin:"150px",textAlign:"center"}}>No course purchased</h5>
                </>):(<>
                
                    <section id="services" className="services section-bg">
                        <div className="container" data-aos="fade-up">
                            <div className='course_container'>

                                {purchases.map((purchase) => {
                                    const courseInfo = data.courses.find(course => course.courseId === purchase.courseid)


                                    return (
                                        <>
                                            {courseInfo && (
                                                <Card style={{ width: '18rem' }} key={purchase._id} className='course_Card' >
                                                    <Card.Img variant="top" src={courseInfo.image} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                                    <Card.Body>
                                                        <Card.Title>{courseInfo.title}</Card.Title>
                                                        <Card.Text>
                                                            {courseInfo.description}
                                                        </Card.Text>
                                                        <p>Purchased on: {purchase.purchased_at}</p>
                                                        
                                                        <Button variant="success" onClick={() => handleChapters(courseInfo.courseId)}>View Chapters</Button>
                                                    </Card.Body>

                                                </Card>
                                            )}
                                        </>
                                    )
                                })}
                            </div>


                        </div>
                    </section>
                </>)}
                  
                </>

            )}


        </>
    );
};

export default Dashboard;
