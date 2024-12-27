import classes from "./style.module.css";
import LastCoinsRelatedNewsList
    from "../../components/news/newslists/lastcoinsrelatednewslist/LastCoinsRelatedNewsList.tsx";
import {useAppSelector} from "../../utils/hooks/ReduxHooks.ts";
import useDocumentTitle from "../../utils/hooks/useDocumentTitle.ts";
import {NewsPageTitles} from "../../utils/consts/pagetitles/newsPageTitles.ts";
import useLocalStorage from "../../utils/hooks/useLocalStorage.ts";
import {ICoin} from "../../types/types.ts";
import makeDictionary from "../../utils/helpers/makeDictionary.ts";
import AllNewsList from "../../components/news/newslists/allnewslist/AllNewsList.tsx";
import {messages} from "../../utils/consts/languages.ts";

const TopNewsPage = () => {
    const language = useAppSelector(state => state.language.language)
    //тут есть useEffect
    const [lastCoins] = useLocalStorage<ICoin[]>("last-coins", [])
    const coinsDictionary = makeDictionary(lastCoins.map(coin => {
        return JSON.stringify(coin)
    }));
    const topOfCoins = Object.entries(coinsDictionary).map(([key, value]) => ({
        currency: JSON.parse(key), // Парсим ключ обратно в объект
        count: value
    }));
    useDocumentTitle(NewsPageTitles[language], language)

    return (
        <main className={classes['topNewsPage']}>
            <section className={classes['topNewsPage__topNews']}>
                <AllNewsList title={messages[language]["topNewsPage.title"]} isTop={true}/>
            </section>
            <section className={classes['topNewsPage__recommendations']}>
                {topOfCoins.length === 0 &&
                    <LastCoinsRelatedNewsList
                        title={"Bitcoin"}
                        // link={{url: "хз куда", text: "Все категории"}}
                        coin={{name: "Bitcoin", id: 1, ticker: "btk"}}
                    />}
                {topOfCoins.length >= 1 &&
                    <LastCoinsRelatedNewsList
                        title={topOfCoins[0].currency.name}
                        // link={{url: "хз куда", text: "Все категории"}}
                        coin={topOfCoins[0].currency}
                    />}
            </section>

        </main>
    );
};

export default TopNewsPage;
