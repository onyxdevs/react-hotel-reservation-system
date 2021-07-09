import React from 'react';

import styleClasses from './Steps.module.scss';

type TypeStepsProps = {
    children: React.ReactNode;
};

const Steps: React.FC<TypeStepsProps> = (props: TypeStepsProps) => {
    return <div className={styleClasses.steps}>{props.children}</div>;
};

export default Steps;
