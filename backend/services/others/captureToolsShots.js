import puppeteer from "puppeteer-extra"; 
import StealthPlugin from "puppeteer-extra-plugin-stealth";


puppeteer.use(StealthPlugin());

const takeScreenshot = async (url, filePath) => {
  try {
  
    const browser = await puppeteer.launch({
      headless: true, 
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );
    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
      Connection: "keep-alive",
    });

  
    await page.setViewport({
      width: 1200, 
      height: 800, 
    });

 
    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 0,
    });

   
    await page.waitForSelector("body"); 

 
    await page.screenshot({
      path: filePath,
      clip: {
        x: 0,
        y: 0,
        width: 1200, 
        height: 800, 
      },
    });

    console.log("Screenshot taken successfully");
    await browser.close();
    return true;
  } catch (error) {
    console.error("Error capturing screenshot:", error);
  }
};

export { takeScreenshot };
