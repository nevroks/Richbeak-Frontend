import {useAppSelector} from "../../utils/hooks/ReduxHooks.ts";
import {useNavigate, useParams} from "react-router-dom";
import {APP_PAGES_PATHS_CONSTS} from "../../utils/consts/appConsts.ts";
import {IntlProvider} from "react-intl";
import {messages} from "../../utils/consts/languages.ts";
import cn from "classnames";
import classes from "./style.module.css";
import Header from "../../components/layout/header/Header.tsx";
import Button from "../../components/ui/button/Button.tsx";


// @ts-ignore
import HomeIco from "../../assets/icons/homeIco.svg?react";

const ServerErrorPage = () => {
    const language = useAppSelector((state) => state.language.language);

    const {code} = useParams()

    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate(APP_PAGES_PATHS_CONSTS.NEWS_PAGE)
    }

    return (
        <>
            <IntlProvider locale={language} messages={messages[language]}>
                <div className={cn(classes["ServerErrorPage__wrapper"], classes["page__wrapper"])}>
                    <Header add={undefined}/>
                    <div className={cn(classes["ServerErrorPage__content"], classes["page__content"])}>
                        <div className={classes["ServerErrorPage__error"]}>
                            <p className={cn(classes["ServerErrorPage__error--title"], classes["error__text--code"])}>{code}</p>
                            <p className={cn(classes["ServerErrorPage__error--text"], classes["error__description--code"])}>Кажется что-то пошло не так</p>
                        </div>
                        <Button className={classes["page__go--back__button"]}
                                onClick={handleGoBack}
                                text={"На главную"}>
                            <HomeIco/>
                        </Button>
                    </div>
                </div>
            </IntlProvider>
        </>
    )
};

export default ServerErrorPage;