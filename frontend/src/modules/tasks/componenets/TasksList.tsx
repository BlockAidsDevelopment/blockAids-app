import React, {FC, useEffect, useState} from "react";
import '../styles/Task.scss';
import TasksItem from "./TasksItem";
import {Link} from "react-router-dom";
import arrowRight from "../assets/arrowRight.svg";
import {BrowserView, MobileView} from 'react-device-detect';
import {tasksApi} from "../../../api/tasksApi";
import {useAppSelector} from "../../../hooks/redux";
import {ITask} from "../../../models/ITask";
import {TasksCalendar, TasksFilter} from "../index";

interface ITasksList {
  heading?: string;
  Filter?: React.ComponentType;
  Calendar?: React.ComponentType;
}

const TasksList: FC<ITasksList> = (props) => {
  const {type, authUser} = useAppSelector(state => state.authReducer);
  const {heading} = props;
  const [filtredTasks, setFiltredTasks] = useState<ITask[] | undefined>();
  let fetchTasks = tasksApi.useFetchAllTasksByUserIdQuery;
  if (type === 'specialist') {
    fetchTasks = tasksApi.useFetchAllTasksBySpecialistIdQuery;
  }
  const {data: tasks} = fetchTasks(authUser.id);

  const sortTasks = (sortBy: string = 'all') => {
    if (tasks) {
      if (sortBy === 'all') {
        return setFiltredTasks(tasks);
      }
      const sortedTasks = tasks.filter(task => task.status === sortBy);
      return setFiltredTasks(sortedTasks);
    }
  }

  useEffect(() => {
    sortTasks('all');
  }, [tasks])

  return (
    <>
      <div className="tasks-area">
        {heading && (
          <div className="tasks-title">
            <div><h3>Tasks</h3></div>
            <div>
              <Link to="/tasks">
                Show all
                <i className="icon" style={{backgroundImage: `url(${arrowRight})`}}></i>
              </Link>
            </div>
          </div>
        )}
        <div className="tasks-top-options">
          <TasksFilter onSort={sortTasks}/>
          <BrowserView>
            <TasksCalendar/>
          </BrowserView>
        </div>
        {
          filtredTasks?.length ?
            <>
              <div className="tasks-head">
                <div className="tasks-head-item lg">
                  {type === "user" && "Specialist"}
                  {type === "specialist" && "Patient"}
                </div>
                <div className="tasks-head-item md">Task Name</div>
                <div className="tasks-head-item md">Due Date</div>
                <div className="tasks-head-item sm">Reward</div>
                <div className="tasks-head-item sm">Status</div>
                <div className="tasks-head-item xs"></div>
              </div>
              <div className="tasks-body-wrapper">
                {filtredTasks && filtredTasks.map((task) => <TasksItem task={task} key={task.id}/>)}
              </div>
            </>
            : <p style={{textAlign: 'center'}}>There is not any tasks, create the first one</p>
        }
      </div>
      <div className="task-options" style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <Link to="/tasks/create" style={{display: 'inline-block'}}>
          <button className="add-new-task-btn">
            <i className="icon"></i>
            Add new task
          </button>
        </Link>
        <a href={`${process.env.REACT_APP_BLOCKCHAIN_URL}/medical-records`} style={{display: 'inline-block', marginLeft: '20px', marginTop: '-30px'}}>
          <button className="add-new-task-btn">
            Check medical records
          </button>
        </a>
        <MobileView>
          <TasksCalendar/>
        </MobileView>
      </div>
    </>
  );
}

export default TasksList;
