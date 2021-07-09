import React, { ChangeEvent, memo } from 'react';

import { validator, logger, compareProps } from 'lib/scripts/utils';

import inputClasses from './TextField.module.scss';
import formClasses from '../Form.module.scss';

type TypeTextFieldProps = {
    id: string;
    onChange: (id: string, value: any, validity: boolean) => void;
    value?: string;
    validity: boolean;
    validators?: TypeValidator[];
    isTouched?: boolean;
    type: 'text' | 'date' | 'number' | 'tel' | 'email' | 'password' | 'textarea';
    placeholder?: string;
    autocomplete?: string;
    label?: string;
    validationMessage?: string;
    disabled?: boolean;
    disabledMessage?: string;
};

const TextField = React.forwardRef<HTMLInputElement, TypeTextFieldProps>(
    (
        {
            id,
            onChange,
            value,
            validity,
            validators,
            isTouched,
            type,
            placeholder,
            autocomplete,
            label,
            validationMessage,
            disabled,
            disabledMessage
        }: TypeTextFieldProps,
        ref
    ) => {
        logger.debug('[TextField.ts]', id);

        const changeHandler = (event: ChangeEvent) => {
            const value = (event.target as HTMLInputElement).value;
            const isValid = validator(value, validators);
            onChange(id, value, isValid);
        };

        const wrapperClasses = [formClasses['form__element'], inputClasses['input'], inputClasses['input--simple']];
        if (validity === false && isTouched) wrapperClasses.push(inputClasses['invalid']);
        if (value) wrapperClasses.push(inputClasses['has-value']);
        let labelClasses = [formClasses['form__label']];

        const additionalAttrs: any = {};
        if (typeof disabled !== 'undefined' && disabled) {
            additionalAttrs['disabled'] = true;
        }
        if (typeof ref !== 'undefined' && ref) {
            additionalAttrs['ref'] = ref;
        }

        return (
            <div className={wrapperClasses.join(' ')}>
                {label && (
                    <label className={labelClasses.join(' ')} htmlFor={id}>
                        {label}
                    </label>
                )}

                <div className={inputClasses['input__inner-wrapper']}>
                    {type === 'textarea' ? (
                        <textarea
                            id={id}
                            name={id}
                            className={inputClasses['input__field']}
                            rows={3}
                            onChange={changeHandler}
                            value={value}
                            {...additionalAttrs}
                        />
                    ) : (
                        <input
                            id={id}
                            name={id}
                            className={inputClasses['input__field']}
                            type={type}
                            placeholder={placeholder}
                            autoComplete={autocomplete}
                            onChange={changeHandler}
                            value={value}
                            {...additionalAttrs}
                        />
                    )}
                </div>

                <div className={formClasses['form__info']}>
                    <div className={formClasses['form__info__content']}>
                        {validity === false && isTouched && validationMessage && (
                            <p className={formClasses['form__info__invalid-text']}>{validationMessage}</p>
                        )}
                        {additionalAttrs['disabled'] === true && (
                            <p className={formClasses['form__info__warning-text']}>{disabledMessage}</p>
                        )}
                    </div>
                </div>
            </div>
        );
    }
);

/**
 * Prevent re-rendering all the inputs when one of them changes!
 * Because the form hook is producing a new state immutably,
 * so the prevProps and nextProps cannot be equal even if they haven't changed!!
 */
function areEqual(prevProps: TypeTextFieldProps, nextProps: TypeTextFieldProps) {
    const compareKeys = ['value', 'validity', 'validators', 'isTouched', 'disabled'];
    const areEqual = compareProps<TypeTextFieldProps>(prevProps, nextProps, compareKeys);
    return areEqual;
}

export default memo(TextField, areEqual);
