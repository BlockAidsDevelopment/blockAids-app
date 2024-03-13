import {FC, useState} from "react";
import typeTaskIcon from "../../../../ui/assets/typeTaskIcon.svg";
import MyButton from "../../../../ui/MyButton";
import * as React from "react";
import {IMedicalRecordIndex} from "../../../../models/IMedicalRecordIndex";
import {MySelect} from "../../../../ui/MySelect/MySelect";
import {MedicalRecordsOptions} from "../../../../models/Mocks/MedicalRecordsOptions";

interface ISelectTypeRecordFromProps {
  medicalRecordIndex: IMedicalRecordIndex;
}

const SelectTypeRecordFrom: FC<ISelectTypeRecordFromProps> = ({medicalRecordIndex}) => {
  const [value, setValue] = useState("");
  const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

  const handleForm = () => {

  }

  return (
    <form action="" onSubmit={handleForm} key={medicalRecordIndex.id}>
      <div className="form-modal-flex">
        <div>
          <MySelect label={medicalRecordIndex.name}
                    defaultOption={`Select ${medicalRecordIndex.name}`}
                    onChange={handleValue}
                    options={MedicalRecordsOptions}
                    value=""
                    icon={typeTaskIcon}/>
        </div>
        <MyButton>Save</MyButton>
      </div>
    </form>
  );
}

export default SelectTypeRecordFrom;