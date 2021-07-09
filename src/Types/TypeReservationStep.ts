declare global {
    type TypeReservationStep = {
        stepChangeHandler: (stepIndex: number, formState: TypeFormState, targetStep: number) => void;
    };
}

export {};
