import { ChangeEventHandler, FC } from "react";
import classes from "./style.module.css";
import cn from "classnames";

type CheckboxPropsType = {
  checked: boolean;
  handleChange: ChangeEventHandler<HTMLInputElement> | undefined;
  text: string;
  index: number;
  className?: string;
};

const Checkbox: FC<CheckboxPropsType> = ({
  checked,
  handleChange,
  text,
  index,
  className
}) => {
  return (
    <>
      <input
        className={cn(checked ? classes["checkbox"] : classes["checkbox__checked"], 
          {
            // @ts-ignore
            [className]: Boolean(className)
          }
        )}
        type="checkbox"
        id={`${index}`}
        checked={checked}
        onChange={handleChange}
      />
      <label
        htmlFor={`${index}`}
        className={cn("text-semi-large", "text-500", classes["checkbox__text"])}
      >
        {text}
      </label>
    </>
  );
};

export default Checkbox;
