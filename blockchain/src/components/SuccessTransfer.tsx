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
        <a href="http://localhost:3001">
          <Button variant={"contained"} size={"large"}> Go back</Button>
        </a>
      </div>
  )
}

export default SuccessTransfer;
