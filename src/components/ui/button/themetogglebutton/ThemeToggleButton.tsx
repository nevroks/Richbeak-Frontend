import { useDispatch } from "react-redux";
import { toggleTheme } from "../../../../store/theme/themeSlice.ts";

// @ts-ignore
import SunImg from "../../../../assets/icons/iconSun.svg?react";
// @ts-ignore
import MoonImg from "../../../../assets/icons/iconMoon.svg?react";
import { useAppSelector } from "../../../../utils/hooks/ReduxHooks.ts";

const ThemeToggleButton = () => {
  const dispatch = useDispatch();
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode)

  const handleToggle = () => {
    dispatch(toggleTheme(!isDarkMode));
  };

  return (
    <button onClick={handleToggle}>
      {isDarkMode ? <MoonImg /> : <SunImg />}
    </button>
  );
};

export default ThemeToggleButton;
