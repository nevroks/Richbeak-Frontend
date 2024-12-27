import classes from "./style.module.css";

import AllNewsList from "../../components/news/newslists/allnewslist/AllNewsList.tsx";
import TopNewsSlider from "../../components/ui/sliders/topnewsslider/TopNewsSlider.tsx";
import useLocalStorage from "../../utils/hooks/useLocalStorage.ts";
import {appPublicationsTimeSpan, ICoin} from "../../types/types.ts";
import makeDictionary from "../../utils/helpers/makeDictionary.ts";
import useDocumentTitle from "../../utils/hooks/useDocumentTitle.ts";
import {useAppSelector} from "../../utils/hooks/ReduxHooks.ts";
import {NewsPageTitles} from "../../utils/consts/pagetitles/newsPageTitles.ts";

import {useState} from "react";
import LastCoinsRelatedNewsList
    from "../../components/news/newslists/lastcoinsrelatednewslist/LastCoinsRelatedNewsList.tsx";

// @ts-ignore
import MoneyIcon from "./../../assets/icons/IconMoney.svg?react";
import {messages} from "../../utils/consts/languages.ts";
import {FormattedMessage} from "react-intl";
import PublicationTimeSpanDropdown
    from "../../components/ui/dropdown/publicationtimespandropdown/PublicationTimeSpanDropdown.tsx";


const NewsPage = () => {

    const [lastCoins] = useLocalStorage<ICoin[]>("last-coins", [])
    const coinsDictionary = makeDictionary(lastCoins.map(coin => {
        return JSON.stringify(coin)
    }));
    const topOfCoins = Object.entries(coinsDictionary).map(([key, value]) => ({
        currency: JSON.parse(key), // Парсим ключ обратно в объект
        count: value
    }));
    const language = useAppSelector(state => state.language.language)
    //тут есть useEffect
    useDocumentTitle(NewsPageTitles[language], language)

    const [sliderTimeSpan, setSliderTimeSpan] = useState<appPublicationsTimeSpan>(`week`)

    return (
        <main>
            <section className={classes["top__news"]}>
                <div className={classes["top__news--header"]}>
                    <h1>
                        <FormattedMessage id="newsPage.top"/>
                    </h1>
                    <PublicationTimeSpanDropdown contentArr={[
                        {id: "week", name: messages[language]["newsPage.selectionWeek"]}
                        , {id: "month", name: messages[language]["newsPage.selectionMonth"]}
                        , {id: "year", name: messages[language]["newsPage.selectionYear"]}
                    ]} timeSpan={sliderTimeSpan} setTimeSpan={setSliderTimeSpan}/>
                    <TopNewsSlider sliderTimeSpan={sliderTimeSpan}/>
                </div>
            </section>
            <section className={classes["allNews"]}>
                <AllNewsList title={messages[language]["newsPage.all"]}/>
            </section>
            <section className={classes["recommendations"]}>
                    {topOfCoins.length === 0 && <LastCoinsRelatedNewsList
                        // link={{url: "хз куда", text: messages[language]["LastCoinsRelatedNewsList.link"]}}
                        title={"Bitcoin"} coin={{name: "Bitcoin", id: 1, ticker: "btk"}}/>}
                    {topOfCoins.length >= 1 && <LastCoinsRelatedNewsList
                        // link={{url: "хз куда", text: messages[language]["LastCoinsRelatedNewsList.link"]}}
                        title={topOfCoins[0].currency.name} coin={topOfCoins[0].currency}/>}
                    {topOfCoins.length >= 2 && <LastCoinsRelatedNewsList
                        // link={{url: "хз куда", text: messages[language]["LastCoinsRelatedNewsList.link"]}}
                        title={topOfCoins[1].currency.name} coin={topOfCoins[1].currency}/>}
                    {topOfCoins.length >= 3 && <LastCoinsRelatedNewsList
                        // link={{url: "хз куда", text: messages[language]["LastCoinsRelatedNewsList.link"]}}
                        title={topOfCoins[2].currency.name} coin={topOfCoins[2].currency}/>}
            </section>
        </main>
    );
};

export default NewsPage;