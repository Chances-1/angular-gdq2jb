export class WeatherModel {
  date        :   Date;
  temperature :   WeatherData;
  humidity    :   WeatherData;
}
export class WeatherData{
  high  : number;
  low   : number;
}