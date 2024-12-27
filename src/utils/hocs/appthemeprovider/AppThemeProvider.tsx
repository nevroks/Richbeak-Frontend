import {FC, ReactNode} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/ReduxHooks.ts";
import { toggleTheme } from "../../../store/theme/themeSlice.ts";


type AppThemeProviderPropsType = {
    children: ReactNode
}

const AppThemeProvider: FC<AppThemeProviderPropsType> = ({children}) => {
    const isDarkMode = useAppSelector((state) => state.theme.isDarkMode)
    const dispatch = useAppDispatch()
    if(window.matchMedia('(prefers-color-scheme: dark)').matches && isDarkMode === undefined) {dispatch(toggleTheme(true))}
    else if(!window.matchMedia('(prefers-color-scheme: dark)').matches && isDarkMode === undefined) {dispatch(toggleTheme(false))}

    return (
        <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
            {children}
        </div>
    );
}

export default AppThemeProvider;