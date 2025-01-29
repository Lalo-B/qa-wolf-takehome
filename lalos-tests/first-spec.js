// import { test, expect } from "@playwright/test";

const { time } = require("console");
// import {pulled_data} from './data.js';
const {pulled_data} = require('./data');


// 3 clicks on more get to 100
// then check each post for ' xx minutes ago'
// compare arr[i].'min ago' to arr[i+1].'min ago'
// const elements = await page.locator('a', {hasText: })
// test('first item', async({page})=> {
//   await page.goto("https://news.ycombinator.com/newest");
//   await expect(page).toHaveTitle
// })

// const heyo = new Date('2025-01-29T00:15:48.500Z');
// const heyo3 = new Date('2025-01-29T01:41:19.500Z');
// 2025-01-29T01:31:43.500Z
// const heyo2 = new Date('2025-01-28T23:40:51.500z');
// const heyo4 = parseInt(1738107651, 10);
// const heyo5 = parseInt(1738110445, 10);
{/*  title="2025-01-29T00:27:25 1738110445" 1hour ago*/}
{/*  title="2025-01-28T23:31:48 1738107108" 2 hour ago*/}

// const heyo1 = '2025-01-29T00:03:28';
const time_parser = (date) => {
    const month_days_passed = {
        Jan: 0,
        Feb: 31,
        Mar: 59,
        Apr: 90,
        May: 120,
        Jun: 151,
        Jul: 181,
        Aug: 212,
        Sep: 243,
        Oct: 273,
        Nov: 304,
        Dec: 334
    }
    // console.log('\n', date, '\n')
  const date_obj = {
      year: date.getFullYear(),
      month: month_days_passed[date.toString().slice(4,7)],
      day: Number(date.toString().slice(8,10)),
      hour: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds()
  }
//   console.log(date_obj.day, date_obj.hour , date_obj.minutes , date_obj.seconds)
  const date_number = (date_obj.year * 31536000) + (date_obj.month * 86400) + (date_obj.day * 86400) + (date_obj.hour === 0 ? 3600 : date_obj.hour * 3600) + (date_obj.minutes === 0 ? 60 : date_obj.minutes * 60) + date_obj.seconds
  return date_number
}

// console.log(time_parser(heyo))
// console.log(time_parser(heyo3))
// console.log(time_parser(heyo) > time_parser(heyo3))
// console.log(heyo4)
// console.log(heyo5)

// console.log(heyo4 > heyo5)

// {
//     item_num: 30,
//     minutes_ago: '49 minutes ago',
//     date_time: '2025-01-28T23:40:51 1738107651'
//   }
//   {
//     item_num: 31,
//     minutes_ago: '53 minutes ago',
//     date_time: '2025-01-29T00:27:25 1738110445'
//   }

// 2025-01-29T00:05:51.500Z


// 2025-01-29T01:31:43.500Z

// console.log(time_parser(heyo))
// let comparison = 0;
// let num = 1;
// for(let i = 0; i <= 100; i++){
//   // await page.getByText(`${num}.`).filter({age:})
// }
// const elements = await page.getByText(`${num}.`)
// console.log(elements)

// test('100');
// expect(locator).toHaveCount(100);




// function parseDateToSeconds(dateString) {
//     const [isoDate, timestamp] = dateString.split(' ');

//     // Convert ISO date to Unix timestamp in seconds
//     const isoDateSeconds = Math.floor(new Date(isoDate + 'Z').getTime() / 1000);

//     // Ensure both values are numbers
//     const numericTimestamp = parseInt(timestamp, 10);

//     // Choose the most accurate representation
//     return numericTimestamp > 0 ? numericTimestamp : isoDateSeconds;
// }

let updated_data = [];
// console.log(pulled_data)
for(let i = 0; i < pulled_data.length; i++){
    updated_data.push({
        id: i+1,
        time_in_sec: new Date(pulled_data[i].date_time.split(' ')[0]+'.500z')
    })
}
// console.log(updated_data)
for(let i = 1; i < updated_data.length; i++){
    if(updated_data[i-1].time_in_sec > updated_data[i].time_in_sec === false){
        console.log(updated_data[i-1], updated_data[i])
    }
    console.log(updated_data[i-1].time_in_sec > updated_data[i].time_in_sec)
}
// time_parser(updated_data)
// console.log(updated_data)
