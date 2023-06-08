import puppeteer from "puppeteer";

const main = async (asd: string) => {
  console.log(asd);

  // Launch the browser
  const browser = await puppeteer.launch({headless: false});

  // Create a page
  const page = await browser.newPage();

  // Go to your site
  await page.goto('https://tankionline.com/play/');
  await page.evaluate(/*javascript*/ `
    localStorage.setItem("entrance_hash_key", "bi8ns1eYy8ZaY3EmwWqF2TXW0lZPZ5huVzxwi54dq61kuzwL6NoMnxXZAHKwoWA6");
  ;`)

  // Close browser.
  //await browser.close();
}

main("Aloha");
