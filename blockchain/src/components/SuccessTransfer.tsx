import {FC, useEffect} from "react";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {ITask} from "@/models/ITask";
interface ISuccessTransfer {
  transactionHashes: string | null,
  task: ITask,
}

const SuccessTransfer:FC<ISuccessTransfer> = ({transactionHashes, task}) => {
  useEffect(() => {
    sendTransactionHash();
  }, []);

  const sendTransactionHash = async () => {
    const finalResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${task.id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        pay_signature: transactionHashes,
        status: "Approved",
      })
    });
    const finalResponseJson = await finalResponse.json();
    console.log(finalResponseJson);
  }

  return (
      <div className="rewards-section">
        <h2>Success!</h2>
        <p>Transaction was sent!</p>
        <p><a href={`https://nearblocks.io/txns/${transactionHashes}`} target="_blank" className="main-link">View transaction details</a></p>
        <br/><br/>
        <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}`}>
          <Button variant={"contained"} size={"large"} className="button-main-min">
            <ArrowBackIosIcon/>
            Go back</Button>
        </a>
      </div>
  )
}

export default SuccessTransfer;
