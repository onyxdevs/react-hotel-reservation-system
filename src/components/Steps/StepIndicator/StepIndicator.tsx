import React from 'react';

import styleClasses from './StepIndicator.module.scss';
import { getStoredValue } from '../../../lib/scripts/utils';

type TypeStepIndicatorProps = {
    imgUrl: string;
    title: string;
    index: number;
    stepChangeHandler: (stepIndex: number, formState: TypeFormState, targetStep: number) => void;
};

const StepIndicator: React.FC<TypeStepIndicatorProps> = (props: TypeStepIndicatorProps) => {
    const steps = getStoredValue<TypeStepsState>('steps');

    const isActive = steps ? steps.currentStep === props.index : props.index === 0;
    const isCompleted = steps ? steps.steps[props.index].status === 'completed' : false;

    const clickHandler = () => {
        if (steps && steps.currentStep === 3) return;
        if (!isActive && isCompleted && steps) {
            props.stepChangeHandler(steps.currentStep, { isValid: true, inputs: {} }, props.index);
        }
    };

    const elClasses: [string] = [styleClasses.steps__item];

    if (isActive || isCompleted) {
        elClasses.push(styleClasses['steps__item--active']);
    }

    return (
        <button className={elClasses.join(' ')} type="button" onClick={clickHandler}>
            <div className={styleClasses['steps__img-wrapper']}>
                <img src={props.imgUrl} alt={props.title} className={styleClasses.steps__img} />
            </div>
            <h3 className={styleClasses.steps__title}>{props.title}</h3>
        </button>
    );
};

export default StepIndicator;
