declare global {
    type TypeInputOnChange = (id: string, value: any, validity: boolean) => void;

    type TypeInput = {
        isValid: boolean;
        isTouched: boolean;
        value: string;
    };

    type TypeInputs = {
        [fieldName: string]: TypeInput;
    };
}

export {};
