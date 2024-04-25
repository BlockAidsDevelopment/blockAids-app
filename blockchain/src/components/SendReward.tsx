import Button from "@mui/material/Button";
import {utils} from "near-api-js";
import useNearStore from "@/stories/useNearStore";
import {useSearchParams} from 'next/navigation'
import {FC, useEffect, useState} from "react";
import SuccessTransfer from "@/components/SuccessTransfer";
import {ITask} from "@/models/ITask";
import {IMedicalRecord} from "@/models/IMedicalRecord";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddTaskIcon from '@mui/icons-material/AddTask';
import Loader from "@/components/Loader";

const BOATLOAD_OF_GAS = utils.format.parseNearAmount("0.00000000003")!;

interface INearResponse {
  transactionHashes: string | null,
}

interface ISendReward {
  task: ITask;
  medicalRecords: IMedicalRecord[] | null | undefined;
}

const SendReward: FC<ISendReward> = ({task, medicalRecords}) => {
  const [nearResponse, setNearResponse] = useState<INearResponse>({transactionHashes: null});
  const {wallet, account} = useNearStore();
  const searchParams = useSearchParams();
  const [medicalRecordsJSON, setMedicalRecordsJSON] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (medicalRecords) {
      const recordsJson = medicalRecords.map(record => {
        return {
          id: record.id,
          name: record.medicalRecordIndex.name,
          value: record.value + " " + record.medicalRecordIndex.unit,
          taskName: record.task.name,
          taskLink: `${process.env.NEXT_PUBLIC_FRONT_URL}/tasks/view/${record.task.id}`,
          specialist: `${record.specialist.name} (${record.specialist.accountId})`,
          patient: `${record.user.name} (${record.user.accountId})`,
          createdAt: record.created_at,
        }
      })
      setMedicalRecordsJSON(JSON.stringify(recordsJson));
    }
  }, [medicalRecords])

  useEffect(() => {
    if (searchParams.get('transactionHashes')) {
      setNearResponse({
        transactionHashes: searchParams.get('transactionHashes'),
      })
    }
  }, [searchParams])

  const transfer = async () => {
    if (wallet) {
      setLoading(true);
      let arweaveLink = task.user.ipfs_link;
      if (JSON.stringify(medicalRecordsJSON) !== "[]") {
        const requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            json: medicalRecordsJSON,
            userId: task.user.accountId,
          })
        };
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blockchain/store-json`, requestOptions)
        const responseJson = await response.json();
        arweaveLink = responseJson.mainJson.data.link
        console.log(arweaveLink)
      }
      const {formatNearAmount} = utils.format;
      const formattedAmount = formatNearAmount(task.taskType.reward.toString(), 9);
      const attachedDeposit = "1";

      await wallet.signAndSendTransaction({
        signerId: account?.accountId!,
        actions: [
          {
            type: "FunctionCall",
            params: {
              methodName: "ft_transfer",
              args: {
                "amount": task.taskType.reward.toString() + "000000000",
                "receiver_id": task.user.accountId,
                "msg": arweaveLink
              },
              gas: BOATLOAD_OF_GAS,
              deposit: attachedDeposit!,
            },
          },
        ],
      })
      setLoading(false);
    }
  }

  const formatData = (date: string) => {
    return new Date(date).toDateString();
  }

  return (
    <>
      {
        loading && <Loader/>
      }
      {
        nearResponse.transactionHashes &&
          <SuccessTransfer transactionHashes={nearResponse.transactionHashes} task={task}/>
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
                      <b>Specialist/Patient: </b><span> {task.specialist.name}/{task.user.name}</span>
                  </div>
                  <div className="tasks-item">
                      <b>Date Due: </b><span> {formatData(task.dateDue)} </span>
                  </div>
                  <div className="tasks-item">
                      <b>Account Id: </b><span> {task.user.accountId}</span>
                  </div>
                  <div className="tasks-item">
                      <b>Reward: </b><span> {task.taskType.reward} AID</span>
                  </div>
                {
                  medicalRecords && medicalRecords?.length > 0 &&
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <h3> Medical Records:</h3>
                        </AccordionSummary>
                        <AccordionDetails>
                          {
                            medicalRecords?.map((record, index) => (
                              <p key={index}>
                                {
                                  record.medicalRecordIndex.name.length > 15 ?
                                    <b>
                                      {record.medicalRecordIndex.name.replace(/\b(\S{1,4})\S*/g, '$1').replace(/ /g, '. ')}:
                                    </b> :
                                    <span>
                                    {record.medicalRecordIndex.name}:
                                  </span>
                                } {record.value}</p>
                            ))
                          }

                        </AccordionDetails>
                    </Accordion>
                }
                  <div className="tasks-button-area">
                      <Button variant="contained" size={"large"} onClick={transfer} className="button-main">
                          <AddTaskIcon/>
                          Approve and send reward
                      </Button>
                  </div>
              </div>
          </div>
      }
    </>
  )
}
export default SendReward;
