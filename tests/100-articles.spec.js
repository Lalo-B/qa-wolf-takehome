// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");
const { test, expect } = require('@playwright/test');


async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");

  // test('Check the first 100 articles to see if they are in correct
  // chronological order', async ({ page }) => {

    // collecting the information on the first 100 articles
    // step 1: set up the collection of info on the first 100 articles ↓
  let articles_checked = [];
  let titles = [];
  let j = 0;

  // heres where we look at the site and grab the info we want using
  // the class name
  while (articles_checked.length < 100) {
    const minutes_text = await page.locator('.age').allTextContents()
    for (let item of await page.locator('.age').all()) {
      titles.push(await item.getAttribute('title'))
    }
    // now go through the collected information and save
    // the titles which we'll use to check the order
    // and the minutes saved for easier development
    for (let i = 0; i <= minutes_text.length - 1; i++) {
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
    titles = [];
    await page.locator('.morelink').click();
  }


  for (let k = 1; k < articles_checked.length; k++) {
    let d1 = new Date(articles_checked[k - 1].date_time.split(' ')[0] + '.500z');
    let d2 = new Date(articles_checked[k].date_time.split(' ')[0] + '.500z');

    // heres the structure
    // {
    //   item_num: 1,
    //   minutes_ago: '0 minutes ago',
    //   date_time: '2025-01-28T23:42:49 1738107769'
    // },
    expect(d1 >= d2).toBeTruthy();
  }


  browser.close();
  context.close();
}; //)
// }
test('Check the first 100 articles to be in order',async ()=> sortHackerNewsArticles());
// (async () => {
//   await sortHackerNewsArticles();
// })();

// My contact information:
// Email: gerardobonillajr.dev@gmail.com
// My Github: @Lalo-B
