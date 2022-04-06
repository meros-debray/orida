import classNames from 'classnames';
import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

function Button({ children, className, type = 'button', ...props }: ButtonProps) {
    return (
        <button
            className={classNames(`
                bg-primary
                block
                border-0
                cursor-pointer
                min-w-[100px]
                no-underline
                py-2 px-3
                rounded
                text-white text-xs font-normal text center
                w-full

                hover:bg-primary-hover
                `,
                className,
            )}
            type={type}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;