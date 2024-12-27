import React, {ReactNode} from "react";

type PropsButton = {
    text: string;
    onClick: () => void;
    className: string;
    children: ReactNode;
    disabled: boolean;
    type: "submit" | "reset" | "button";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    style: any
};

const Button: React.FC<Partial<PropsButton>> = ({
                                                    text,
                                                    onClick,
                                                    className,
                                                    disabled,
                                                    children,
                                                    type,
                                                    style
                                                }) => {
    return (
        <button
            className={className}
            onClick={onClick}
            type={type}
            style={style}
            disabled={disabled}
        >
            {text}
            {children}
        </button>
    );
};

export default Button;