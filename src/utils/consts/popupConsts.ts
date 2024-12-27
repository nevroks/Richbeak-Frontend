// export const popupConsts = {
//     price: ['Стоимость в BTC', 'Стоимость в ETH', 'ATH', 'ATL', '24ч макс.', '24ч мин.', 'From ATH', 'From ATL'],
//     changeInPrice: ['1ч %', '24ч %', '7д %', '30д %', '60д %', '90д %', 'YTD %', '1ч % в BTC', '24ч % в BTC', '1ч % в ETH', '24ч % в ETH'],
//     capitalization: ['Капитализация рынка', 'Fully Diluted Mcap'],
//     volume: ['Объем (24ч)', 'Объем (7д)', 'Объем (30д)', 'Объем/Mcap'],
//     reserve: ['В обращении', 'Весь запас', 'Макс. запас'],
//     others: ['Audited', 'Dominance %', 'Total Value Locked'],
// }

// export const popupConsts = {
//
//     changeInPrice: ['1ч %', '24ч %', '7д %', '30д %', '60д %', '90д %',],
//     capitalization: ['Капитализация рынка', 'Капитализ. при полной эмиссии'],
//     volume: ['Объем (24ч)', 'Объем (7д)', 'Объем (30д)'],
//     reserve: ['В обращении', 'Весь запас', 'Макс. запас'],
//     others: ['Доминирование %', 'Общ. заблок. стоимость'],
// }

export const popupConsts = {
  changeInPrice: [
    { name: "marcetCap.ColumnOneHour", id: "percent_change_1h" },
    { name: "marcetCap.ColumnTwentyFourHour", id: "percent_change_24h" },
    { name: "marcetCap.ColumnSevenDays", id: "percent_change_7d" },
    { name: "marcetCap.ColumnOneMonth", id: "percent_change_30d" },
    { name: "marcetCap.ColumnTwoMonth", id: "percent_change_60d" },
    { name: "marcetCap.ColumnThreeMonth", id: "percent_change_90d" },
  ],
  capitalization: [
    { name: "marcetCap.ColumnMarket", id: "market_cap" },
    { name: "marcetCap.ColumnMcap", id: "fully_diluted_market_cap" },
  ],
  volume: [
    { name: "marcetCap.ColumnVolumeTwentyFour", id: "volume_24h" },
    { name: "marcetCap.ColumnVolumeSevenDays", id: "volume_7d" },
    { name: "marcetCap.ColumnVolumeMonth", id: "volume_30d" },
  ],
  reserve: [
    { name: "marcetCap.ColumnCirculation", id: "circulating_supply" },
    { name: "marcetCap.ColumnTotalSupply", id: "total_supply" },
    { name: "marcetCap.ColumnMaxSupply", id: "max_supply" },
  ],
  others: [
    { name: "marcetCap.ColumnDominance", id: "market_cap_dominance" },
    { name: "marcetCap.ColumnLocked", id: "tvl" },
  ],
};
