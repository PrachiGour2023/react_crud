## Project Overview

This is a scalable React CRUD application built with Vite that implements a **schema-driven architecture**. The app manages user data efficiently with a centralized schema configuration that eliminates code duplication and makes adding new fields trivial.

### Current Implemented Fields
- First Name
- Last Name
- Email
- Phone Number

---

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm

### Installation

1. **Clone the repository:**
   git clone <repository-url>
   cd <project-folder>

2. **Install dependencies:**
   npm install

3. **Start the development server:**
   npm run dev
   The app will run at `http://localhost:5173` (Vite default).

4. **Build for production:**
   npm run build

---

## Architecture: Schema-Driven Design

### Why Schema-Driven?

Traditional CRUD apps require modifying multiple files when adding a new field:
- ❌ Form component (JSX)
- ❌ State initialization
- ❌ Validation rules
- ❌ Display components
- ❌ Form reset logic

**Our solution**: Define all fields once in a centralized schema, and the UI automatically adapts.

---

## Core Components

### 1. **User Schema** (`src/constant/userSchema.jsx`)

The single source of truth for all field definitions:

\`\`\`jsx
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
  // ... more fields
];
\`\`\`

**Field Properties:**
- `name`: Form field name (must match API response)
- `label`: Display label in the form
- `type`: HTML input type (text, email, tel, date, etc.)
- `placeholder`: Input placeholder text
- `required`: Boolean for required validation
- `minLength/maxLength`: String length constraints
- `pattern`: Regex pattern for validation
- `errorMessage`: Custom error message for failed validation

### 2. **Form Builder Component** (`src/components/formBuilder.jsx`)

Dynamically renders form inputs from the schema:

\`\`\`jsx
import FormBuilder from '../components/formBuilder'
import { userSchema } from '../constant/userSchema'

<Form>
  <FormBuilder formData={input} onChange={handleInputChange} />
  <Button type="submit">Submit</Button>
</Form>
\`\`\`

The `FormBuilder` automatically:
- ✅ Iterates through the schema
- ✅ Creates InputField components with all validation props
- ✅ Binds form data and change handlers
- ✅ No hard-coded fields needed

### 3. **Input Field Component** (`src/components/inputField.jsx`)

Reusable component that renders individual form fields with Bootstrap styling and validation feedback.

### 4. **User Page** (`src/pages/userPage.jsx`)

Main component that integrates:
- Using `FormBuilder` instead of individual InputFields
- `handleInputChange()` for centralized state management
- CRUD operations (Create, Read, Update, Delete)
- Form validation and error handling

---

## How to Add New Fields

### ✅ **One Step Only: Update the Schema**

Add a new field object to `src/constant/userSchema.jsx`:

#### Example 1: Add "Date of Birth"

\`\`\`jsx
{
  name: 'dateOfBirth',
  label: 'Date of Birth',
  type: 'date',
  placeholder: 'Select your date of birth',
  required: true,
  errorMessage: 'Please select a valid date of birth.'
}
\`\`\`

#### Example 2: Add "Address"

\`\`\`jsx
{
  name: 'address',
  label: 'Address',
  type: 'text',
  placeholder: 'Enter your address',
  required: false,
  maxLength: 100,
  errorMessage: 'Address should be at most 100 characters.'
}
\`\`\`

#### Example 3: Add "Department" (Select dropdown)

\`\`\`jsx
{
  name: 'department',
  label: 'Department',
  type: 'select',
  options: ['HR', 'Engineering', 'Sales', 'Marketing'],
  required: true,
  errorMessage: 'Please select a department.'
}
\`\`\`

**That's it!** The new field automatically appears in:
- ✅ Form (with validation)
- ✅ User card (display)
- ✅ Edit mode (pre-populated from API)
- ✅ Form reset (cleared after submission)

---

## File Structure

\`\`\`
src/
├── components/
│   ├── inputField.jsx          # Individual input field component
│   ├── formBuilder.jsx         # Dynamic form builder (NEW)
│   └── userCard.jsx            # User display card
├── constant/
│   └── userSchema.jsx          # Centralized schema (NEW)
├── pages/
│   └── userPage.jsx            # Main CRUD page (UPDATED)
├── services/
│   └── userApi.jsx             # API calls
├── App.jsx
├── App.css
├── index.css
└── main.jsx
\`\`\`

---

## Benefits of This Architecture

| Aspect | Before (Hard-Coded) | After (Schema-Driven) |
|--------|-------------------|----------------------|
| **Adding a Field** | Modify 5+ files | Edit 1 schema array |
| **Code Duplication** | High | Eliminated |
| **Maintainability** | Difficult | Easy |
| **Scalability** | Limited | Unlimited |
| **Time to Add Field** | 15-30 minutes | 2 minutes |
| **Risk of Bugs** | High | Very Low |
| **DRY Principle** | ❌ Violated | ✅ Followed |

---

## Validation Features

All validation is centralized in the schema:

- **Text Fields**: `minLength`, `maxLength`, `pattern` (regex)
- **Email Fields**: Automatic email format validation
- **Phone Fields**: Digits-only validation via pattern
- **Required Fields**: Enforced before submission
- **Custom Messages**: User-friendly error messages

Example validation:
\`\`\`jsx
{
  name: 'email',
  pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
  errorMessage: 'Please enter a valid email address.'
}
\`\`\`

---

## API Integration
In app used free MockApi plateform to perform crud operation instead of JSON-SERVER.It is easy to use and gives real time api endpoint to persist data.The schema automatically syncs with the API:

- **Create**: POST with all schema fields
- **Read**: Fetches and displays all users
- **Update**: PUT with updated schema fields
- **Delete**: Removes user from database

The API response structure must match the schema field names (e.g., `firstname`, `lastname`).

---
