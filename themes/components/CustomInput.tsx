import { FloatingLabel, Form } from "react-bootstrap";

interface CustomInputProps {
  ID: string;
  labelText: string;
  placeholder: string;
  icon?: string;
  type: string;
  inputIcon?: string;
  value?: string;
  customClass: string;
  errorText?: string;
  onChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void;
} 
export default function CustomInput(props: CustomInputProps) {
  return (
    <>
      <div className={props.customClass}>
        <FloatingLabel controlId={props.ID} label={props.labelText}>
          <Form.Control type={props.type} placeholder={props.placeholder} onChange={props.onChange}  value={props.value} />

          {props.inputIcon && props.inputIcon !== '' && (
            <div className={`input-icon  ${props.inputIcon}`}>{props.icon}</div>
          )}
        </FloatingLabel>
        {props.errorText && props.errorText !== '' && (
          <Form.Text muted>{props.errorText}</Form.Text>
        )}
      </div>

    </>
  );
}