import React, { useEffect, useState } from 'react';
import styles from '../../styles/TakeAction.module.css'
import pageStyles from '../../styles/Page.module.css';
import ActionTask from './ActionTask';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { axiosReq } from '../../api/axiosDefaults';

const DesktopTakeAction = (props) => {

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
      }  catch(err) {
        //console.log(err)
      }
    };
    setHasLoaded(false);
    changeActiveTaskOrder();
  }, [filter])

  return (
    <div className={`${pageStyles.ContentContainer} ${styles.MainContainer}`}>

      <div className={styles.Column}>
        <div className={styles.TitleContainer}>
          <h3>Backlog</h3>
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
              <option name="filter" value='?ordering=-focus'>Focus Area</option>
              <option name="filter" value='?ordering=goal__deadline'>Goal</option>
              <option name="filter" value='?ordering=-created_at'>Most recent task</option>
            </select>
          </div>
        </div>
        <div className={styles.TasksContainer}>
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
                <p className={styles.AddPadding}>No tasks found.</p>
              )
            )
          ) : (
            <div className={styles.SpinnerContainer}>
              <Spinner animation="border" />
              <p>We are just loading your tasks</p>
            </div>
          )}
        </div>
      </div>

      <div className={`${styles.Column} ${styles.MiddleColumn}`}>
        <div className={styles.TitleContainer}>
          <h3>Today</h3>
        </div>
        <div className={styles.TasksContainer}>
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
              <p className={styles.AddPadding}>You don't have any tasks set for today.</p>
            )
          ) : (
            <div className={styles.SpinnerContainer}>
              <Spinner animation="border" />
              <p>We are just loading your tasks</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.Column}>
        <div className={styles.TitleContainer}>
          <h3>Completed</h3>
        </div>
        <div className={styles.TasksContainer}>
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
              <p className={styles.AddPadding}>You don't have any tasks checked off as done.</p>
            )
          ) : (
            <div className={styles.SpinnerContainer}>
              <Spinner animation="border" />
              <p>We are just loading your tasks.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DesktopTakeAction