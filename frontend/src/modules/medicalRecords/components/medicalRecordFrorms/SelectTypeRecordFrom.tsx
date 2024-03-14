import {FC, FormEvent, useState} from "react";
import typeTaskIcon from "../../../../ui/assets/typeTaskIcon.svg";
import MyButton from "../../../../ui/MyButton";
import * as React from "react";
import {IMedicalRecordIndex} from "../../../../models/IMedicalRecordIndex";
import {MySelect} from "../../../../ui/MySelect/MySelect";
import {MedicalRecordsOptions} from "../../../../models/Mocks/MedicalRecordsOptions";
import {IUser} from "../../../../models/IUser";
import {ISpecialist} from "../../../../models/ISpecialist";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {medicalRecordsApi} from "../../../../api/medicalRecordsApi";
import {ITask} from "../../../../models/ITask";

interface ISelectTypeRecordFromProps {
  medicalRecordIndex: IMedicalRecordIndex;
  task: ITask;
  user: IUser;
  specialist: ISpecialist;
}

const SelectTypeRecordFrom: FC<ISelectTypeRecordFromProps> = ({medicalRecordIndex, user, specialist, task}) => {
  const [value, setValue] = useState("");
  const [createMedicalRecord] = medicalRecordsApi.useCreateMutation();
  const [created, setCreated] = useState<boolean>(false);
  const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  };

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();
    if (value) {
      try {
        await createMedicalRecord({
          value: value,
          taskId: task.id.toString(),
          medicalRecordIndexId: medicalRecordIndex.id.toString(),
          userId: user.id.toString(),
          specialistId: specialist.id.toString(),
        }).unwrap();
        setValue("");
        setCreated(true);
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <form action="" onSubmit={handleForm} key={medicalRecordIndex.id}>
      {
        !created &&
          <div className="form-modal-flex">
              <div style={{width: "100%"}}>
                  <MySelect label={medicalRecordIndex.name}
                            defaultOption={`Select ${medicalRecordIndex.name}`}
                            onChange={handleValue}
                            options={MedicalRecordsOptions}
                            value={value}
                            icon={typeTaskIcon}/>
              </div>
              <MyButton onClick={handleForm}>Save</MyButton>
          </div>
      }
      {
        created &&
          <div className="success-created-medical-record">
              <CheckCircleOutlineIcon/> Success! The medical record for {medicalRecordIndex.name} was successfully
              created.
          </div>
      }
    </form>
  );
}

export default SelectTypeRecordFrom;