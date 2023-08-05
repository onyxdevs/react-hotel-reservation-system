import React from 'react';

import styleClasses from './Button.module.scss';
import { CircularProgress } from '..';

type TypeButtonProps = {
    extraClasses?: string;
    inverse?: boolean;
    color?: 'primary' | 'danger' | 'success' | 'grey' | 'none';
    type: 'submit' | 'button' | 'reset';
    onClick: () => void;
    disabled?: boolean;
    loading?: boolean;
    children: React.ReactNode;
};

const Button: React.FC<TypeButtonProps> = (props: TypeButtonProps) => {
    const elClasses: [string] = [styleClasses.button];

    if (props.extraClasses) {
        elClasses.push(props.extraClasses);
    }

    if (props.inverse) {
        elClasses.push(styleClasses['button--inverse']);
    }

    const colorClass = {
        primary: styleClasses['button--primary'],
        danger: styleClasses['button--danger'],
        success: styleClasses['button--success'],
        grey: styleClasses['button--grey'],
        none: styleClasses['button--none']
    };

    if (props.color) {
        elClasses.push(colorClass[props.color]);
    } else {
        elClasses.push(colorClass['primary']);
    }

    if (props.loading) {
        elClasses.push(styleClasses['button--loading']);
    }

    return (
        <button className={elClasses.join(' ')} type={props.type} onClick={props.onClick} disabled={props.disabled}>
            {typeof props.loading !== 'undefined' && (
                <CircularProgress show={props.loading} extraClasses={styleClasses['button__spinner']} />
            )}
            {props.children}
        </button>
    );
};

export default Button;
