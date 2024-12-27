import Header from "../../components/layout/header/Header.tsx";
import {IntlProvider} from "react-intl";
import {messages} from "../../utils/consts/languages.ts";
import {useAppSelector} from "../../utils/hooks/ReduxHooks.ts";
import classes from "./style.module.css";
import cn from "classnames";
import Button from "../../components/ui/button/Button.tsx";
import {useNavigate} from "react-router-dom";
import {APP_PAGES_PATHS_CONSTS} from "../../utils/consts/appConsts.ts";

// @ts-ignore
import HomeIco from "../../assets/icons/homeIco.svg?react";


const NotFoundPage = () => {
    const language = useAppSelector((state) => state.language.language);
    const navigate=useNavigate()
    const handleGoBack=()=>{
        navigate(APP_PAGES_PATHS_CONSTS.NEWS_PAGE)
    }

    return (
        <>
            <IntlProvider locale={language} messages={messages[language]}>
                <div className={cn(classes["NotFoundPage__wrapper"], classes["page__wrapper"])}>
                    <Header add={undefined}/>
                    <div className={cn(classes["NotFoundPage__content"], classes["page__content"])}>
                        <div className={classes["NotFoundPage__error"]}>
                            <p className={cn(classes["NotFoundPage__error--title"], classes["error__text--code"])}>404</p>
                            <p className={cn(classes["NotFoundPage__error--text"], classes["error__description--code"])}>Похоже такой страницы не существует</p>
                        </div>
                        <Button className={classes["page__go--back__button"]} onClick={handleGoBack} text={"На главную"}><HomeIco/></Button>
                    </div>
                </div>
            </IntlProvider>
        </>


    );
};

export default NotFoundPage;