# ddate
Converts a given timestamp into a discordian date representation. The timestamp has to come as payload in ms or if the payload is `null`, the current date will be converted. The payload of the output contains the current date as string. In addition to that the message also has a property `msg.date` which contains the date machine readable as follows:

```json
{
  "strDate":"Setting Orange, the 60th day of Chaos in the YOLD 3186. Celebrate St. Tib's Day!",
  "day":60,
  "dayOfWeek":4,
  "strDayOfWeek":"Setting Orange",
  "season":0,
  "strSeason":"Chaos",
  "yold":3186,
  "isHoliday":true,
  "strHoliday":"St. Tib's Day!"
}
```
`season` and `dayofWeek` both start at 0.
`strHoliday` is only present if it is actually a holiday.

`msg.input` contains the original timestampe used for conversion.

The code for conversion comes from [Rosetta Code](https://rosettacode.org/wiki/Discordian_date#JavaScript). Except of a few minor changes, all credits belong to the original author.

**Hail Eris! All Hail Discordia!**