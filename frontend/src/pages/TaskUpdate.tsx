import React, {FC, useEffect, useState} from "react";
import {Breadcrumbs, IBreadcrumb} from "../modules/breadcrumbs";
import {TaskUpdateWidget} from "../modules/tasks";
import {Grid} from "@mui/material";
import {useParams} from "react-router-dom";
import {tasksApi} from "../api/tasksApi";
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
    name: 'Update Task',
    link: '/tasks/update',
    active: true,
  },
];

const TaskUpdate: FC = () => {
  const {id} = useParams();
  const {data: task} = tasksApi.useFetchTaskByIdQuery(Number(id));
  const {data: medicalRecords} = medicalRecordsApi.useFetchAllByTaskIdQuery(Number(id));
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
        <Grid item md={8} xs={12}>
          <TaskUpdateWidget task={task}/>
        </Grid>
        <Grid item md={4} xs={12} style={{marginBottom: '25px'}}>
          {
            taskTypeId &&
              <div className="tasks-area">
                  <div className="task-create-area medical-records-area">
                      <div className="medical-records-heading">
                          <h4>Medical Records:</h4>
                        {
                          task &&
                            <MyModal title="Add new medical record" btnTitle="Add new record"
                                     btnIcon="/images/icons/add-icon.svg">
                                <MedicalRecordsCreate task={task}/>
                            </MyModal>
                        }
                      </div>
                      <MedicalRecordsList medicalRecords={medicalRecords}/>
                  </div>
              </div>
          }
        </Grid>
      </Grid>
    </>
  )
    ;
}

export default TaskUpdate;