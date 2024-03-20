import React, { useContext, useEffect, useState } from 'react';
import { Accordion, AccordionContext, Card, Spinner, useAccordionToggle } from 'react-bootstrap';
import styles from '../../styles/TakeAction.module.css';
import accStyles from '../../styles/Accordion.module.css';
import ActionTask from './ActionTask';
import { axiosReq } from '../../api/axiosDefaults';

const MobileTakeAction = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [activeTasks, setActiveTasks] = useState({ results: []});
  const [todayTasks, setTodayTasks] = useState({ results: []});
  const [completedTasks, setCompletedTasks] = useState({ results: []});

  useEffect(() => {
    const fetchActiveTasks = async () => {
      try {
        const {data} = await axiosReq.get('tasks/?active=True');
        setActiveTasks(data);
        setHasLoaded(true);
      }  catch(err) {
        console.log(err)
      }
    };
    setHasLoaded(false);
    // Below sets fetchPosts to fire after a 1 second pause
    const timer = setTimeout(() => {
      fetchActiveTasks();
    }, 1000)
    // Below cleans up and clears the timeout function
    return () => {
      clearTimeout(timer)
    }
  }, []);

  useEffect(() => {
    const fetchTodayTasks = async () => {
      try {
        const {data} = await axiosReq.get('tasks/?today=True');
        setTodayTasks(data);
        setHasLoaded(true);
      }  catch(err) {
        console.log(err)
      }
    };
    setHasLoaded(false);
    // Below sets fetchPosts to fire after a 1 second pause
    const timer = setTimeout(() => {
      fetchTodayTasks();
    }, 1000)
    // Below cleans up and clears the timeout function
    return () => {
      clearTimeout(timer)
    }
  }, []);

  // function copied from React bootstrap and adjusted
  function ContextAwareToggle({ children, eventKey, callback }) {
    const currentEventKey = useContext(AccordionContext);
    const decoratedOnClick = useAccordionToggle(
      eventKey,
      () => callback && callback(eventKey),
    );
    const isCurrentEventKey = currentEventKey === eventKey;
    return (
      <div
        className={accStyles.Header}
        style={{
          color: isCurrentEventKey ? '#3c159c' : 'black',
          fontWeight: isCurrentEventKey ? 'bold' : 'normal' }}
        onClick={decoratedOnClick}
      >
        {children}
        {isCurrentEventKey ? (
          <i class="fa-solid fa-angle-down"></i>
        ) : (
          <i class="fa-solid fa-angle-up"></i>
        )}
      </div>
    );
  }

  return (
    <Accordion className={styles.Accordion}>
      <Card>
        <Card.Header>
          <ContextAwareToggle as={Card.Header} eventKey="0">
            <h3>Backlog</h3>
          </ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body className={styles.AccordionBody}>
            <div className={styles.FunctionContainer}>
              <p>Add additional task button</p>
              <p>Ordering filter</p>
            </div>
            {hasLoaded ? (
              activeTasks.results.length>0 ? (
                activeTasks.results.map( task => (
                  <ActionTask 
                  key={task.id}
                  {...task}
                  activeTasks={activeTasks}
                  setActiveTasks={setActiveTasks} 
                  todayTasks={todayTasks}
                  setTodayTasks={setTodayTasks} 
                  type="active"/>
                ))
              ) : (
                <p>You dont have any active tasks</p>
              )
            ) : (
              <div className={styles.SpinnerContainer}>
                <Spinner animation="border" />
                <p>We are just loading your tasks</p>
              </div>
            )}
          </Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Card.Header>
          <ContextAwareToggle as={Card.Header} eventKey="1">
            <h3>Today</h3>
          </ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body className={styles.AccordionBody}>
            <div className={styles.FunctionContainer}>
              <p>Ordering filter</p>
            </div>
            {hasLoaded ? (
              todayTasks.results.length>0 ? (
                todayTasks.results.map( task => (
                  <ActionTask 
                    key={task.id}
                    {...task}
                    activeTasks={activeTasks}
                    setActiveTasks={setActiveTasks} 
                    todayTasks={todayTasks}
                    setTodayTasks={setTodayTasks} 
                    type="today"/>
                ))
              ) : (
                <p>You dont have any tasks set for today</p>
              )
            ) : (
              <div className={styles.SpinnerContainer}>
                <Spinner animation="border" />
                <p>We are just loading your tasks</p>
              </div>
            )}
          </Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Card.Header>
          <ContextAwareToggle as={Card.Header} eventKey="2">
            <h3>Completed</h3>
          </ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="2">
          <Card.Body>
            <p>List of completed tasks</p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}

export default MobileTakeAction