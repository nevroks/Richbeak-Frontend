import classes from "./style.module.css";

import { Link } from "react-router-dom";
import cn from "classnames";
import { FC, useEffect, useState } from "react";
import {FormattedMessage} from "react-intl";
import { publicationsCoinsApi } from "../../../utils/api/publicationscoins/publicationsCoinsApi.ts";
import { publicationsTagsApi } from "../../../utils/api/publicationstags/publicationsTagsApi.ts";
import getRandom from "../../../utils/helpers/random.ts";
import { ICoin, ITag } from "../../../types/types.ts";
import { APP_PAGES_PATHS_CONSTS } from "../../../utils/consts/appConsts.ts";

// @ts-ignore
/* import LogoImg from "./../../../assets/Logo.svg?react"; */
// @ts-ignore
/* import AppleStoreImg from "./../../../assets/platforms/appleStoreImg.svg?react"; */
// @ts-ignore
/* import GooglePlayImg from "./../../../assets/platforms/googlePlayImg.svg?react"; */
// @ts-ignore
/* import VKImg from "./../../../assets/socials/vkontakteImg.svg?react"; */
// @ts-ignore
import TelegramImg from "./../../../assets/socials/telegramImg.svg?react";

interface IHeaderMobileProps {
  isActive: boolean;
}

const HeaderMobile: FC<IHeaderMobileProps> = ({ isActive }) => {
  
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

  return (

    <nav
      className={
        isActive
          ? cn(classes["headerMobile"], classes["headerMobile_active"])
          : classes["headerMobile"]
      }
    >
        <div>
          <div
            className={cn(classes["headerMobile--header"], classes["mobile"])}
          >
            <div
              className={cn(
                classes["headerMobile--header__logo"],
                classes["mobile"]
              )}
            >
              {/*<p className={cn("text-semi-large", "text-400")}>*/}
              {/*  infoyourcompany@com*/}
              {/*</p>*/}
            </div>
            {isActive && <nav
              className={cn(
                classes["headerMobile--header__navigation"],
                classes["mobile"]
              )}
            >
              <ul className={"headerMobile--header__navigation--list"}>
                <li
                  className={cn(
                    "text-semi-large",
                    "text-500",
                    classes["headerMobile--header__navigation--list__item"]
                  )}
                >
                  <FormattedMessage id="footer.news"/>
                </li>
                <li className={cn("text-semi-large", "text-400", classes["headerMobile--header__navigation--list__item"])}>
                  <Link to={APP_PAGES_PATHS_CONSTS.NEWS_PAGE}><FormattedMessage id="footer.allNews"/></Link>
                </li>
                <li className={cn("text-semi-large", "text-400", classes["headerMobile--header__navigation--list__item"])}>
                  <Link to={APP_PAGES_PATHS_CONSTS.MARKET_CAP_PAGE}><FormattedMessage id="secondPage.name"/></Link>
                </li>
                <li className={cn("text-semi-large", "text-400", classes["headerMobile--header__navigation--list__item"])}>
                  <Link to={APP_PAGES_PATHS_CONSTS.TOP_NEWS_PAGE}><FormattedMessage id="thirdPage.name"/></Link>
                </li>
              </ul>
              <ul className={"headerMobile--header__navigation--list"}>
                <li
                  className={cn(
                    "text-semi-large",
                    "text-500",
                    classes["headerMobile--header__navigation--list__item"]
                  )}
                >
                  <FormattedMessage id="footer.categories"/>
                </li>
                {
                  IsTagsLoading ? <li className={cn("text-semi-large", "text-400", classes["headerMobile--header__navigation--list__item"])}>Blockchain</li>
                  :
                  <>
                    {
                      visibleTags.map((tag) => {
                      return <li key={tag.id} className={cn("text-semi-large", "text-400", classes["headerMobile--header__navigation--list__item"])}><Link to={`${APP_PAGES_PATHS_CONSTS.SEARCH_PAGE}?search=${tag.name}`}>{tag.name}</Link></li>
                      })
                    }
                  </>
                }
              </ul>
              <ul className={"headerMobile--header__navigation--list"}>
                <li
                  className={cn(
                    "text-semi-large",
                    "text-500",
                    classes["headerMobile--header__navigation--list__item"]
                  )}
                >
                  <FormattedMessage id="footer.coins"/>
                </li>
                {
                  IsCoinsLoading ? <li className={cn("text-semi-large", "text-400", classes["headerMobile--header__navigation--list__item"])}>Blockchain</li>
                    :
                  <>
                    {
                      visibleCoins.map((coin) => {
                      return <li key={coin.id} className={cn("text-semi-large", "text-400", classes["headerMobile--header__navigation--list__item"])}><Link to={`${APP_PAGES_PATHS_CONSTS.SEARCH_PAGE}?search=${coin.name}`}>{coin.name}</Link></li>
                      })
                    }
                  </>
                }
              </ul>
                <div className={classes["headerMobile--header__socials"]}>
                  <div
                    className={
                      classes["headerMobile--header__socials--socials"]
                    }
                  >
                    <p className={cn("text-semi-large", "text-500")}>
                      <FormattedMessage id="footer.social"/>
                    </p>
                    <div
                      className={
                        classes["headerMobile--header__socials--socials__links"]
                      }
                    >
                      {/*<Link*/}
                      {/*  className={*/}
                      {/*    classes[*/}
                      {/*      "headerMobile--header__socials--socials__links--link"*/}
                      {/*    ]*/}
                      {/*  }*/}
                      {/*  to={"/"}*/}
                      {/*>*/}
                      {/*  <VKImg />*/}
                      {/*</Link>*/}
                      <Link
                        className={
                          classes[
                            "headerMobile--header__socials--socials__links--link"
                          ]
                        }
                        to={"/"}
                      >
                        <TelegramImg />
                      </Link>
                    </div>
                    {/*<div*/}
                    {/*  className={cn(*/}
                    {/*    classes["headerMobile--header__socials--socials__apps"],*/}
                    {/*    classes["mobile"]*/}
                    {/*  )}*/}
                    {/*>*/}
                    {/*  <Link*/}
                    {/*    className={*/}
                    {/*      classes["headerMobile--header__apps--links__link"]*/}
                    {/*    }*/}
                    {/*    to={""}*/}
                    {/*  >*/}
                    {/*    <AppleStoreImg />*/}
                    {/*    <div>*/}
                    {/*      <p className={cn("text-extra-small", "text-500")}>*/}
                    {/*        Скачайте в*/}
                    {/*      </p>*/}
                    {/*      <p className={cn("text-small", "text-500")}>*/}
                    {/*        App Store*/}
                    {/*      </p>*/}
                    {/*    </div>*/}
                    {/*  </Link>*/}
                    {/*  <Link*/}
                    {/*    className={*/}
                    {/*      classes["headerMobile--header__apps--links__link"]*/}
                    {/*    }*/}
                    {/*    to={""}*/}
                    {/*  >*/}
                    {/*    <GooglePlayImg />*/}
                    {/*    <div>*/}
                    {/*      <p className={cn("text-extra-small", "text-500")}>*/}
                    {/*        Скачайте в*/}
                    {/*      </p>*/}
                    {/*      <p className={cn("text-small", "text-500")}>*/}
                    {/*        App Store*/}
                    {/*      </p>*/}
                    {/*    </div>*/}
                    {/*  </Link>*/}
                    {/*</div>*/}
                  </div>
                </div>
            </nav>}
          </div>
        </div>
    </nav>
  );
};

export default HeaderMobile;
