import { FieldError, UseFormRegister } from "react-hook-form";

export type FormData = {
    tscNumber: number;
    fullName: string;
    subjects: string;
    // email: string;
    // githubUrl: string;
    // yearsOfExperience: number;
    // password: string;
    // confirmPassword: string;
  };

  export type FormFieldProps = {
    type: string;
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<FormData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
  };
  

export type ValidFieldNames =
|"tscNumber"
|"fullName"
|"subjects"
//   | "email"
//   | "githubUrl"
//   | "yearsOfExperience"
//   | "password"
//   | "confirmPassword";