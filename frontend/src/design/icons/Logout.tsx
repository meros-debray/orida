/* eslint-disable max-len */
import IconProps from '@customTypes/iconProps';
import classnames from '@utils/classnames';
import React from 'react';

import { defaultColor, defaultStyle } from './icon-style';

const Logout = ({ color = defaultColor, className }: IconProps) => (
    <svg
        className={classnames(defaultStyle, className)}
        fill={color}
        id="Calque_1"
        version="1.1"
        viewBox="0 0 43.2 43.2"
        x="0px"
        xmlns="http://www.w3.org/2000/svg"
        y="0px"
    >
        <g>
            <path
                className="st0"
                d="M26.1,9.1c-0.4,2.3-0.2,3.9,1.8,5.6c4,3.3,3.8,9.4,0.2,13.1c-3.6,3.6-9.7,3.5-13.2-0.2
        c-3.5-3.8-3.5-9.9,0.5-13.1c2.1-1.6,1.7-3.3,1.7-5.3c-5.6,1.7-9.2,7.7-8.4,13.9c0.7,5.6,5.9,10.8,10.9,10.9
        c8.1,0.2,13.5-3.5,14.7-10.1C35.5,17.3,32.2,11.2,26.1,9.1z M23.7,13c0-2.1,0-4.2,0-6.3c0-1.4-0.4-2.5-2-2.7
        c-1.2-0.1-2,0.9-2.1,2.6c0,4.3,0,8.5,0,12.8c0,1.4,0.5,2.4,2,2.5c1.2,0.1,2.1-0.9,2.1-2.6C23.7,17.2,23.7,15.1,23.7,13z"
            />
            <path d="M26.1,9.1c6,2.2,9.4,8.2,8.2,14.7c-1.2,6.6-6.6,10.3-14.7,10.1c-5-0.1-10.2-5.3-10.9-10.9c-0.8-6.2,2.8-12.2,8.4-13.9
        c0,2,0.4,3.7-1.7,5.3c-4,3.2-4.1,9.3-0.5,13.1c3.5,3.7,9.6,3.8,13.2,0.2c3.7-3.6,3.8-9.8-0.2-13.1C26,13,25.8,11.3,26.1,9.1z"
            />
            <path d="M23.7,13c0,2.1,0,4.2,0,6.3c0,1.6-0.9,2.7-2.1,2.6c-1.5-0.1-2-1.1-2-2.5c0-4.3,0-8.5,0-12.8c0-1.7,0.8-2.7,2.1-2.6
        c1.6,0.2,2,1.3,2,2.7C23.6,8.8,23.7,10.9,23.7,13z"
            />
        </g>
    </svg>
);

export default Logout;