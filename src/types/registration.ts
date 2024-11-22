export type UserFormData = {
    firstName: string
    lastName: string
    email: string
    password: string
    education: string
    skills: string
  }
  
  export type AdminFormData = {
    firstName: string
    lastName: string
    email: string
    password: string
    adminCode: string
  }
  
  export interface RegistrationFormProps<T> {
    onSubmit?: (data: T) => Promise<void>;
  }