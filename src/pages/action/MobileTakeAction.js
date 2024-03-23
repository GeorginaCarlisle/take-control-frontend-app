import React, { useContext, useEffect, useState } from 'react';
import { useAccordionToggle, AccordionContext } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
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

  const [query, setQuery] = useState("");

  const [searchList, setSearchList] = useState({ results: []});

  const handleFilter = (event) => {
    setFilter(event.target.value);
  }

  useEffect(() => {
    if (query !== ""){
      const updateSearchList = async () => {
        try {
          setHasLoaded(false);
          const {data} = await axiosReq.get(`/tasks/?search=${query}`);
          setSearchList(data);
          setHasLoaded(true);
        }  catch(err) {
          //console.log(err)
        }
      };
      // Below sets fetchPosts to fire after a 1 second pause
      const timer = setTimeout(() => {
        updateSearchList();
      }, 1000)
      // Below cleans up and clears the timeout function
      return () => {
        clearTimeout(timer)
      }
    } else {
      setSearchList({ results: []});
    }
  }, [query])

  useEffect(() => {
    const changeActiveTaskOrder = async () => {
      try {
        const {data} = await axiosReq.get(`/tasks/${filter}`);
        setActiveTasks(data);
        setHasLoaded(true);
      } catch(err) {
        //console.log(err)
      }
    };
    setHasLoaded(false);
    changeActiveTaskOrder();
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
          <i className="fa-solid fa-angle-down"></i>
        ) : (
          <i className="fa-solid fa-angle-up"></i>
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
              <div className={styles.SearchContainer}>
                <Form onSubmit={(event) => event.preventDefault()}>
                  <Form.Control
                    type="text"
                    className={styles.SearchInput}
                    placeholder="Search tasks"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}/>
                </Form>
              </div>
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
              searchList.results.length>0 ? (
                searchList.results.map( task => (
                  <ActionTask 
                    key={task.id}
                    {...task}
                    activeTasks={activeTasks}
                    setActiveTasks={setActiveTasks} 
                    type="active"/>
                ))
              ) : (
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