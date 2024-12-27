import React, { ChangeEvent, Dispatch, SetStateAction, } from "react";
import classes from "./style.module.css";
import cn from "classnames";
import Popup from "../Popup";
import Button from "../../button/Button";
import Input from "../../input/Input";

type PropsMarketcap = {
  onClose: () => void;
  inputValue: string;
  onInputChange: (value: string) => void;
  //closePopupMarketCap: () => void;
  setIsPopupOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  onBtnClick: () => void;
  errorText: string;
  error: boolean;
};

const PopupEditor: React.FC<PropsMarketcap> = ({
  onClose,
  //closePopupMarketCap,
  inputValue,
  onInputChange,
  title,
  onBtnClick,
  errorText,
  error,
}) => {

  const onChange: (T: ChangeEvent<HTMLInputElement>) => void = (e) => {
    onInputChange(e.target.value);
  }

  return (
    <Popup onClose={onClose} extraClassName={classes["editor__popup"]}>
      <h3 className={cn(classes["popupEditor__title"])}>{title}</h3>
      <Input value={inputValue} onChange={onChange} placeholder="Имя тэга" variant="form" className={cn(classes["popupEditor__input"])} wrapperCN={cn(classes["popupEditor__input--wrapper"])} error={error} errorText={errorText}/>
      <Button text="Добавить" className={cn(classes["popupEditor__button"])} onClick={onBtnClick} disabled={error}/>
    </Popup>
  );
};

export default PopupEditor;
