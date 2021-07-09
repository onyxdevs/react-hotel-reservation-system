import React from 'react';

import styleClasses from './Portlet.module.scss';

type TypePortletProps = {
    children: React.ReactNode;
};

const Portlet: React.FC<TypePortletProps> = ({ children }: TypePortletProps) => (
    <div className={styleClasses.portlet}>{children}</div>
);

export default Portlet;
