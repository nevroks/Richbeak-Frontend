import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useLayoutEffect,
  useState,
} from "react";
import cn from "classnames";
import classes from "./style.module.css";
import useMediaQuery from "../../../utils/hooks/useMediaQuery";
import { MEDIA_CONSTS } from "../../../utils/consts/mediaConsts";
import { debounce } from "../../../utils/helpers/debounce";
//@ts-ignore
import LoopImg from "../../../assets/icons/loopIco.svg?react"


interface DropdownSearchProps {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  type: string;
  placeholder: string;
}

const DropDownSearch: FC<DropdownSearchProps> = ({
  value,
  onChange,
  type = "text",
  placeholder = "",
}) => {
  // Внутренний стейт для быстрого отображения ввода
  const [inputValue, setValue] = useState(value);

  const onChangeDebounce = useCallback(
    debounce((value: string) => onChange(value), 600),
    [onChange]
  );

  // Обработчик изменений в поле
  const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChangeDebounce(event.target.value);
  };

  // Обновление стейта, если передан новый value
  useLayoutEffect(() => setValue(value), [value]);

  const isPhoneOrSmaller = useMediaQuery(MEDIA_CONSTS.PHONE_MEDIA)

  return (
    <div className={cn(classes['DropdownSearch__wrapper'])}>
      <input
        className={cn(classes['DropdownSearch__input'], `text-medium`, `text-400`)}
        value={inputValue}
        type={type}
        placeholder={placeholder}
        onChange={onChangeValue}
      />
      {!isPhoneOrSmaller && <LoopImg className={cn(classes['DropdownSearch__icon'])} />}
    </div>
  );
};

export default DropDownSearch;
