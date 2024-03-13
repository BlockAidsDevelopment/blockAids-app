import {FC, useState} from "react";
import * as React from "react";
import MyInput from "../../../../ui/MyInput";
import typeTaskIcon from "../../../../ui/assets/typeTaskIcon.svg";
import MyButton from "../../../../ui/MyButton";
import {IMedicalRecordIndex} from "../../../../models/IMedicalRecordIndex";

interface ITextTypeRecordFromProps {
  medicalRecordIndex: IMedicalRecordIndex;
}

const NumberTypeRecordFrom:FC<ITextTypeRecordFromProps> = ({medicalRecordIndex}) => {
  const [value, setValue] = useState("");
  const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

  const handleForm = () => {

  }

  return (
    <form action="" onSubmit={handleForm} key={medicalRecordIndex.id}>
      <div className="form-modal-flex">
        <div>
          <MyInput type="number"
                   name="name"
                   required={true}
                   label={`${medicalRecordIndex.name} (${medicalRecordIndex.unit})`}
                   icon={typeTaskIcon}
                   value={value}
                   onChange={handleValue}/>
        </div>
        <MyButton>Save</MyButton>
      </div>
    </form>
  );
}

export default NumberTypeRecordFrom;