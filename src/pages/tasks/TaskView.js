import React from 'react';
import taskStyles from '../../styles/Task.module.css'
import Dropdown from 'react-bootstrap/Dropdown';

const TaskView = (props) => {
  const {
    name,
    deadline_info,
    setTaskState
  } = props;

  const Icon = React.forwardRef(({ onClick }, ref) => (
    <i
      className={`fa-solid fa-ellipsis-vertical ${taskStyles.ChoiceIcon}`}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    />
  ));

  const handleEdit = () => {
    setTaskState('edit');
  }

  const handleDelete = () => {
    setTaskState('delete');
  }

  return (
    <div className={taskStyles.TaskContainer}>

      <Dropdown className={taskStyles.Choice} drop="left">
        <Dropdown.Toggle as={Icon} />
        <Dropdown.Menu className={taskStyles.ChoiceMenu} popperConfig={{ strategy: "fixed" }}>
          <Dropdown.Item className={taskStyles.ChoiceOption} onClick={handleEdit} aria-label="edit" >
            Edit task
          </Dropdown.Item>
          <Dropdown.Item className={taskStyles.ChoiceOption} onClick={handleDelete} aria-label="edit" >
            Delete task
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <div className={taskStyles.TaskDetails}>
        <h4>{name}</h4>
        {deadline_info ? (
          <p>{deadline_info}</p>
        ) : (
          <p>No deadline</p>
        )}
      </div>
    </div>
  )
}

export default TaskView