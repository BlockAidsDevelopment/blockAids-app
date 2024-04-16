import {FC} from "react";
import Button from "@mui/material/Button";

interface ISuccessTransfer {
  transactionHashes: string | null
}

const SuccessTransfer:FC<ISuccessTransfer> = ({transactionHashes}) => {
  return (
      <div className="rewards-section">
        <h2>Success!</h2>
        <p>Transaction was sent!</p>
        <p>{transactionHashes}</p> <br/><br/>
        <Button variant={"contained"} size={"large"}> Go home</Button>
      </div>
  )
}

export default SuccessTransfer;
