import { useCallback, useReducer } from 'react';

declare global {
    type TypeFormState = {
        inputs: TypeInputs;
        isValid: boolean;
    };
}

const formReducer = (state: TypeFormState, action: any) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;

            for (const inputId in state.inputs) {
                if (!state.inputs[inputId]) continue;

                if (inputId === action.inputId) {
                    // Current field
                    formIsValid = formIsValid && action.isValid;
                } else {
                    // Other fields
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }

            const newInput = {
                ...state.inputs[action.inputId],
                value: action.value,
                isValid: action.isValid
            };

            const newInputs = {
                ...state.inputs,
                [action.inputId]: newInput
            };

            // Check isTouched
            if (!state.inputs[action.inputId].isTouched) {
                newInput.isTouched = true;
            }

            return {
                ...state,
                inputs: newInputs,
                isValid: formIsValid
            };

        default:
            return state;
    }
};

const useForm = (
    initialInputs: TypeInputs = {},
    initialFormValidity: boolean = false
): [formState: TypeFormState, inputHandler: (id: string, value: string | number, isValid: boolean) => void] => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity
    });

    const inputHandler = useCallback((id: string, value: string | number, isValid: boolean) => {
        dispatch({
            type: 'INPUT_CHANGE',
            inputId: id,
            value,
            isValid: isValid
        });
    }, []);

    return [formState, inputHandler];
};

export default useForm;
