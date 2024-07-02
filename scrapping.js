import axios from "axios"
import * as cheerio from "cheerio"

// axios.get("https://www.tokopedia.com/search?st=&q=macbook%20m1&srp_component_id=02.01.00.00&srp_page_id=&srp_page_title=&navsource=")
// .then((urlResponse) => {

//     const $ = cheerio.load(urlResponse.data) // "const $" adalah variable dari cheerio

//     $("div.css-1asz3by").each((i, element) => { //"each" adalah looping dari cheerio nya
//         const title = $(element).find("a").attr("title")
//         const price = $(element).find("a").children("div").children(".css-h66vau").text()

//         console.log(`${i + 1}. Nama: ${title}, harga: ${price}`)
//     }) 
// })
async function scrapeData(url) {
    try {
        // Make the HTTP request
        const response = await axios.get(url);

        // Check for successful response
        if (response.status !== 200) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        // Parse the HTML content
        const $ = cheerio.load(response.data);

        // Select the elements you want to scrape (replace with your selectors)
        let scrapedData = [];
        $("div.css-1asz3by").each((_, element) => {
            let title = $(element).find('a').attr("title")
            let price = $(element).find('a').children("div").children(".css-h66vau").text()

            scrapedData.push({ title, price });
        });

        // Return the scraped data
        return scrapedData;
    } catch (error) {
        console.error(error);
        return []; // Return an empty array on error
    }
}

// Example usage: Replace 'https://example.com' with the actual URL
scrapeData("https://www.tokopedia.com/search?st=&q=macbook%20m1&srp_component_id=02.01.00.00&srp_page_id=&srp_page_title=&navsource=")
    .then(data => console.log(data))
    .catch(error => console.error(error)); 

console.log("hello world")