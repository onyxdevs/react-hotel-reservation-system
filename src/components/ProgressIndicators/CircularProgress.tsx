import React from 'react';

import classes from './CircularProgress.module.scss';

type TypeCircularProgressProps = {
    absolute?: boolean;
    show?: boolean;
    extraClasses?: string;
};

const CircularProgress: React.FC<TypeCircularProgressProps> = (props: TypeCircularProgressProps) => {
    const elClasses = [classes.loader];

    if (props.extraClasses) {
        elClasses.push(props.extraClasses);
    }

    if (props.absolute) {
        return (
            <div className={classes['loader-abs']}>
                <div className={elClasses.join(' ')}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>Loading...
                </div>
            </div>
        );
    }

    return (
        <div className={elClasses.join(' ')}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>Loading...
        </div>
    );
};

export default CircularProgress;
