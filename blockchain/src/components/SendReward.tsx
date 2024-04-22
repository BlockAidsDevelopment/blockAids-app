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
import {red} from "@mui/material/colors";

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
  medicalRecords: IMedicalRecord[] | null | undefined;
}

const SendReward: FC<ISendReward> = ({task, medicalRecords}) => {
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
  const [medicalRecordsJSON, setMedicalRecordsJSON] = useState<any>();

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
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          json: medicalRecordsJSON,
          userId: task.user.accountId,
        })
      };
      const response = await fetch('http://localhost:4000/api/blockchain/store-json', requestOptions)
      const responseJson = await response.json();
      const arweaveLink = responseJson.mainJson.data.link

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

                  <div className="tasks-button-area">
                      <Button variant="contained" size={"large"} onClick={transfer}>Approve and send reward</Button>
                  </div>
              </div>
          </div>
      }
    </>
  )
}

export default SendReward;
