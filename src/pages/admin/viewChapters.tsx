import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; // Import the styles
import data from "../../course_content/data.json";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { TrackInterface } from '../../model/track';
import { getTrackList, postTrackDetails } from '../../store/slice/trackSlice';
import Utils from '../common/utils';
import { TrackDetails } from '../../model/track_details';
import Button from 'react-bootstrap/Button';

interface ChapterProps {
  courseId: string;
}

const ViewChapters: React.FC<ChapterProps> = ({ courseId }) => {
  const learningRate = useSelector((state: RootState) => state.track.percentage);
  const courseDetails = data.courses.find(course => course.courseId === courseId);
  const chapters = courseDetails?.chapters;
  
  const userId = localStorage.getItem('userid');
  const [rate, setRate] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log(`learning rate is ${rate}`);
    if (userId) {
      const trackDetail: TrackDetails = {
        userid: userId,
        courseid: courseId
      };
      dispatch(getTrackList(trackDetail));
      if (learningRate) {
        const rate = parseInt(learningRate, 10);
        setRate(rate);
      }
    }
  }, [dispatch, userId, learningRate, courseId, rate]);

  console.log(`rate::::::::::::::${rate}`);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

  const updateTracker = (percentage: any) => {
    if (userId) {
      const trackInfo: TrackInterface = {
        userid: userId,
        courseid: courseId,
        percentage: percentage.toString(),
        updated_at: currentDate
      };
      if (rate < percentage) {
        dispatch(postTrackDetails(trackInfo));
      } else {
        console.log("already learned");
      }
    }
  };

  const currentDate = new Utils().getCurrentDate();

  const handleNextChapter = () => {
    const percentage = currentChapterIndex + 1;
    console.log(`current chapter ${currentChapterIndex}`);
    updateTracker(percentage);

    if (chapters && currentChapterIndex < chapters.length - 1) {
      setCurrentChapterIndex(prevIndex => prevIndex + 1);
    }
  };

  console.log(rate);
  const completionPercentage = rate * 20;

  function gotoChapter(): void {
    setCurrentChapterIndex(rate);
  }

  function completedChapter() {
    const percentage = currentChapterIndex + 1;
    updateTracker(percentage);
  }

  return (
    <>
      {courseDetails && (
        <>
          <section id="blog" className="blog" style={{ margin: 100 }}>
            <div className="container" data-aos="fade-up">
              <div className="row">
                <div className="col-lg-8 entries">
                  <article className="entry entry-single">
                    <h1>Learning Tracker/ <a href="#" onClick={gotoChapter}>Go to chapter {rate + 1}</a></h1>
                    <h4>{courseDetails.title}</h4>
                    <h3>Chapter {currentChapterIndex + 1}</h3>
                    <p>{chapters && chapters[currentChapterIndex]?.description}</p>
                   
                    {chapters && currentChapterIndex === chapters.length - 1 ? (
                      <>
                        {rate === 5 ? (
                          <><p>course completed</p></>
                        ) : (
                          <Button variant="outline-success" onClick={completedChapter}>
                            Completed
                          </Button>
                        )}
                      </>
                    ) : (
                      <Button variant="outline-success" onClick={handleNextChapter} disabled={chapters && currentChapterIndex === chapters.length - 1}>
                        Next Chapter
                      </Button>
                    )}
                  </article>
                </div>
                <div className="col-lg-4">
                  <div className="sidebar">
                    <h2>Learning Progress</h2>
                    <div style={{ width: '100px', margin: '0 auto' }}>
                      <CircularProgressbar
                        value={completionPercentage}
                        text={`${completionPercentage}%`}
                        styles={buildStyles({
                          textSize: '16px',
                          pathColor: `rgba(62, 152, 199, ${completionPercentage / 100})`,
                          textColor: '#000',
                          trailColor: '#d6d6d6',
                        })}
                      />
                    </div>
                    <h3 className="sidebar-title">Chapters</h3>
                    <div className="sidebar-item tags">
                      <ul>
                      {chapters?.map((chap, index) => (
                          <li key={index} className={index === currentChapterIndex ? 'active' : ''}>
                            {rate<=index?(<><a href="#" >Chapter {index + 1}</a></>):(<><a href="#" className='completed'>Chapter {index + 1}</a></>)}
                            <span>{chap.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="sidebar-item categories">
                      <ul>
                        <li>
                          <a href="/takeQuiz">Take Quiz  <span></span></a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ViewChapters;
