import {Suspense} from 'react';
import {Outlet} from "react-router-dom";
import classes from "./style.module.css";
import AdminHeader from '../header/AdminHeader.tsx';
import {IntlProvider} from "react-intl";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/ReduxHooks.ts";
import {messages} from "../../../utils/consts/languages.ts";
import { setLanguage } from '../../../store/language/languageSlice.ts';


const AdminLayout = () => {
    const dispatch = useAppDispatch();
    dispatch(setLanguage('RU'))
    const language = useAppSelector((state) => state.language.language);
    return (
        <>
            <div className={classes['adminLayout']}>
                <AdminHeader add={undefined}/>
                <div className={classes['adminPage']}>
                    <Suspense fallback={<></>}>
                        <IntlProvider locale={language} messages={messages[language]}>
                            <Outlet/>
                        </IntlProvider>
                    </Suspense>
                </div>
            </div>

        </>
    );
};

export default AdminLayout;