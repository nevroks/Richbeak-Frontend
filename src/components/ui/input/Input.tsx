import {FC, InputHTMLAttributes, ReactNode} from "react";
import cn from "classnames";
import classes from "./style.module.css";

// @ts-ignore
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholder: string,
    variant: 'default' | 'error' | 'basic' | 'form'
    onChange?: (T: React.ChangeEvent<HTMLInputElement>) => void,
    type?: string,
    value?: string,
    className?: string,
    icon?: ReactNode,
    wrapperCN?: string,
    errorText?: string,
    error?: boolean,
    onIconClick?: () => void,
}

const Input: FC<InputProps> = ({placeholder, variant, className, icon, wrapperCN, errorText, error, onIconClick = () => {return}, ...props}) => {

    switch (Boolean(icon)) {
        case true:
            return (
                <div className={wrapperCN} style={{position: "relative"}}>
                    <input
                        className={cn(classes['input'], classes[`${variant}`], classes["with-ico"], `text-medium`, `text-400`, {
                            [className]: Boolean(className)
                        }, error ? classes["error"] : '')} {...props} placeholder={placeholder}/>
                    <div className={cn(classes["inputIco"], classes[`${variant}`])} onClick={onIconClick}>
                        {icon}
                    </div>
                    {error && <p className={cn(`text-medium`, `text-400`, classes["input__error--text"])}>{errorText}</p>}
                </div>

            );
        case false:
            return (
                <div className={wrapperCN}>
                    <input
                        className={cn(classes['input'], classes['inputs'], classes[`${variant}`], `text-medium`, `text-400`, {
                            // @ts-ignore
                            [className]: Boolean(className)
                        }, error ? classes["error"] : '')} {...props} placeholder={placeholder}/>
                        {error && <p className={cn(`text-medium`, `text-400`, classes["input__error--text"])}>{errorText}</p>}
                </div>
            );
    }
};

export default Input;