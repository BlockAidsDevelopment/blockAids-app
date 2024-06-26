import React, {FC} from "react";
import {Avatar, Grid} from "@mui/material";
import authorIcon from '../assets/authorIcon.svg';
import specialistIcon from '../assets/specialistIcon.svg';
import organizationIcon from '../assets/organizationIcon.svg';
import calendarIcon from '../assets/calendarIcon.svg';
import statusIcon from '../assets/statusIcon.svg';
import MyButton from "../../../ui/MyButton";
import {Link} from "react-router-dom";
import {TaskStatusesEnum} from "../enums/TaskStatusesEnum";
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import TaskReward from "./TaskReward";
import {ITask} from "../../../models/ITask";
import {useAppSelector} from "../../../hooks/redux";

interface ITaskViewWidgetProps {
  task: ITask;
}

const TaskViewWidget: FC<ITaskViewWidgetProps> = ({task}) => {
  const {type} = useAppSelector(state => state.authReducer);

  return (
    <>
      <h1>{task.name}</h1>
      <p>{task.description}</p>
      <Grid container rowSpacing={{xs: 0, sm: 2, md: 3}} columnSpacing={{xs: 0, sm: 2, md: 3}}
            className="task-options">
        <Grid item sm={6} xs={12} className="task-option">
          <div className="option-label">
            <i className="icon" style={{backgroundImage: `url(${authorIcon})`}}></i>
            Patient
          </div>
          <div className="option">
            <Avatar className="avatar" sx={{width: 32, height: 32}}
                    src={`${process.env.REACT_APP_BACKEND_URL}/${task.user.avatar}`}></Avatar>
            <div>{task.user.name}</div>
          </div>
        </Grid>
        <Grid item sm={6} xs={12} className="task-option">
          <div className="option-label">
            <i className="icon" style={{backgroundImage: `url(${specialistIcon})`}}></i>
            Specialist
          </div>
          <div className="option">
            <Avatar className="avatar" sx={{width: 32, height: 32}}
                    src={`${process.env.REACT_APP_BACKEND_URL}/${task.specialist.avatar}`}></Avatar>
            <div>{task.specialist.name}</div>
          </div>
        </Grid>
        <Grid item sm={6} xs={12} className="task-option">
          <div className="option-label">
            <i className="icon" style={{backgroundImage: `url(${organizationIcon})`}}></i>
            Organization
          </div>
          <div className="option">
            <span>{task.organization.name}</span>
          </div>
        </Grid>
        <Grid item sm={6} xs={12} className="task-option">
          <div className="option-label">
            <i className="icon" style={{backgroundImage: `url(${calendarIcon})`}}></i>
            Due Time
          </div>
          <div className="option">
            <span>{new Date(task.dateDue).toDateString()}</span>
          </div>
        </Grid>
        <Grid item sm={6} xs={12} className="task-option">
          <div className="option-label">
            <i className="icon" style={{backgroundImage: `url(${statusIcon})`}}></i>
            Status
          </div>
          <div className="option">
            {task.status === TaskStatusesEnum.InProgress &&
                <span className="badge badge-progress">{task.status}</span>}
            {task.status === TaskStatusesEnum.Done &&
                <span className="badge badge-done">{task.status}</span>}
            {task.status === TaskStatusesEnum.Overdue &&
                <span className="badge badge-overdue">{task.status}</span>}
            {task.status === TaskStatusesEnum.Cancelled &&
                <span className="badge badge-undone">{task.status}</span>}
            {task.status === TaskStatusesEnum.Disapproved &&
                <span className="badge badge-undone">{task.status}</span>}
            {task.status === TaskStatusesEnum.Assigned &&
                <span className="badge badge-progress">{task.status}</span>}
            {task.status === TaskStatusesEnum.Approved &&
                <span className="badge badge-done">{task.status}</span>}
          </div>
        </Grid>
        <Grid item sm={6} xs={12} className="task-option">
          <div className="option-label">
            <i className="icon"><PaidOutlinedIcon sx={{width: 26, height: 26}}/></i>
            Reward
          </div>
          <div className="option">
            <span>{task.taskType.reward} {process.env.REACT_APP_TOKEN_CURRENCY}</span>
          </div>
        </Grid>
        <Grid item sm={6} xs={6}>
          <Link to={`/tasks/update/${task.id}`}>
            <MyButton>Update Task</MyButton>
          </Link>
        </Grid>
        <Grid item sm={6} xs={6}>
          {
            type === "specialist" &&
              <>
                {
                  task.user.allowed && <TaskReward task={task} user={task.user}/>
                }
              </>
          }
          {
            !task.user.allowed &&
              <p className="text-danger">
                  * This patient was not moderated yet!
              </p>
          }
          {
            !task.specialist.allowed &&
              <p className="text-danger">
                  * This specialist was not moderated yet!
              </p>
          }
        </Grid>
      </Grid>

    </>
  );
}

export default TaskViewWidget;
