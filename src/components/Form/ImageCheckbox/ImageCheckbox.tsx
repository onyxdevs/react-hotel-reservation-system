import React, { ChangeEvent, memo } from 'react';

import { validator, logger, compareProps } from '../../../lib/scripts/utils';

import checkboxClasses from './ImageCheckbox.module.scss';
import formClasses from '../Form.module.scss';

type TypeOption = {
    id: string;
    label: string;
    meta: React.ReactNode;
    imgUrl: string;
};

type TypeImageCheckboxProps = {
    id: string;
    onChange: TypeInputOnChange;
    value?: string;
    validity?: boolean;
    validators?: TypeValidator[];
    isTouched?: boolean;
    label?: string;
    validationMessage?: string;
    options: TypeOption[];
};

const ImageCheckbox: React.FC<TypeImageCheckboxProps> = ({
    id,
    onChange,
    value,
    validity,
    validators,
    isTouched,
    label,
    validationMessage,
    options
}: TypeImageCheckboxProps) => {
    logger.debug('[ImageCheckbox.ts]');

    const changeHandler = (event: ChangeEvent) => {
        const value = (event.target as HTMLInputElement).value;
        const isValid = validator(value, validators);
        onChange(id, value, isValid);
    };

    const wrapperClasses = [formClasses['form__element']];
    if (validity === false && isTouched) wrapperClasses.push(checkboxClasses['invalid']);
    wrapperClasses.push(checkboxClasses['image-checkboxes']);
    if (!label) wrapperClasses.push(checkboxClasses['checkbox--no-label']);

    return (
        <>
            <div className={wrapperClasses.join(' ')}>
                <h4 className={formClasses['form__label']}>{label}</h4>
                <div className={checkboxClasses['image-checkboxes__inner']}>
                    {options.length > 0 &&
                        options.map((option: TypeOption, index) => (
                            <div className={checkboxClasses['image-checkbox']} key={index}>
                                <input
                                    type="radio"
                                    id={option.id}
                                    name={id}
                                    className={checkboxClasses['image-checkbox__field']}
                                    onChange={changeHandler}
                                    value={option.id}
                                    checked={option.id === value}
                                />
                                <label htmlFor={option.id} className={checkboxClasses['image-checkbox__label']}>
                                    <h5 className={checkboxClasses['image-checkbox__label__title']}>{option.label}</h5>
                                    {option.imgUrl && (
                                        <div className={checkboxClasses['image-checkbox__label__img-wrapper']}>
                                            <img
                                                src={option.imgUrl}
                                                alt={option.label}
                                                className={checkboxClasses['image-checkbox__label__img']}
                                            />
                                        </div>
                                    )}
                                    {option.meta && (
                                        <p className={checkboxClasses['image-checkbox__label__meta']}>{option.meta}</p>
                                    )}
                                </label>
                            </div>
                        ))}
                </div>

                <div className={formClasses['form__info']}>
                    <div className={formClasses['form__info__content']}>
                        {validity === false && isTouched && !!validationMessage && (
                            <p className={formClasses['form__info__invalid-text']}>
                                {!!validationMessage && validationMessage}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

/**
 * Prevent re-rendering all the inputs when one of them changes!
 * Because the form hook is producing a new state immutably,
 * so the prevProps and nextProps cannot be equal even if they haven't changed!!
 */
function areEqual(prevProps: TypeImageCheckboxProps, nextProps: TypeImageCheckboxProps) {
    const compareKeys = ['options', 'value', 'validity', 'validators', 'isTouched'];
    const areEqual = compareProps<TypeImageCheckboxProps>(prevProps, nextProps, compareKeys);
    return areEqual;
}

export default memo(ImageCheckbox, areEqual);
