declare global {
    type TypeStep = {
        index: number;
        isValid: boolean;
        inputs: {
            [inputId: string]: TypeInput;
        };
    };
}

export {};
