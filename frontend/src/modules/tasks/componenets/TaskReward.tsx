import {FC, useEffect, useState} from "react";
import MyButton from "../../../ui/MyButton";
import axios from "axios";
import {IUser} from "../../../models/IUser";
import {ITask} from "../../../models/ITask";
import {TaskStatusesEnum} from "../enums/TaskStatusesEnum";
import {tasksApi} from "../../../api/tasksApi";
import {useAppSelector} from "../../../hooks/redux";
import {setNotification} from "../services/notifications";
import {notificationsApi} from "../../../api/notificationsApi";
import Loading from "../../../components/Loading";

interface ITaskRewardProps {
  user: IUser;
  task: ITask;
}

const TaskReward: FC<ITaskRewardProps> = ({user, task}) => {
  const {type} = useAppSelector(state => state.authReducer);
  const [updateTask] = tasksApi.useUpdateTaskMutation();
  const [createNotification] = notificationsApi.useCreateNotificationMutation();

  const [provider, setProvider] = useState<undefined>(
    undefined
  );
  const [walletKey, setWalletKey] = useState<undefined>(
    undefined
  );

  const [loading, setLoading] = useState<boolean>(false)

  const getProvider = () => {
  };

  const transferTokenToRecipient = async () => {
    try {
      setLoading(true);
      const body = {
        recipientPublicKey: user.public_key,
        amount: Number(task.taskType.reward),
        token: `${process.env.REACT_APP_TOKEN_CURRENCY}`,
      }
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/blockchain/transfer`, body, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      updateTask({id: task.id, status: TaskStatusesEnum.Approved, pay_signature: response.data.signature});
      setNotification(task, 'approved', type, createNotification);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  const connectWallet = async () => {
  };

  const disconnectWallet = async () => {
  };

  useEffect(() => {
    const provider = getProvider();

    // @ts-ignore
    if (provider) setProvider(provider);
    else setProvider(undefined);
  }, []);

  return (
    <>
      {
        loading &&
          <Loading/>
      }
      {
        type === 'specialist' && task.status === TaskStatusesEnum.Done &&
          <>
              <MyButton onClick={connectWallet}>
                  Transfer Reward
              </MyButton>
          </>
      }
      {
        task.status === TaskStatusesEnum.Approved &&
          <div>
              <h3>Approved Task:</h3>
              <h4>Blockchain Signature: </h4>
              <a href={`https://solscan.io//tx/${task.pay_signature}`} target="_blank" rel="noreferrer">
                  <small style={{fontSize: '12px'}}>{task.pay_signature}</small>
              </a>
          </div>
      }
      {
        !provider && (
          <p>
            No provider found.
          </p>
        )
      }
    </>
  )
}

export default TaskReward;