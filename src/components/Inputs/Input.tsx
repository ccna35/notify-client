import { UseFormRegisterReturn } from "react-hook-form";

import { cn } from "../../utils/utils";

// type InputProps = {
//   register?: UseFormRegisterReturn;
//   placeholder: string;
//   type: string;
//   id?: string;
//   classNames?: string;
// };

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn;
  classNames?: string;
}

export default function Input({
  register,
  placeholder,
  type,
  id,
  classNames,
  ...rest
}: IInputProps) {
  return (
    <input
      placeholder={placeholder}
      type={type}
      id={id}
      className={cn(
        "border p-2 block w-full rounded-md border-gray-400 bg-white shadow-sm sm:text-sm dark:bg-slate-900 dark:text-slate-200 dark:border-gray-600",
        classNames
      )}
      {...register}
      {...rest}
    />
  );
}
