import React from 'react';

interface TextProps {
    className: string;
    value: string;
    placeholder: string;
    type: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    name: string;
}

const TextComponent: React.FC<TextProps> = ({
    value,
    onChange,
    onBlur,
    placeholder,
    type,
    className,
    name
}) => {
    return (
        <input
            type={type}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            className={className}
            onBlur={onBlur}
            name={name}
        />
    );
};

export default TextComponent;
