import classes from "./style.module.css";
import cn from "classnames";
import {FC, ReactNode} from "react";
import { dropDownSizes } from "../../../types/types";

type DropdownContentPropsType={
    children:ReactNode,
    size: dropDownSizes,
    contentClassname: string,
    search:boolean|undefined
}

const DropdownContent:FC<DropdownContentPropsType> = ({children, size, contentClassname,search}) => {
    return (
        <div className={cn(classes["Dropdown__content"], classes[`Dropdown__content--${size}`],contentClassname,{
            [classes.with_search]:search
        })}>
            {children}
        </div>
    );
};

export default DropdownContent;