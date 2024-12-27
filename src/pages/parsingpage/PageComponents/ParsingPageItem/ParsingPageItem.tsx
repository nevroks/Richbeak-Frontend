import {Dispatch, FC, SetStateAction} from "react";
import classes from "./style.module.css";
import Checkbox from "../../../../components/ui/checkbox/Checkbox";
import {parseSourceType} from "../../../../types/types.ts";


type ParsingPageItemPropsType = {
    source: parseSourceType;
    index: number;
    setStateFn: Dispatch<SetStateAction<parseSourceType[] | []>>;
};

const ParsingPageItem: FC<ParsingPageItemPropsType> = ({setStateFn, source, index}) => {

    function handleChange() {
        setStateFn(prevState => prevState.map(item => {
            if (item.url === source.url) {
                return {
                    ...item,
                    enabled: !item.enabled  // Переключить значение 'enabled'
                };
            }
            return item;  // Вернуть неизмененный объект, если URL не совпадает
        }));
    }

    return (
        <div className={classes["ParsingPageItem"]}>
            <Checkbox
                index={index}
                text={source.url}
                checked={source.enabled}
                handleChange={handleChange}
            />
        </div>
    );
};

export default ParsingPageItem;
