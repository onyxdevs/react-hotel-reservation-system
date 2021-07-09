import React, { memo } from 'react';
import ReactSelect from 'react-select';
import _ from 'lodash';

import { validator, logger } from 'lib/scripts/utils';

import './Select.scss';
import formClasses from '../Form.module.scss';

/**
 * Create option from a value
 *
 * @param {string} value
 * @param {object[]} secondObj
 */
const createOption = (value: any, options: any) => {
    if (!Array.isArray(options)) {
        return null;
    }

    // One value selection
    // Some values are 0 thats why we are checking the falsy ones
    if (!Array.isArray(value) && (value || value === 0)) {
        const valueObj = options.reduce((obj, option) => (option.value === value ? option : obj), {});
        return valueObj;
    }

    if (Array.isArray(value) && value.length > 0) {
        // isMulti
        // Find selected default value's index
        const valuesObj = value.map((value) => {
            const valueObj = options.reduce((obj, option) => (option.value === value ? option : obj), {});
            return valueObj;
        });
        return valuesObj;
    }

    return null;
};

declare global {
    type TypeOption = {
        label: string;
        value: string;
    };
}

type TypeSelectProps = {
    options?: TypeOption[];
    id: string;
    label?: string;
    onChange: (id: string, value: any, validity: boolean) => void;
    value?: string | number | [];
    validity: boolean;
    validators?: TypeValidator[];
    isTouched?: boolean;
    validationMessage?: string;
};

// @bug react-select is preventing submit on pressing enter, which is a bug in react-select (https://github.com/JedWatson/react-select/issues/2798)
const Select: React.FC<TypeSelectProps> = ({
    options,
    id,
    label,
    onChange,
    value,
    validity,
    validators,
    isTouched,
    validationMessage,
    ...rest
}: TypeSelectProps) => {
    logger.debug('[Select.ts]', id);

    const handleChange = (valueObj: { value: any }) => {
        let value = null;

        if (valueObj !== null) {
            value = Array.isArray(valueObj) ? valueObj.map((value) => value.value) : valueObj.value;
        }

        const isValid = validator(value, validators);
        onChange(id, value, isValid);
    };

    const wrapperClasses = ['select'];
    if (validity === false && isTouched) wrapperClasses.push('select--invalid');

    return (
        <div className={wrapperClasses.join(' ')}>
            {label && (
                <label htmlFor={id} className={formClasses['form__label']}>
                    {label}
                </label>
            )}
            <ReactSelect
                options={options}
                inputId={id}
                instanceId={id}
                name={id}
                classNamePrefix="select"
                onChange={handleChange}
                value={createOption(value, options)}
                {...rest}
            />
            <div className={formClasses['form__info']}>
                <div className={formClasses['form__info__content']}>
                    {validity === false && isTouched && !!validationMessage && (
                        <p className={formClasses['form__info__invalid-text']}>{validationMessage}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

/**
 * Prevent re-rendering all the inputs when one of them changes!
 * Because the form hook is producing a new state immutably,
 * so the prevProps and nextProps cannot be equal even if they haven't changed!!
 */
function areEqual(prevProps: TypeSelectProps, nextProps: TypeSelectProps) {
    // const compareKeys = ['options', 'value', 'validity', 'validators', 'isTouched'];
    const areEqual = _.isEqual(prevProps, nextProps);
    return areEqual;
}

export default memo(Select, areEqual);
