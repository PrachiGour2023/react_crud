import InputField from "./inputField";
import { userSchema } from "../constant/userSchema";

const FormBuilder = ({ formData, onChange }) => {
  return (
    <>
      {userSchema.map((field) => (
        <InputField
          key={field.name}
          label={field.label}
          placeholder={field.placeholder}
          type={field.type}
          name={field.name}
          value={formData[field.name] || ''}
          onChange={onChange}
          required={field.required}
          minLength={field.minLength}
          maxLength={field.maxLength}
          pattern={field.pattern}
          errorMessage={field.errorMessage}
        />
      ))}
    </>
  );
};

export default FormBuilder