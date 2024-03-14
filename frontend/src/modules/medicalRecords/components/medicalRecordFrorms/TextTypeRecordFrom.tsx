import {ChangeEvent, FC, FormEvent, useState} from "react";
import MyInput from "../../../../ui/MyInput";
import typeTaskIcon from "../../../../ui/assets/typeTaskIcon.svg";
import MyButton from "../../../../ui/MyButton";
import {IMedicalRecordIndex} from "../../../../models/IMedicalRecordIndex";
import {medicalRecordsApi} from "../../../../api/medicalRecordsApi";
import {IUser} from "../../../../models/IUser";
import {ISpecialist} from "../../../../models/ISpecialist";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {ITask} from "../../../../models/ITask";

interface ITextTypeRecordFromProps {
  medicalRecordIndex: IMedicalRecordIndex;
  task: ITask;
  user: IUser;
  specialist: ISpecialist;
}

const TextTypeRecordFrom: FC<ITextTypeRecordFromProps> = ({medicalRecordIndex, user, specialist, task}) => {
  const [value, setValue] = useState("");
  const [createMedicalRecord] = medicalRecordsApi.useCreateMutation();
  const [created, setCreated] = useState<boolean>(false);

  const handleValue = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();
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

  return (
    <form action="" onSubmit={handleForm} key={medicalRecordIndex.id}>
      {
        !created &&
          <div className="form-modal-flex">
              <div style={{width: "100%"}}>
                  <MyInput type="text"
                           name="name"
                           required={true}
                           label={`${medicalRecordIndex.name} (${medicalRecordIndex.unit})`}
                           icon={typeTaskIcon}
                           value={value}
                           onChange={handleValue}/>
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

export default TextTypeRecordFrom;