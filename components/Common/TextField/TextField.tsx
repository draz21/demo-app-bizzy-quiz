import React from 'react'
import { TextField, GetPropDefTypes, textFieldPropDefs } from '@radix-ui/themes';

interface TextFieldProps extends GetPropDefTypes<typeof textFieldPropDefs>{
  id?: string,
  icon?: React.ReactNode,
  type?: "text" | "number",
  placeHolder?: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CustomTextField: React.FC<TextFieldProps> = ({ 
  id,
  icon,
  onChange,
  type = 'text',
  placeHolder,
  ...props
}) => {
  return (
    <TextField.Root>
      {
        icon && (
            <TextField.Slot>
                {icon}
            </TextField.Slot>
        )
      }
      <TextField.Input type={type} placeholder={placeHolder} onChange={onChange} id={id} {...props}/>
    </TextField.Root>
  )
}

export default CustomTextField