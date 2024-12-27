import {useNavigate, useParams} from "react-router-dom";
import classes from "./style.module.css";
import cn from "classnames";
import TagsListItem from "../../components/tags/TagsListItem.tsx";
import CryptoCoin from "../../components/cryptocoin/CryptoCoin.tsx";
import {publicationsApi} from "../../utils/api/publications/publicationsApi.ts";
import useLocalStorage from "../../utils/hooks/useLocalStorage.ts";
import {useEffect, useState} from "react";
import {ICoin} from "../../types/types.ts";
import {FormattedDate, FormattedMessage} from "react-intl";
import {useAppSelector} from "../../utils/hooks/ReduxHooks.ts";

import useDocumentTitle from "../../utils/hooks/useDocumentTitle.ts";
import useMediaQuery from "../../utils/hooks/useMediaQuery.ts";
import {MEDIA_CONSTS} from "../../utils/consts/mediaConsts.ts";
import Preloader from "../../components/ui/preloader/Preloader.tsx";
import TopFiveCoins from "../../components/coins/coinslists/topfivecoins/TopFiveCoins.tsx";
import TagsLastNewsList from "../../components/news/newslists/tagslastnewslist/TagsLastNewsList.tsx";
import CoinLastNewsList from "../../components/news/newslists/coinlastnewslist/CoinLastNewsList.tsx";
import TopNewsSlider from "../../components/ui/sliders/topnewsslider/TopNewsSlider.tsx";
import StatBadges from "../../components/badges/StatBadges.tsx";
import SingleNewsPageParagraph from "./pageComponents/SingleNewsPageParagraph/SingleNewsPageParagraph.tsx";

const SingleNewsPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const language = useAppSelector((state) => state.language.language);

    const {
        data: GetPublicationByIdQueryResponse,
        isLoading,
        error,
    } = publicationsApi.useGetPublicationByIdQuery({
        // @ts-ignore
        newsId: id,
        language: language,
    });

    const [lastCoins, setLastCoins] = useLocalStorage<ICoin[]>("last-coins", []);
    const [isPreloaderActive, setIsPreloaderActive] = useState(true);

    useEffect(() => {
        setIsPreloaderActive(true);
        if (!isLoading) {
            if (lastCoins.length < 20) {
                setLastCoins([...lastCoins, GetPublicationByIdQueryResponse!.coin]);
            } else {
                setLastCoins(
                    lastCoins.splice(0, 1, GetPublicationByIdQueryResponse!.coin)
                );
            }
        }
        const interval = setInterval(() => {
            if (GetPublicationByIdQueryResponse) {
                setIsPreloaderActive(false);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [GetPublicationByIdQueryResponse]);
    const isSemiPhoneOrSmaller = useMediaQuery(MEDIA_CONSTS.SEMI_PHONE_MEDIA);
    const isPhoneOrSmaller = useMediaQuery(MEDIA_CONSTS.PHONE_MEDIA);

    useDocumentTitle(
        `Richbeak - ${
            GetPublicationByIdQueryResponse?.title
                ? GetPublicationByIdQueryResponse?.title
                : "title"
        }`,
        language
    );

    if (error) {
        // @ts-ignore
        navigate(`/error/${error.status}`, {replace: true});
        return;
    }

    return (
        <main>
            <section>
                <a
                    className={cn(
                        "text-semi-small",
                        "text-500",
                        classes["news__preview--link"]
                    )}
                    onClick={() => navigate("/")}
                >
                    <FormattedMessage id="singleNewsPage.title"/>
                </a>
            </section>
            <section className={classes["news__preview"]}>
                {!isPreloaderActive ? (
                    <>
                        <div className={classes["news__preview--news"]}>
                            <div className={classes["news__preview--news__header"]}>
                                <h1>{GetPublicationByIdQueryResponse!.title}</h1>
                                <div className={classes["news__preview--news__header--info"]}>
                                    <div
                                        className={
                                            classes["news__preview--news__header--info__wrapper"]
                                        }
                                    >
                                        {isPhoneOrSmaller && (
                                            <p
                                                className={cn(
                                                    "text-medium",
                                                    "text-400",
                                                    classes["news__preview--news__header--info__date"]
                                                )}
                                            >
                                                <FormattedDate
                                                    value={GetPublicationByIdQueryResponse!.createdAt}
                                                />
                                            </p>
                                        )}
                                        <CryptoCoin coin={GetPublicationByIdQueryResponse!.coin}/>

                                        <div
                                            className={
                                                classes["news__preview--news__header--info__tags"]
                                            }
                                        >
                                            {!isPhoneOrSmaller
                                                ? GetPublicationByIdQueryResponse!.tags.map(
                                                    (tag, index) => {
                                                        return <TagsListItem tag={tag} key={index}/>;
                                                    }
                                                )
                                                : GetPublicationByIdQueryResponse!.tags
                                                    .slice(0, 3)
                                                    .map((tag, index) => {
                                                        return <TagsListItem tag={tag} key={index}/>;
                                                    })}
                                        </div>
                                    </div>
                                    {!isPhoneOrSmaller && (
                                        <p
                                            className={cn(
                                                "text-medium",
                                                "text-400",
                                                classes["news__preview--news__header--info__date"]
                                            )}
                                        >
                                            <FormattedDate
                                                value={GetPublicationByIdQueryResponse!.createdAt}
                                            />
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className={classes["news__preview--img__container"]}>
                                <img
                                    className={classes["news__preview--img"]}
                                    src={
                                        GetPublicationByIdQueryResponse!.publicationsGroup.preview
                                    }
                                    alt="preview_img"
                                />
                                {/*<StatBadges*/}
                                {/*    isAbsolute={true}*/}
                                {/*    size={"medium"}*/}
                                {/*    variant="commentsCounter"*/}
                                {/*    count={0}*/}
                                {/*    top={undefined}*/}
                                {/*    style={{*/}
                                {/*        marginRight: window.innerWidth <= 1280 ? '53px' : '75px',*/}
                                {/*    }}*/}
                                {/*/>*/}
                                <StatBadges
                                    isAbsolute={true}
                                    size={"medium"}
                                    variant="viewsCounter"
                                    count={
                                        GetPublicationByIdQueryResponse!.publicationsGroup?.views
                                            ? GetPublicationByIdQueryResponse!.publicationsGroup.views
                                            : 0
                                    }
                                    top={undefined}
                                />

                            </div>
                            <div className={classes["news__preview--subsection"]}>
                                <p className={cn("text-600", "text-semi-large")}>
                                    {GetPublicationByIdQueryResponse!.description}
                                </p>
                            </div>
                            <div className={classes["news__preview--news__section"]}>
                                {GetPublicationByIdQueryResponse!.paragraphs.map(
                                    (paragraph) => {
                                        return (
                                            <SingleNewsPageParagraph
                                                key={paragraph.order}
                                                paragraph={paragraph}
                                            />
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <Preloader/>
                )}

                <div className={classes["news__preview--recommendations"]}>
                    {!isSemiPhoneOrSmaller ? (
                        <>
                            {!isLoading && (
                                <>
                                    <CoinLastNewsList
                                        coin={GetPublicationByIdQueryResponse!.coin}
                                    />
                                    <TagsLastNewsList
                                        direction={"vertically"}
                                        tag={GetPublicationByIdQueryResponse!.tags[0]}
                                    />
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            {!isLoading && (
                                <TagsLastNewsList
                                    direction={"horizontally"}
                                    tag={GetPublicationByIdQueryResponse!.tags[0]}
                                />
                            )}
                        </>
                    )}
                    <TopFiveCoins/>
                </div>
                {/*<SingleNewsPageComment/>*/}
            </section>

            <section className={classes["news__preview--slider_section"]}>
                <div className={classes["news__preview--slider"]}>
                    {!isLoading && (
                        <h1 className={classes["allNews--title"]}>
                            <FormattedMessage id={"singleNewsPage.otherNews"}/>
                        </h1>
                    )}
                    <TopNewsSlider sliderTimeSpan={"week"}/>
                </div>
            </section>
        </main>
    );
};

export default SingleNewsPage;
