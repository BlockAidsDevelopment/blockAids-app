import {FC, useState} from "react";
import MyButton from "../../../ui/MyButton";
import {IUser} from "../../../models/IUser";
import {ITask} from "../../../models/ITask";
import {TaskStatusesEnum} from "../enums/TaskStatusesEnum";
import {useAppSelector} from "../../../hooks/redux";
import Loading from "../../../components/Loading";

interface ITaskRewardProps {
  user: IUser;
  task: ITask;
}

const TaskReward: FC<ITaskRewardProps> = ({user, task}) => {
  const {type} = useAppSelector(state => state.authReducer);
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <>
      {
        loading &&
          <Loading/>
      }
      {
        type === 'specialist' && task.status === TaskStatusesEnum.Done &&
          <a href={`${process.env.REACT_APP_BLOCKCHAIN_URL}/reward/${task.id}`}>
              <MyButton>
                  Transfer Reward
              </MyButton>
          </a>
      }
    </>
  )
}

export default TaskReward;
