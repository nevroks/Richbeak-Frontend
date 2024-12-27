import PieChart from "../../../../components/ui/charts/PieChart/PieChart.tsx";
import classes from "./style.module.css";
import cn from "classnames";
import { statisticsApi } from "../../../../utils/api/statistics/statisticsApi.ts";

const StatisticsPageUniqueUsersCountriesGraph = () => {
  const {
    data: uniqueUsersCountriesResponse,
    isLoading,
    error,
  } = statisticsApi.useGetUniqueUsersCountriesQuery();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка при загрузке данных</div>;
  }

  if (
    !uniqueUsersCountriesResponse ||
    uniqueUsersCountriesResponse.length === 0
  ) {
    return <div>По текущим параметрам нет данных</div>;
  }

  const pieChartData = uniqueUsersCountriesResponse.map((country) => ({
    id: country.country,
    value: country.count,
    percent: country.percent,
  }));

  const sortedData = [...pieChartData].sort((a, b) => b.value - a.value);

  return (
    <div className={classes["StatisticsPageUniqueUsersCountriesGraph"]}>
      <h2 className={classes["StatisticsPageUniqueUsersCountriesGraph__title"]}>
        Страны по количеству уникальных пользователей
      </h2>
      <div
        className={classes["StatisticsPageUniqueUsersCountriesGraph__graph"]}
      >
        <PieChart
          enableArcLabels={false}
          enableArcLinkLabels={false}
          colors={[
            "rgb(213, 217, 250)",
            "rgb(192, 198, 249)",
            "rgb(171, 179, 246)",
            "rgb(150, 160, 244)",
            "rgb(129, 140, 241)",
          ]}
          innerRadius={0.65}
          cornerRadius={12}
          data={sortedData}
          height={380}
          width={380}
          label={(d: {
            id: string;
            value: number;
            data: { percent: number };
          }) => `${d.id}: ${d.value} (${d.data.percent}%)`}
        />
        <div
          className={
            classes[
              "StatisticsPageUniqueUsersCountriesGraph__graph--legendList"
            ]
          }
        >
          {sortedData.map((country, index) => {
            return (
              <div
                key={country.id}
                className={
                  classes[
                    "StatisticsPageUniqueUsersCountriesGraph__graph--legendList__item"
                  ]
                }
              >
                <p
                  className={cn(
                    "text-semi-large",
                    "text-500",
                    classes[
                      "StatisticsPageUniqueUsersCountriesGraph__graph--legendList__item--country"
                    ]
                  )}
                >
                  <span
                    style={
                      index === 0
                        ? { backgroundColor: "rgb(213, 217, 250)" }
                        : index === 1
                        ? { backgroundColor: "rgb(192, 198, 249)" }
                        : index === 2
                        ? { backgroundColor: "rgb(171, 179, 246)" }
                        : index === 3
                        ? { backgroundColor: "rgb(150, 160, 244)" }
                        : { backgroundColor: "rgb(129, 140, 241)" }
                    }
                    className={
                      classes[
                        "StatisticsPageUniqueUsersCountriesGraph__graph--legendList__item--country__color"
                      ]
                    }
                  ></span>
                  {country.id}
                </p>
                <p className={cn("text-medium", "text-400")}>
                  {country.value} чел
                </p>
                <p className={cn("text-medium", "text-400")}>
                  {country.percent}%
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatisticsPageUniqueUsersCountriesGraph;
