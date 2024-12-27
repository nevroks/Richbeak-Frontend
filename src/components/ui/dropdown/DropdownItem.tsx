import {FC, ReactNode, useMemo} from 'react';
import classes from "./style.module.css";
import cn from "classnames";


type DropdownItemPropsType = {
    text: string,
    icon?: ReactNode,
    value: any,
    setState?:any,
    state?:{
        id:number | string,
        name:string
    },
}

const DropdownItem: FC<DropdownItemPropsType> = ({text, icon, value, setState, state}) => {

    const handleClick = () => {
        setState({
            name: text,
            id: value
        }, state)

    }

    //state - то, что выбрано в Dropdown, если совпадает с text, то добавляются стили выделения
    const selected = useMemo(() => {
        if (!state) {
            return false
        }
        return text === state.name
    }, [state])
    
    return (
        <div onClick={handleClick} className={cn(classes["DropdownItem"], {
            [classes.active]: selected
        })}>
            <p className={cn("text-semi-small","text-500")}>{text}</p>
            {Boolean(icon) && icon}
        </div>
    );
};
export default DropdownItem;