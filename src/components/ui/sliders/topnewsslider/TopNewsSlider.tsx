import { FC, useEffect, useMemo, useRef, useState } from "react";
import classes from "./style.module.css";
import NewsItem from "../../../news/NewsItem.tsx";
import Slider from "react-slick";
import {
  appPublicationsTimeSpan,
  IPublication,
} from "../../../../types/types.ts";
import { publicationsApi } from "../../../../utils/api/publications/publicationsApi.ts";
import { useAppSelector } from "../../../../utils/hooks/ReduxHooks.ts";
import cn from "classnames";
import { useNavigate } from "react-router-dom";

type TopNewsSliderPropsType = {
  sliderTimeSpan: appPublicationsTimeSpan;
};

const TopNewsSlider: FC<TopNewsSliderPropsType> = ({ sliderTimeSpan }) => {
  const [array, setArray] = useState<IPublication[]>([]);
  const language = useAppSelector((state) => state.language.language);
  const navigate = useNavigate();
  const QueryParams = useMemo(() => {
    return `lang=${language.toLowerCase()}&limit=10&timespan=${sliderTimeSpan}&sort=desc`;
  }, [sliderTimeSpan, language]);

  const {
    data: AllPublicationsQueryResponse,
    error,
    isLoading,
  } = publicationsApi.useGetAllPublicationsQuery(QueryParams, {});

  useEffect(() => {
    if (!isLoading) {
      setArray(AllPublicationsQueryResponse!.data);
    }
  }, [isLoading, AllPublicationsQueryResponse]);

  const [isVisibleFakeSlide, setIsVisibleFakeSlide] = useState(true);
  const [isButtonsDisabled, setIsButtonsDisabled] = useState(true);
  

  let sliderRef = useRef(null);
  const pause = () => {
    // @ts-ignore
    sliderRef.slickPause();
  };
  const next = () => {
    // @ts-ignore
    sliderRef.slickNext();
    pause();
  };
  const previous = () => {
    // @ts-ignore
    sliderRef.slickPrev();
    pause();
  };
  const settings = {
    dots: false,
    arrows: false,
    infinite: array.length > 1,
    speed: 500,
    slidesToShow: 5.3,
    slidesToScroll: 1,
    swipeToSlide: true,
    pauseOnFocus: true,
    pauseOnHover: true,
    afterChange: function () {
      setIsVisibleFakeSlide(false);
      setIsButtonsDisabled(false);
      // let lastNews = array.splice(-1);
      // lastNews.map((item) => array.unshift(item));
    },
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 5120,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 5.3,
        },
      },
      {
        breakpoint: 1281,
        settings: {
          slidesToShow: 6.5,
        },
      },
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 6.7,
        },
      },
      {
        breakpoint: 941,
        settings: {
          slidesToShow: 7.7,
        },
      },
      {
        breakpoint: 591,
        settings: {
          slidesToShow: 1.96,
        },
      },
    ],
  };

  if (isLoading) {
    return;
  }

  if (error) {
    // @ts-ignore
    navigate(`/error/${error.status}`, { replace: true });
    return;
  }

  return (
    <div
      style={{ pointerEvents: isButtonsDisabled ? "none" : "auto" }}
      className={array.length > 1 ? classes["TopNewsSlider--wrapper"] : classes["TopNewsSlider--wrapper__inPause"]}
    >
      {array.length > 1 && <><button
        className={cn(classes["TopNewsSlider--button__next"], {
          [classes.enabled]: !isButtonsDisabled,
        })}
        onClick={next}
        disabled={isButtonsDisabled}
      ></button><button
        className={cn(classes["TopNewsSlider--button__prev"], {
          [classes.enabled]: !isButtonsDisabled,
        })}
        onClick={previous}
        disabled={isButtonsDisabled}
      ></button></>}
      <Slider
        // @ts-ignore
        ref={(slider) => (sliderRef = slider)}
        className={classes[""]}
        {...settings}
      >
        {isVisibleFakeSlide && array.length > 1 && <div></div>}
        {array.map((item, index) => (
          <NewsItem top={index} variant={"medium"} key={index} news={item} />
        ))}
      </Slider>
    </div>
  );
};

export default TopNewsSlider;
