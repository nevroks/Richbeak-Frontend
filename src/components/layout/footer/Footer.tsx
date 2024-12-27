import classes from "./style.module.css";

import {Link} from "react-router-dom";
import cn from "classnames";

import useMediaQuery from "../../../utils/hooks/useMediaQuery.ts";
import {MEDIA_CONSTS} from "../../../utils/consts/mediaConsts.ts";
import {FormattedMessage} from "react-intl";
import {useAppSelector} from "../../../utils/hooks/ReduxHooks.ts";
import {APP_PAGES_PATHS_CONSTS, SOCIALS_LINKS_CONSTS} from "../../../utils/consts/appConsts.ts";

// @ts-ignore
import LogoImg from "../../../assets/NewLogo.svg?react";
// @ts-ignore
/* import AppleStoreImg from "./../../../assets/platforms/appleStoreImg.svg?react"; */
// @ts-ignore
/* import GooglePlayImg from "./../../../assets/platforms/googlePlayImg.svg?react"; */
// @ts-ignore
/* import VKImg from "./../../../assets/socials/vkontakteImg.svg?react"; */
// @ts-ignore
import TelegramImg from "./../../../assets/socials/telegramImg.svg?react";
import { publicationsCoinsApi } from "../../../utils/api/publicationscoins/publicationsCoinsApi.ts";
import { publicationsTagsApi } from "../../../utils/api/publicationstags/publicationsTagsApi.ts";
import { useEffect, useState } from "react";
import getRandom from "../../../utils/helpers/random.ts";
import { ICoin, ITag } from "../../../types/types.ts";

