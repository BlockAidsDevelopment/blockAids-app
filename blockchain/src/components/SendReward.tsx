import Button from "@mui/material/Button";
import {utils} from "near-api-js";
import useNearStore from "@/stories/useNearStore";
import {useSearchParams} from 'next/navigation'
import {FC, useEffect, useState} from "react";
import SuccessTransfer from "@/components/SuccessTransfer";
import {ITask} from "@/models/ITask";

const BOATLOAD_OF_GAS = utils.format.parseNearAmount("0.00000000003")!;

interface INearResponse {
  account_id: string | null,
  public_key: string | null,
  all_keys: string | null,
  errorCode: string | null,
  errorMessage: string | null,
  transactionHashes: string | null,
}

interface ISendReward {
  task: ITask;
}

const SendReward: FC<ISendReward> = ({task}) => {
  const [nearResponse, setNearResponse] = useState<INearResponse>({
    account_id: null,
    public_key: null,
    all_keys: null,
    errorCode: null,
    errorMessage: null,
    transactionHashes: null,
  });
  const {wallet, account} = useNearStore();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('transactionHashes')) {
      setNearResponse({
        account_id: searchParams.get('account_id'),
        public_key: searchParams.get('public_key'),
        all_keys: searchParams.get('all_keys'),
        errorCode: searchParams.get('errorCode'),
        errorMessage: searchParams.get('errorMessage'),
        transactionHashes: searchParams.get('transactionHashes'),
      })
    }
  }, [searchParams])

  const transfer = async () => {
    if (wallet) {
      const {formatNearAmount} = utils.format;
      const formattedAmount = formatNearAmount("1000000000000000000000000", 9);
      const attachedDeposit = "1";
      const attachedDeposit2 = formatNearAmount("1000000000000000000", 9);

      const res = await wallet.signAndSendTransaction({
        signerId: account?.accountId!,
        actions: [
          {
            type: "FunctionCall",
            params: {
              methodName: "ft_transfer",
              args: {
                "amount": "190000000000",
                "receiver_id": "consumer_ba.testnet",
                "memo": "Simple transfer",
                "msg": "Simple message"
              },
              gas: BOATLOAD_OF_GAS,
              deposit: attachedDeposit!,
            },
          },
        ],
      })
    }
  }


  const formatData = (date: string) => {
    return new Date(date).toDateString();
  }
  return (
    <>
      {
        nearResponse.transactionHashes && <SuccessTransfer transactionHashes={nearResponse.transactionHashes}/>
      }
      {
        !nearResponse.transactionHashes && <div className="rewards-section">
              <h2>Task Details:</h2>
              <div className="tasks-list">
                  <div className="tasks-item">
                      <b>Task name: </b><span> {task.name}</span>
                  </div>
                  <div className="tasks-item">
                      <b>Task type: </b><span> {task.taskType.name}</span>
                  </div>
                  <div className="tasks-item">
                      <b>Organization: </b><span> {task.organization.name}</span>
                  </div>
                  <div className="tasks-item">
                      <b>Specialist: </b><span> {task.specialist.name}</span>
                  </div>
                  <div className="tasks-item">
                      <b>Patient: </b><span> {task.user.name}</span>
                  </div>
                  <div className="tasks-item">
                      <b>Date Due: </b><span> {formatData(task.dateDue)} </span>
                  </div>
                  <div className="tasks-item">
                      <b>Reward: </b><span> {task.taskType.reward} AID</span>
                  </div>
                  <div className="tasks-button-area">
                      <Button variant="contained" size={"large"} onClick={transfer}>Approve and send Aids</Button>
                  </div>
              </div>
          </div>
      }
    </>
  )
}

export default SendReward;
