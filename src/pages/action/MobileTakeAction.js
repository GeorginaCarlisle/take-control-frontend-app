import React, { useContext, useEffect, useState } from 'react';
import { Accordion, AccordionContext, Card, Spinner, useAccordionToggle } from 'react-bootstrap';
import styles from '../../styles/TakeAction.module.css';
import accStyles from '../../styles/Accordion.module.css';
import ActionTask from './ActionTask';
import { axiosReq } from '../../api/axiosDefaults';

const MobileTakeAction = (props) => {
  
  const {
    hasLoaded,
    activeTasks,
    setActiveTasks,
    activeList,
    todayList,
    achievedList,
    setHasLoaded
  } = props;

  const [filter, setFilter] = useState("");

  const handleFilter = (event) => {
    setFilter(event.target.value);
  }

  useEffect(() => {
    const changeActiveTaskOrder = async () => {
      try {
        const {data} = await axiosReq.get(`/tasks/${filter}`);
        setActiveTasks(data);
        setHasLoaded(true);
      }  catch(err) {
        console.log(err)
      }
    };
    setHasLoaded(false);
    // Below sets fetchPosts to fire after a 1 second pause
    const timer = setTimeout(() => {
      changeActiveTaskOrder();
    }, 1000)
    // Below cleans up and clears the timeout function
    return () => {
      clearTimeout(timer)
    }
  }, [filter])

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
              <div className={styles.Filter}>
                <label htmlFor="filter" className={styles.FilterLabel}>Order by:</label>
                <select id="filter" name="filter" onChange={handleFilter} className={styles.FilterBox}>
                  <option name="filter" value='?ordering=deadline'>Task deadline</option>
                  <option name="filter" value='?ordering=focus__rank'>Focus Area</option>
                  <option name="filter" value='?ordering=goal__deadline'>Goal</option>
                  <option name="filter" value='?ordering=created_at'>Most recent task</option>
                </select>
              </div>
            </div>
            {hasLoaded ? (
              activeList?.length>0 ? (
                activeList.map( task => (
                  <ActionTask 
                    key={task.id}
                    {...task}
                    activeTasks={activeTasks}
                    setActiveTasks={setActiveTasks} 
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
              todayList?.length>0 ? (
                todayList.map( task => (
                  <ActionTask 
                    key={task.id}
                    {...task}
                    activeTasks={activeTasks}
                    setActiveTasks={setActiveTasks} 
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
            {hasLoaded ? (
              achievedList?.length>0 ? (
                achievedList.map( task => (
                  <ActionTask 
                    key={task.id}
                    {...task}
                    activeTasks={activeTasks}
                    setActiveTasks={setActiveTasks} 
                    type="achieved"/>
                ))
              ) : (
                <p>You dont have any tasks checked off as done</p>
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
    </Accordion>
  )
}

export default MobileTakeAction