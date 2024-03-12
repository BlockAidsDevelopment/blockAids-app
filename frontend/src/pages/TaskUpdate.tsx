import React, {FC, useEffect, useState} from "react";
import {Breadcrumbs, IBreadcrumb} from "../modules/breadcrumbs";
import {TaskUpdateWidget} from "../modules/tasks";
import {Grid} from "@mui/material";
import {useParams} from "react-router-dom";
import {tasksApi} from "../api/tasksApi";
import {MedicalRecordsUpdateList} from "../modules/medicalRecords";
import {medicalRecordsApi} from "../api/medicalRecordsApi";

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
    name: 'Update Task',
    link: '/tasks/update',
    active: true,
  },
];

const TaskUpdate: FC = () => {
  const {id} = useParams();
  const {data: task} = tasksApi.useFetchTaskByIdQuery(Number(id));
  const {data: medicalRecords} = medicalRecordsApi.useFetchAllByTaskTypeIdQuery(Number(id));
  const [taskTypeId, setTaskTypeId] = useState<number>();

  useEffect(() => {
    if (task) {
      setTaskTypeId(task.taskType.id);
    }
  }, [task]);

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs}/>
      <Grid container rowSpacing={{xs: 0, sm: 2, md: 3}} columnSpacing={{xs: 0, sm: 2, md: 3}}>
        <Grid item md={8} xs={12} style={{marginBottom: '25px'}}>
          <TaskUpdateWidget task={task}/>
        </Grid>
        <Grid item md={4} xs={12} style={{marginBottom: '25px'}}>
          <MedicalRecordsUpdateList medicalRecords={medicalRecords}/>
        </Grid>
      </Grid>
    </>
  );
}

export default TaskUpdate;