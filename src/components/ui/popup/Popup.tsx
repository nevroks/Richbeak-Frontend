import React from "react";
import classes from "./style.module.css";
import cn from "classnames";

type PropsPopup = {
    onClose: () => void;
    children: any;
    extraClassName?: string;
};

const Popup: React.FC<PropsPopup> = ({onClose, children, extraClassName}) => {
    return (
    <div className={cn(classes["popup__wrapper"])}>
        <div className={cn(classes["popup__content"], extraClassName)}>{children}</div>
        <div onClick={onClose} className={classes["popup__overlay"]}></div>
    </div>
);
}

export default Popup;