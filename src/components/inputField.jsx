import { Form } from 'react-bootstrap'

const InputField = ({ label, placeholder, type, value, name, onChange, required, minLength, maxLength, pattern, errorMessage }) => {
  return (
    <>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label className='text-start w-100'>{label}</Form.Label>
        <Form.Control
          className='w-100'
          type={type}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          pattern={pattern}
        />
        <Form.Control.Feedback type="valid">
          Looks good!
        </Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  )
}

export default InputField