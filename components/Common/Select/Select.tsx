import React from 'react';
import { Select, GetPropDefTypes, selectTriggerPropDefs } from "@radix-ui/themes";

interface optionProps {
    value: string,
    label: string,
}
interface SelectProps extends GetPropDefTypes<typeof selectTriggerPropDefs>{
    id?: string,
    options: optionProps[],
    placeHolder?: string,
    defaultValue?: string,
    radius?: "none" | "small" | "medium" | "large" | "full" | undefined,
    triggerVariant?:  "classic" | "surface" | "soft" | "ghost" | undefined,
    contentVariant?: "soft" | "solid",
    onChange: (value: string) => void
}

const Selector: React.FC<SelectProps> = ({
    id,
    options,
    defaultValue,
    placeHolder,
    radius,
    triggerVariant,
    contentVariant,
    onChange
}) => {
    return (
        <Select.Root defaultValue={defaultValue} onValueChange={onChange}>
            <Select.Trigger id={id} placeholder={placeHolder} radius={radius} variant={triggerVariant}/>
            <Select.Content variant={contentVariant}>
                {
                    options.map((option: optionProps, idx: number) => (
                        <Select.Item key={idx} id={`${id}-items-${idx}`} value={option.value}>{option.label}</Select.Item>
                    ))
                }
            </Select.Content>
        </Select.Root>
    )
}

export default Selector