const Footer = () => {

    const {
        data: AllPublicationsCoinsQueryResponse,
        isLoading: IsCoinsLoading,
    } = publicationsCoinsApi.useGetAllPublicationsCoinsQuery()

    const {
        data: AllPublicationsTagsQueryResponse,
        isLoading: IsTagsLoading,
    } = publicationsTagsApi.useGetAllPublicationsTagsQuery()

    const [visibleItems] = useState(3);
    const [visibleTags, setVisibleTags] = useState<ITag[]>([])
    const [visibleCoins, setVisibleCoins] = useState<ICoin[]>([])

    useEffect(() => {
        if(!IsTagsLoading && AllPublicationsTagsQueryResponse) {
            const random = getRandom(AllPublicationsTagsQueryResponse.length - visibleItems);
            setVisibleTags(AllPublicationsTagsQueryResponse.slice(random, random + 4))
        }
    }, [AllPublicationsTagsQueryResponse, IsTagsLoading, visibleItems])
    
    useEffect(() => {
        if(!IsCoinsLoading && AllPublicationsCoinsQueryResponse) {
            const random = getRandom(AllPublicationsCoinsQueryResponse.length - visibleItems);
            setVisibleCoins(AllPublicationsCoinsQueryResponse.slice(random, random + 4))
        }
    }, [AllPublicationsCoinsQueryResponse, IsCoinsLoading, visibleItems])

    const isSemiPhoneOrSmaller = useMediaQuery(MEDIA_CONSTS.SEMI_PHONE_MEDIA)
    const isPhoneOrSmaller = useMediaQuery(MEDIA_CONSTS.PHONE_MEDIA)
    const isDarkMode = useAppSelector(state => state.theme.isDarkMode)

    return (
        <footer className={classes["footer"]}>
            {!isSemiPhoneOrSmaller ?
                <div className={classes["footer--header"]}>
                    <div className={classes["footer--header__apps"]}>
                        <div className={classes["footer--header__apps--logo"]}>
                            <LogoImg className={cn(classes["footer--header__apps--logo__img"], {
                                [classes.dark]: isDarkMode
                            })}/>
                            <h4>Richbeak</h4>
                        </div>
                        {/*<div className={classes["footer--header__apps--links"]}>*/}
                        {/*    <Link className={classes["footer--header__apps--links__link"]} to={""}>*/}
                        {/*        <AppleStoreImg/>*/}
                        {/*        <div>*/}
                        {/*            <p className={cn("text-extra-small", "text-500")}>Скачайте в</p>*/}
                        {/*            <p className={cn("text-small", "text-500")}>App Store</p>*/}
                        {/*        </div>*/}
                        {/*    </Link>*/}
                        {/*    <Link className={classes["footer--header__apps--links__link"]} to={""}>*/}
                        {/*        <GooglePlayImg/>*/}
                        {/*        <div>*/}
                        {/*            <p className={cn("text-extra-small", "text-500")}>Скачайте в</p>*/}
                        {/*            <p className={cn("text-small", "text-500")}>App Store</p>*/}
                        {/*        </div>*/}
                        {/*    </Link>*/}
                        {/*</div>*/}
                    </div>
                    <nav className={classes["footer--header__navigation"]}>
                        <ul className={"footer--header__navigation--list"}>
                            <li className={cn("text-semi-large", "text-500", classes["footer--header__navigation--list__item"])}>
                                <FormattedMessage id="footer.news"/></li>
                            <li className={cn("text-semi-large", "text-400", classes["footer--header__navigation--list__item"])}>
                                <Link to={APP_PAGES_PATHS_CONSTS.NEWS_PAGE}><FormattedMessage id="footer.allNews"/></Link>
                            </li>
                            <li className={cn("text-semi-large", "text-400", classes["footer--header__navigation--list__item"])}>
                                <Link to={APP_PAGES_PATHS_CONSTS.MARKET_CAP_PAGE}><FormattedMessage id="secondPage.name"/></Link>
                            </li>
                            <li className={cn("text-semi-large", "text-400", classes["footer--header__navigation--list__item"])}>
                                <Link to={APP_PAGES_PATHS_CONSTS.TOP_NEWS_PAGE}><FormattedMessage id="thirdPage.name"/></Link>
                            </li>
                        </ul>
                        <ul className={"footer--header__navigation--list"}>
                            <li className={cn("text-semi-large", "text-500", classes["footer--header__navigation--list__item"])}>
                                <FormattedMessage id="footer.categories"/></li>
                            {
                                IsTagsLoading ? <li className={cn("text-semi-large", "text-400", classes["footer--header__navigation--list__item"])}>Blockchain</li>
                                :
                                <>
                                {
                                visibleTags.map((tag,index) => {
                                    return <li key={index} className={cn("text-semi-large", "text-400", classes["footer--header__navigation--list__item"])}><Link to={`${APP_PAGES_PATHS_CONSTS.SEARCH_PAGE}?search=${tag.name}`}>{tag.name}</Link></li>
                                })
                                }
                                </>
                            }
                        </ul>
                        <ul className={"footer--header__navigation--list"}>
                            <li className={cn("text-semi-large", "text-500", classes["footer--header__navigation--list__item"])}>
                                <FormattedMessage id="footer.coins"/></li>
                            {
                                IsCoinsLoading ? <li className={cn("text-semi-large", "text-400", classes["footer--header__navigation--list__item"])}>Loading...</li>
                                :
                                <>
                                {
                                visibleCoins.map((coin,index) => {
                                    return <li key={index} className={cn("text-semi-large", "text-400", classes["footer--header__navigation--list__item"])}><Link to={`${APP_PAGES_PATHS_CONSTS.SEARCH_PAGE}?search=${coin.name}`}>{coin.name}</Link></li>
                                })
                                }
                                </>
                            }
                        </ul>
                    </nav>
                    <div className={classes["footer--header__socials"]}>
                        <div className={classes["footer--header__socials--socials"]}>
                            <p className={cn("text-semi-large", "text-500", classes["footer--header__socials--socials__title"])}><FormattedMessage id="footer.social"/></p>
                            <div className={classes["footer--header__socials--socials__links"]}>
                                {/*<Link className={classes["footer--header__socials--socials__links--link"]}*/}
                                {/*      to={"/"}><VKImg/></Link>*/}
                                <Link className={classes["footer--header__socials--socials__links--link"]}
                                      to={SOCIALS_LINKS_CONSTS.TELEGRAM}><TelegramImg/></Link>
                            </div>
                        </div>
                        {/*<div className={classes["footer--header__socials--email"]}>*/}
                        {/*    <p className={cn("text-semi-large", "text-500")}><FormattedMessage id="footer.contact"/></p>*/}
                        {/*    <p className={cn("text-semi-large", "text-400")}>infoyourcompany@com</p>*/}
                        {/*</div>*/}
                    </div>
                </div>
                :
                <div>
                    <div className={cn(classes["footer--header"], classes["mobile"])}>
                        <div className={cn(classes["footer--header__logo"], classes["mobile"])}>
                            <div className={cn(classes["footer--header__logo--container"], classes["mobile"])}>
                                <LogoImg className={classes["footer--header__apps--logo__img"]}/>
                                <h4>Richbeak</h4>
                            </div>
                            {/*<p className={cn("text-semi-large", "text-400")}>infoyourcompany@com</p>*/}
                        </div>
                        <nav className={cn(classes["footer--header__navigation"], classes["mobile"])}>
                            <ul className={"footer--header__navigation--list"}>
                                <li className={cn("text-semi-large", "text-500", classes["footer--header__navigation--list__item"])}>
                                    <FormattedMessage id="footer.news"/>
                                </li>
                                <li className={cn("text-semi-large", "text-400", classes["footer--header__navigation--list__item"])}>
                                    <Link to={APP_PAGES_PATHS_CONSTS.NEWS_PAGE}><FormattedMessage id="footer.allNews"/></Link>
                                </li>
                                <li className={cn("text-semi-large", "text-400", classes["footer--header__navigation--list__item"])}>
                                    <Link to={APP_PAGES_PATHS_CONSTS.MARKET_CAP_PAGE}><FormattedMessage id="secondPage.name"/></Link>
                                </li>
                                <li className={cn("text-semi-large", "text-400", classes["footer--header__navigation--list__item"])}>
                                    <Link to={APP_PAGES_PATHS_CONSTS.TOP_NEWS_PAGE}><FormattedMessage id="thirdPage.name"/></Link>
                                </li>
                            </ul>
                            <ul className={"footer--header__navigation--list"}>
                                <li className={cn("text-semi-large", "text-500", classes["footer--header__navigation--list__item"])}>
                                    <FormattedMessage id="footer.categories"/>
                                </li>
                                {
                                IsTagsLoading ? <li className={cn("text-semi-large", "text-400", classes["footer--header__navigation--list__item"])}>Blockchain</li>
                                :
                                <>
                                {
                                visibleTags.map((tag,index) => {
                                    return <li key={index} className={cn("text-semi-large", "text-400", classes["footer--header__navigation--list__item"])}><Link to={`${APP_PAGES_PATHS_CONSTS.SEARCH_PAGE}?search=${tag.name}`}>{tag.name}</Link></li>
                                })
                                }
                                </>
                            }
                            </ul>
                            <ul className={"footer--header__navigation--list"}>
                                <li className={cn("text-semi-large", "text-500", classes["footer--header__navigation--list__item"])}>
                                    <FormattedMessage id="footer.coins"/>
                                </li>
                                {
                                IsCoinsLoading ? <li className={cn("text-semi-large", "text-400", classes["footer--header__navigation--list__item"])}>Blockchain</li>
                                :
                                <>
                                {
                                visibleCoins.map((coin,index) => {
                                    return <li key={index} className={cn("text-semi-large", "text-400", classes["footer--header__navigation--list__item"])}><Link to={`${APP_PAGES_PATHS_CONSTS.SEARCH_PAGE}?search=${coin.name}`}>{coin.name}</Link></li>
                                })
                                }
                                </>
                            }
                            </ul>
                            {isPhoneOrSmaller &&
                                <div className={classes["footer--header__socials"]}>
                                    <div className={classes["footer--header__socials--socials"]}>
                                        <p className={cn("text-semi-large", "text-500")}>
                                            <FormattedMessage id="footer.social"/>
                                        </p>
                                        <div className={classes["footer--header__socials--socials__links"]}>
                                            {/*<Link*/}
                                            {/*    className={classes["footer--header__socials--socials__links--link"]}*/}
                                            {/*    to={"/"}><VKImg/></Link>*/}
                                            <Link
                                                className={classes["footer--header__socials--socials__links--link"]}
                                                to={SOCIALS_LINKS_CONSTS.TELEGRAM}><TelegramImg/></Link>
                                        </div>
                                        {/*<div*/}
                                        {/*    className={cn(classes["footer--header__socials--socials__apps"], classes["mobile"])}>*/}
                                        {/*    <Link className={classes["footer--header__apps--links__link"]} to={""}>*/}
                                        {/*        <AppleStoreImg/>*/}
                                        {/*        <div>*/}
                                        {/*            <p className={cn("text-extra-small", "text-500")}>Скачайте в</p>*/}
                                        {/*            <p className={cn("text-small", "text-500")}>App Store</p>*/}
                                        {/*        </div>*/}
                                        {/*    </Link>*/}
                                        {/*    <Link className={classes["footer--header__apps--links__link"]} to={""}>*/}
                                        {/*        <GooglePlayImg/>*/}
                                        {/*        <div>*/}
                                        {/*            <p className={cn("text-extra-small", "text-500")}>Скачайте в</p>*/}
                                        {/*            <p className={cn("text-small", "text-500")}>App Store</p>*/}
                                        {/*        </div>*/}
                                        {/*    </Link>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                            }
                        </nav>
                        {!isPhoneOrSmaller &&
                            <div className={classes["footer--header__socials"]}>
                                <div className={classes["footer--header__socials--socials"]}>
                                    <p className={cn("text-semi-large", "text-500")}>
                                        <FormattedMessage id="footer.social"/>
                                    </p>
                                    <div className={classes["footer--header__socials--socials__links"]}>
                                        {/*<Link className={classes["footer--header__socials--socials__links--link"]}*/}
                                        {/*      to={"/"}><VKImg/></Link>*/}
                                        <Link className={classes["footer--header__socials--socials__links--link"]}
                                              to={SOCIALS_LINKS_CONSTS.TELEGRAM}><TelegramImg/></Link>
                                    </div>
                                    {/*<div*/}
                                    {/*    className={cn(classes["footer--header__socials--socials__apps"], classes["mobile"])}>*/}
                                    {/*    <Link className={classes["footer--header__apps--links__link"]} to={""}>*/}
                                    {/*        <AppleStoreImg/>*/}
                                    {/*        <div>*/}
                                    {/*            <p className={cn("text-extra-small", "text-500")}>Скачайте в</p>*/}
                                    {/*            <p className={cn("text-small", "text-500")}>App Store</p>*/}
                                    {/*        </div>*/}
                                    {/*    </Link>*/}
                                    {/*    <Link className={classes["footer--header__apps--links__link"]} to={""}>*/}
                                    {/*        <GooglePlayImg/>*/}
                                    {/*        <div>*/}
                                    {/*            <p className={cn("text-extra-small", "text-500")}>Скачайте в</p>*/}
                                    {/*            <p className={cn("text-small", "text-500")}>App Store</p>*/}
                                    {/*        </div>*/}
                                    {/*    </Link>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            }
            <div className={classes["footer--divider"]}></div>
            <div className={classes["footer--footer"]}>
                <p>© 2024 Richbeak. When using the content, a link to richbeak.com is required</p>
            </div>
        </footer>
    );
};

export default Footer;