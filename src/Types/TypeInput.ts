declare global {
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
