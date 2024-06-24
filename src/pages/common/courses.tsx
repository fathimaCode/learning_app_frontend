import React from 'react';
import CommonNav from '../../components/commonNav';
import data from '../../course_content/data.json'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {  useNavigate } from "react-router-dom";
const Courses: React.FC = () => {
  const navigate = useNavigate()
  const tokenInfo = localStorage.getItem("token")
  function handlePurchase(courseId: string): void {
    localStorage.setItem("purchaseId",courseId)
    if(tokenInfo==null){
      navigate('/login')
    }
    else{
      navigate('/purchase')
    }
    
  }
  

  return (
    <>
    <CommonNav/>
    <section id="services" className="services section-bg">
      <div className="container" data-aos="fade-up">
        <div className='course_container'>
          {data.courses.map((course,index)=>(
               <Card style={{ width: '18rem' }} key={index} className='course_Card'>
               <Card.Img variant="top" src={course.image} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
               <Card.Body>
                 <Card.Title>{course.title}</Card.Title>
                 <Card.Text>
                   {course.description}
                 </Card.Text>
                 <p>Rs.{course.price}</p>
                 <Button variant="success" onClick={()=>handlePurchase(course.courseId)}>Purchase</Button>
               </Card.Body>
             </Card>
          ))}
        </div>
      

      </div>
    </section>
    </>
  );
}

export default Courses;
