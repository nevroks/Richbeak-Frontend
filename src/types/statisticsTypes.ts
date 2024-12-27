export interface IUniqueUserCountry {
  country: string;
  count: number;
  percent: number;
}

export interface IUniqueUser {
  date: string;
  count: number;
}

export interface IRequestPerSecond {
  time: string;
  date: string;
  count: number;
}
