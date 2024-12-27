import BarChart from "../../../../components/ui/charts/BarChart/BarChart.tsx";
import PublicationTimeSpanDropdown from "../../../../components/ui/dropdown/publicationtimespandropdown/PublicationTimeSpanDropdown.tsx";
import { useEffect, useId, useState } from "react";
import { appPublicationsTimeSpan } from "../../../../types/types.ts";
import cn from "classnames";
import classes from "./style.module.css";
/* import { messages } from "../../../../utils/consts/languages.ts"; */
import { statisticsApi } from "../../../../utils/api/statistics/statisticsApi.ts";
import { parseDate } from "../../../../utils/helpers/parseDate.ts";

type TimeData = {
  time?: string;
  date: string;
  count: number;
};

const StatisticsPageRequestsPerSecondGraph = () => {
  const [sliderTimeSpan, setSliderTimeSpan] =
    useState<appPublicationsTimeSpan>("week");
  const uniqueID = useId();

  const {
    data: requestsPerSecondData,
    isLoading,
    error,
  } = statisticsApi.useGetRequestsPerSecondQuery(/* sliderTimeSpan */);

  const [data, setData] = useState<TimeData[]>([]);

  useEffect(() => {
    if (requestsPerSecondData) {
      const now = new Date();
      let transformedData: TimeData[] = [];

      if (sliderTimeSpan === "day") {
        transformedData = requestsPerSecondData;
      } else if (sliderTimeSpan === "week") {
        const dailyCounts: { [key: string]: number } = {};
        requestsPerSecondData.forEach((item) => {
          const date = item.date;
          if (!dailyCounts[date]) {
            dailyCounts[date] = 0;
          }
          dailyCounts[date] += item.count;
        });

        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(now.getDate() - 7);

        for (let i = 1; i <= 7; i++) {
          const day = new Date(oneWeekAgo);
          day.setDate(oneWeekAgo.getDate() + i);

          const dateString = day
            .toISOString()
            .split("T")[0]
            .split("-")
            .reverse()
            .join(".");
          const count = dailyCounts[dateString] || 0;

          transformedData.push({
            date: dateString,
            count: count,
          });
        }

        transformedData.sort(
          (a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime()
        );
      }

      setData(transformedData);
    }
  }, [requestsPerSecondData, sliderTimeSpan]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка при загрузке данных</div>;
  }

  if (!data || data.length === 0) {
    return <div>По текущим параметрам нет данных</div>;
  }

  const theme = {
    axis: {
      domain: {
        line: {
          stroke: "var(--gray-600-color)",
          strokeWidth: 1,
        },
      },
    },
    grid: {
      line: {
        stroke: "var(--gray-400-color)",
        strokeWidth: 0.5,
      },
    },
  };

  return (
    <div className={classes["StatisticsPageRequestsPerSecondGraph__wrapper"]}>
      <nav
        className={classes["StatisticsPageRequestsPerSecondGraph__navigation"]}
      >
        <h2>Количество запросов в секунду</h2>
        <PublicationTimeSpanDropdown
          contentArr={[
            { id: "day", name: 'За день' },
            { id: "week", name: 'За неделю' },
          ]}
          timeSpan={sliderTimeSpan}
          setTimeSpan={setSliderTimeSpan}
        />
      </nav>
      <BarChart
        className={
          sliderTimeSpan === "day"
            ? classes["StatisticsPageRequestsPerSecondGraph__graph"]
            : classes["StatisticsPageUniqueUsersGraph__graph"]
        }
        height={330}
        theme={theme}
        data={data}
        tooltip={(e) => {
          return (
            <div
              className={
                classes["StatisticsPageRequestsPerSecondGraph__graph--tooltip"]
              }
            >
              <div
                className={
                  classes[
                    "StatisticsPageRequestsPerSecondGraph__graph--tooltip__time"
                  ]
                }
              >
                <p className={cn("text-semi-small", "text-500")}>
                  {e.data.date}
                </p>
                {sliderTimeSpan === "day" && (
                  <p className={cn("text-semi-small", "text-500")}>
                    {e.data.time}
                  </p>
                )}
              </div>
              <p
                className={cn(
                  "text-500",
                  "text-medium",
                  classes[
                    "StatisticsPageRequestsPerSecondGraph__graph--tooltip__requests"
                  ]
                )}
              >
                <span>{e.data.count}</span>
                Запросы в секунду
              </p>
            </div>
          );
        }}
        padding={0.15}
        colors={["rgba(111,125,246,0.53)", "rgba(111, 125, 246, 1)"]}
        colorBy="id"
        hoverColor={"rgba(111, 125, 246, 1)"}
        keys={["count"]}
        indexBy={sliderTimeSpan === "day" ? "time" : "date"}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickPadding: 20,
        }}
        borderRadius={6}
        margin={{ top: 50, right: 0, bottom: 50, left: 50 }}
        label={(d: { id: string; value: number }) => `${uniqueID}-${d.value}`}
      />
    </div>
  );
};

export default StatisticsPageRequestsPerSecondGraph;
