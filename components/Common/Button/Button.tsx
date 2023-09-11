import React from 'react';
import { Button, buttonPropDefs, GetPropDefTypes } from "@radix-ui/themes";

interface ButtonProps extends GetPropDefTypes<typeof buttonPropDefs> {
  id?: string,
  icon?: React.ReactNode,
  label: string,
  onClick: () => void,
  disabled?: boolean,
}

const CustomButton: React.FC<ButtonProps> = ({ 
  id,
  icon,
  label,
  onClick,
  disabled,
  ...props
 }) => {
  return (
    <Button disabled={disabled} type='button' onClick={onClick} {...props}>
        {icon && icon}
        {label}
    </Button>
  )
}

export default CustomButton