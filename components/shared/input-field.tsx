import React from "react";
import { FormControl, FormDescription, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";

type InputFieldProps = React.ComponentProps<typeof Input> & {
  description?: string;
  label?: string
};

const InputField = ({ description, label, ...inputProps }: InputFieldProps) => {
  return (
    <FormItem>
      {label && (<Label>{label}</Label>)}
      <FormControl>
        <Input {...inputProps} />
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
};

export default InputField;
