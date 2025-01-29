// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");
// import { test, expect } from '@playwright/test';
const { test, expect } = require('@playwright/test');

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
  console.log('\n', date, '\n')
  const date_obj = {
      year: date.getFullYear(),
      month: month_days_passed[date.toString().slice(4,7)],
      day: Number(date.toString().slice(8,10)),
      hour: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds()
  }
  const date_number = (date_obj.year * 31536000) + (date_obj.month * 86400) + (date_obj.day * 86400) + (date_obj.hour === 0 ? 1800 : date_obj.hour * 3600) + (date_obj.minutes === 0 ? 60 : date_obj.minutes * 60) + date_obj.seconds
  return date_number
}

async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");

  // test('validate the first 100 articles to be in chronological order', async ({page})=>{
  // })
  let articles_checked = [];
  let titles = [];
  let j = 0;
  while (articles_checked.length < 100) {
    const minutes_text = await page.locator('.age').allTextContents()
    for (let item of await page.locator('.age').all()) {
      titles.push(await item.getAttribute('title'))
    }

    for (let i = 0; i < minutes_text.length; i++) {
      if (articles_checked.length === 100) {
        break
      }
      articles_checked.push({
        item_num: j + 1,
        minutes_ago: minutes_text[i],
        date_time: titles[i]
      })
      j++
    }

    // now click more and grab the next batch while still pushing to articles_checked
    await page.locator('.morelink').click();

  }

  // now we have all 100!!!
  // just compare them and done
  for (let k = 1; k < articles_checked.length; k++) {
    // let d1 = articles_checked[k-1].date_time
    // let d2 = articles_checked[k].date_time
    let d1 = new Date(articles_checked[k-1].date_time.split(' ')[0]+'.500z');
    let d2 = new Date(articles_checked[k].date_time.split(' ')[0]+'.500z');
    // d1 = d1.valueOf();
    // // console.log(d1)
    // d2 = d2.valueOf();
    let nd1 = time_parser(d1);
    let nd2 = time_parser(d2);
    console.log(articles_checked[k].item_num)

    // heres the structure
    // {
    //   item_num: 1,
    //   minutes_ago: '0 minutes ago',
    //   date_time: '2025-01-28T23:42:49 1738107769'
    // },
    expect(nd1).toBeGreaterThan(nd2)
  }

  browser.close();
  context.close();
}

(async () => {
  await sortHackerNewsArticles();
})();
