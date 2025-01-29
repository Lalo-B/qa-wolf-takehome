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


  for (let k = 1; k < articles_checked.length; k++) {
    let d1 = new Date(articles_checked[k-1].date_time.split(' ')[0]+'.500z');
    let d2 = new Date(articles_checked[k].date_time.split(' ')[0]+'.500z');

    // heres the structure
    // {
    //   item_num: 1,
    //   minutes_ago: '0 minutes ago',
    //   date_time: '2025-01-28T23:42:49 1738107769'
    // },
    expect(d1).toBeGreaterThanOrEqual(d2)
  }


  browser.close();
  context.close();
}

(async () => {
  await sortHackerNewsArticles();
})();
