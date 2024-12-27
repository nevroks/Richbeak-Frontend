import { appPublicationsTimeSpan } from "../../../../types/types.ts";
import { useEffect, useState } from "react";
import classes from "./style.module.css";
import PublicationTimeSpanDropdown from "../../../../components/ui/dropdown/publicationtimespandropdown/PublicationTimeSpanDropdown.tsx";
import BarChart from "../../../../components/ui/charts/BarChart/BarChart.tsx";
import cn from "classnames";
import { statisticsApi } from "../../../../utils/api/statistics/statisticsApi.ts";
import { parseDate } from "../../../../utils/helpers/parseDate.ts";

const StatisticsPageUniqueUsersGraph = () => {
  const [sliderTimeSpan, setSliderTimeSpan] =
    useState<appPublicationsTimeSpan>("week");

  const { data: uniqueUsersData, isLoading } =
    statisticsApi.useGetUniqueUsersQuery();

  const [data, setData] = useState<{ label: string; count: number }[]>([]);

  useEffect(() => {
    if (uniqueUsersData) {
      const now = new Date();

      if (sliderTimeSpan === "week") {
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(now.getDate() - 7); // Последние 7 дней

        const dailyData = uniqueUsersData
          .filter((item) => {
            const itemDate = parseDate(item.date);
            return itemDate >= oneWeekAgo && itemDate <= now;
          })
          .sort(
            (a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime()
          )
          .map((item) => ({
            label: item.date,
            count: item.count,
          }));

        setData(dailyData);
      } else if (sliderTimeSpan === "month") {
        const weeksData = [];
        const startDate = new Date(now);
        startDate.setDate(now.getDate() - 27); // 27 дней назад

        const currentEndDate = new Date(startDate);
        currentEndDate.setDate(currentEndDate.getDate() + 6);

        for (let i = 0; i < 4; i++) {
          const weekSum = uniqueUsersData
            .filter((item) => {
              const itemDate = parseDate(item.date);
              return itemDate >= startDate && itemDate <= currentEndDate;
            })
            .reduce((sum, current) => sum + current.count, 0);

          weeksData.push({
            label: `${startDate.toLocaleDateString()} - ${currentEndDate.toLocaleDateString()}`,
            count: weekSum,
          });

          startDate.setDate(startDate.getDate() + 7);
          currentEndDate.setDate(currentEndDate.getDate() + 7);
        }

        setData(weeksData);
      }
    }
  }, [uniqueUsersData, sliderTimeSpan]);

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
    <div className={classes["StatisticsPageUniqueUsersGraph__wrapper"]}>
      <nav className={classes["StatisticsPageUniqueUsersGraph__navigation"]}>
        <h2>Количество уникальных пользователей</h2>
        <PublicationTimeSpanDropdown
          contentArr={[
            { id: "week", name: 'За неделю' },
            {
              id: "month",
              name: 'За месяц',
            },
          ]}
          timeSpan={sliderTimeSpan}
          setTimeSpan={setSliderTimeSpan}
        />
      </nav>

      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <BarChart
          className={classes["StatisticsPageUniqueUsersGraph__graph"]}
          height={330}
          theme={theme}
          data={data}
          tooltip={(e) => (
            <div
              className={
                classes["StatisticsPageUniqueUsersGraph__graph--tooltip"]
              }
            >
              <div
                className={
                  classes[
                    "StatisticsPageUniqueUsersGraph__graph--tooltip__time"
                  ]
                }
              >
                <p className={cn("text-semi-small", "text-500")}>
                  {e.data.label}
                </p>
              </div>
              <p
                className={cn(
                  "text-500",
                  "text-medium",
                  classes[
                    "StatisticsPageUniqueUsersGraph__graph--tooltip__requests"
                  ]
                )}
              >
                <span>{e.data.count}</span> Уникальных пользователей
              </p>
            </div>
          )}
          padding={0.05}
          colors={["rgba(111,125,246,0.53)", "rgba(111, 125, 246, 1)"]}
          colorBy="id"
          hoverColor={"rgba(111, 125, 246, 1)"}
          keys={["count"]}
          indexBy="label"
          axisBottom={{
            tickSize: 0,
            tickPadding: 16,
            legendPosition: "middle",
            legendOffset: 40,
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 20,
          }}
          borderRadius={6}
          margin={{ top: 50, right: 0, bottom: 50, left: 50 }}
          label={(d: { id: string; value: number }) => `${d.value}`}
        />
      )}
    </div>
  );
};

export default StatisticsPageUniqueUsersGraph;
