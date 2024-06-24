import React from 'react';
import CommonNav from '../../components/commonNav';

const Home: React.FC = () => {
  return (
    <>
    <CommonNav/>
     <section id="hero">
    <div id="heroCarousel" data-bs-interval="5000" className="carousel slide carousel-fade" data-bs-ride="carousel">

      <div className="carousel-inner" role="listbox">

        
        <div className="carousel-item active" style={{ backgroundImage: 'url(src/assets/img/slide/slide-3.jpg)' }}>
          <div className="carousel-container">
            <div className="carousel-content animate__animated animate__fadeInUp">
              <h2>Welcome to <span>LMS App</span></h2>
              <p>The quality courses are available to enrich the career path. These courses offer in-depth knowledge and practical skills. They are designed to meet the demands of today's job market. By enrolling, you'll gain valuable insights and enhance your professional growth.</p>
              
            </div>
          </div>
        </div>

      
      

      </div>

    

      <ol className="carousel-indicators" id="hero-carousel-indicators"></ol>

    </div>
  </section>
  <section id="about-us" className="about-us">
      <div className="container" data-aos="fade-up">

        <div className="row content">
          <div className="col-lg-6" data-aos="fade-right">
            <h2>About us</h2>
            <h3>Quality Learning Material</h3>
          </div>
          <div className="col-lg-6 pt-4 pt-lg-0" data-aos="fade-left">
            <p>
            Welcome to our LMS App, your gateway to quality courses designed to enrich your career path. Our offerings provide in-depth knowledge and practical skills tailored to the demands of today's job market. Our mission is to empower learners with the tools and insights needed for professional growth. With our comprehensive curriculum, you'll be well-equipped to achieve your career goals. Join us and take the next step in your learning journey.
            </p>
            
            
          </div>
        </div>

      </div>
    </section>
    </>
  );
}

export default Home;
