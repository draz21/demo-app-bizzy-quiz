import React from 'react'
import { Text, GetPropDefTypes, textPropDefs } from "@radix-ui/themes"

interface TextProps extends GetPropDefTypes<typeof textPropDefs>{
    id: string,
    label: string,
}

const TextString: React.FC<TextProps> = ({ 
    id,
    label,
}) => {
    return (
        <Text id={id}>
            {label}
        </Text>
    )
}

export default TextString