import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'

const types = {
    INPUT: 'input',
    SELECT: 'select',
    TEXTAREA: 'textarea'
}


const CommonForm = ({ formControls, formData, setFormData, onSubmit, buttonText, isBtnDisabled }) => {
    
    function renderInputsByComponentType(getControlItem) {
        let element = null;
        const value = formData[getControlItem.name] || '';
        switch (getControlItem.componentType) {
            case types.INPUT:
                element = (
                    <Input
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        type={getControlItem.type}
                        value={value}
                        onChange={event => setFormData({
                            ...formData,
                            [getControlItem.name]: event.target.value
                        })}
                    />
                );
                break;

            case types.SELECT:
                element = (
                    <Select value={value} onValueChange={(value) => setFormData({
                        ...formData,
                        [getControlItem.name]: value
                    })}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={getControlItem.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                getControlItem.options &&
                                    getControlItem.options.length > 0
                                    ? getControlItem.options.map((optionItem) => (
                                        <SelectItem
                                            key={optionItem.id}
                                            value={optionItem.id}
                                        >
                                            {optionItem.label}
                                        </SelectItem>
                                    ))
                                    : null}
                        </SelectContent>
                    </Select>
                );
                break;


            case types.TEXTAREA:
                element = (
                    <Textarea
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.id}
                        value={value}
                        onChange={event => setFormData({
                            ...formData,
                            [getControlItem.name]: event.target.value
                        })}
                    />
                );
                break;

            default:
                element = (
                    <Input
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        type={getControlItem.type}
                        onChange={event => setFormData({
                            ...formData,
                            [getControlItem.name]: event.target.value
                        })}
                    />
                );
        }

        return element;
    }


    return (
        <form onSubmit={onSubmit}>
            <div className='flex flex-col gap-3'>
                {formControls.map((controlItem) => (
                    <div key={controlItem.name} className='grid w-full gap-1.5'>
                        <Label className="mb-1">{controlItem.label}</Label>
                        {
                            renderInputsByComponentType(controlItem)
                        }
                    </div>
                ))}
            </div>
            <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full"> {buttonText || 'Submit'} </Button>
        </form>
    )
}

export default CommonForm