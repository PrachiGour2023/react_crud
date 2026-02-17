export const userSchema = [
  {
    name: 'firstname',
    label: 'First Name',
    type: 'text',
    placeholder: 'Enter your first name',
    required: true,
    minLength: 3,
    maxLength: 20,
    pattern: '^[A-Za-z]+$',
    errorMessage: 'First name should be 3-20 characters long and contain only letters.'
  },
  {
    name: 'lastname',
    label: 'Last Name',
    type: 'text',
    placeholder: 'Enter your last name',
    required: true,
    minLength: 3,
    maxLength: 20,
    pattern: '^[A-Za-z]+$',
    errorMessage: 'Last name should be 3-20 characters long and contain only letters.'
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    required: true,
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    errorMessage: 'Please enter a valid email address.'
  },
  {
    name: 'phone',
    label: 'Phone Number',
    type: 'tel',
    placeholder: 'Enter your phone number',
    required: true,
    pattern: '^\\d{10}$',
    errorMessage: 'Phone number should be 10 digits long.'
  }
];