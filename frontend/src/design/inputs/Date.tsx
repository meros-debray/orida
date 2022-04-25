import WithTheme, { Theme } from '@customTypes/theme';
import Label from '@design/Label';
import Space from '@design/Space';
import classnames from '@utils/classnames';
import { InputHTMLAttributes, ReactNode } from 'react';

export interface DateInputProps extends InputHTMLAttributes<HTMLInputElement>, WithTheme {
    label?: ReactNode;
    name: string;
    register: any;
    required?: boolean;
}

const classes = {
    input: `
    w-full
    bg-transparent
    border-0
    border-b-2
    rounded-none
    border-b-grey
    outline-none
    text-black
    duration-300

    focus:border-b-secondary

    hover:border-b-secondary
    hover:cursor-text
    `,
    inputDarkTheme: `
    border-b-white
    text-white
    `,
    labelDarkTheme: `
    text-white
    `,
};

const DateInput = ({
    className,
    label,
    name,
    register,
    required = false,
    theme = Theme.Light,
    type = 'date',
    ...props
}: DateInputProps) => (
    <div className='w-full'>
        {label && (
            <>
                <Label
                    className={theme === Theme.Dark ? classes.labelDarkTheme : undefined}
                    htmlFor={name}
                >
                    {label}
                </Label>
                <Space px={8} />
            </>
        )}
        <input
            className={classnames(
                classes.input,
                theme === Theme.Dark ? classes.inputDarkTheme : undefined,
                className
            )}
            id={name}
            type={type}
            {...register(name, { required })}
            {...props}
        />
    </div>
);

export default DateInput;
