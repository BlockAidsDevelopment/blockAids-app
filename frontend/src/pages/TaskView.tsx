import React, {FC} from "react";
import {Breadcrumbs, IBreadcrumb} from "../modules/breadcrumbs";
import {TasksList, TaskViewWidget} from "../modules/tasks";
import {useParams} from "react-router-dom";
import {tasksApi} from "../api/tasksApi";
import {Grid} from "@mui/material";
import {MedicalRecordsCreate, MedicalRecordsList} from "../modules/medicalRecords";
import {medicalRecordsApi} from "../api/medicalRecordsApi";
import MyModal from "../ui/MyModal";

const breadcrumbs: IBreadcrumb[] = [
  {
    name: 'Home',
    link: '/',
    active: false,
  },
  {
    name: 'Tasks',
    link: '/tasks',
    active: false,
  },
  {
    name: 'View Task',
    link: '/tasks/view',
    active: true,
  },
];

const TaskView: FC = () => {
  const {id} = useParams();
  const {data: task} = tasksApi.useFetchTaskByIdQuery(Number(id));
  const {data: medicalRecords} = medicalRecordsApi.useFetchAllByTaskIdQuery(Number(id));

  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs}/>
      <Grid container rowSpacing={{xs: 0, sm: 2, md: 3}} columnSpacing={{xs: 0, sm: 2, md: 3}}>
        <Grid item md={8} xs={12} style={{marginBottom: '25px'}}>
          {task &&
              <div className="tasks-area">
                  <div className="tasks-view-area">
                      <TaskViewWidget task={task}/>
                  </div>
              </div>
          }
        </Grid>
        <Grid item md={4} xs={12} style={{marginBottom: '25px'}}>
          <div className="tasks-area">
            <div className="task-create-area medical-records-area">
              <div className="medical-records-heading">
                <h4>Medical Records:</h4>
              </div>
              <MedicalRecordsList medicalRecords={medicalRecords}/>
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid item md={12} xs={12} style={{marginBottom: '25px'}}>
          <TasksList heading="Tasks"></TasksList>
      </Grid>
    </div>
  );
}

export default TaskView;