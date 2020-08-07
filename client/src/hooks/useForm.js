// write your custom hook here to control your checkout form
import { useState } from 'react'

export const useForm = (initialValue) => {
    const [values, setValue] = useState(initialValue);

    const handleChanges = e => {
        const { name, value } = e.target

        setValue({
            ...values,
            [name]: value,
        });
    }

    return [values, handleChanges];

}