import classes from "./style.module.css";
import cn from "classnames";
import {FC, useMemo} from "react";
import NewsItem from "../../NewsItem.tsx";
import {ICoin} from "../../../../types/types.ts";
import {useAppSelector} from "../../../../utils/hooks/ReduxHooks.ts";
import {publicationsApi} from "../../../../utils/api/publications/publicationsApi.ts";
import {Link, useNavigate} from "react-router-dom";

// @ts-ignore
import IconAllCategories from "../../../../assets/icons/iconAllCategories.svg?react";

type LastCoinsRelatedNewsListPropsType = {
    coin: ICoin,
    title:string,
    link?:{
        url:string,
        text:string
    }
}

const LastCoinsRelatedNewsList: FC<LastCoinsRelatedNewsListPropsType> = ({coin,title,link}) => {
    const language = useAppSelector(state => state.language.language)
    const QueryParams = useMemo(() => {
        return `lang=${language.toLowerCase()}&limit=3&coin=${coin.id}&sort=desc`
    }, [coin,language])
    const navigate=useNavigate()
    const {
        data: AllPublicationsQueryResponse,
        error,
        isLoading,
    } = publicationsApi.useGetAllPublicationsQuery(QueryParams)

    if(isLoading){
        return <h1>Loading...</h1>
    }

    if (error){
        // @ts-ignore
        navigate(`/error/${error.status}`,{replace:true})
        return
    }
    return (
        <div className={classes['LastCoinsRelatedNewsList__wrapper']}>
            <div className={classes['LastCoinsRelatedNewsList__info']}>
                <h1>{title}</h1>
                {link &&<Link target={"_blank"} to={link.url} className={classes['LastCoinsRelatedNewsList__info--link']}>
                    <p className={cn(
                        "text-medium",
                        "text-500",
                        classes['LastCoinsRelatedNewsList__info--link__text']
                    )}>{link.text}</p>
                    <IconAllCategories alt={"link_img"} className={classes["LastCoinsRelatedNewsList__info--link__img"]}/>
                </Link>}
            </div>
            <div className={cn(classes['LastCoinsRelatedNewsList__list'])}>
                {AllPublicationsQueryResponse!.data.map(
                    (news, index) => (<NewsItem variant={"medium"} key={index} news={news}/>)
                )}
            </div>
        </div>
    );
};

export default LastCoinsRelatedNewsList;