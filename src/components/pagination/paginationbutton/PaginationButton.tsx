import React from "react";
import cn from "classnames";
import classes from "./style.module.css";

type PaginationButtonProps = {
  onClick: () => void;
  isSelected: boolean;
  disabled?: boolean;
  children: React.ReactNode;
};

const PaginationButton: React.FC<PaginationButtonProps> = ({
  onClick,
  isSelected,
  disabled,
  children,
}) => {
  const styleSelect = {
    color: "white",
    background: "black",
  };
  const styleDefault = {
    color: "black",
    background: "white",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "text-semi-small",
        "text-500",
        classes["PaginationButton--button__page"],
        { [classes["selected"]]: isSelected }
      )}
      style={isSelected ? styleSelect : styleDefault}
    >
      {children}
    </button>
  );
};

export default PaginationButton;
