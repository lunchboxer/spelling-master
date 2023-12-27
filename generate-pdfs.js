import puppeteer from 'puppeteer'
import dotenv from 'dotenv'

const LEVELS = 5
const WEEKS = 36
const SERVER = 'http://localhost:5173'
const listPDFsDirectory = './static/lists-pdf/'

dotenv.config()

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_EXECUTABLE_PATH,
  headless: 'new',
})

const page = await browser.newPage()

console.log('Generating PDFs for lists...')

for (let level = 1; level <= LEVELS; level++) {
  console.log('Generating PDFs for level ' + level)
  for (let week = 1; week <= WEEKS; week++) {
    console.log(`Generating PDFs for level ${level}, week ${week}`)
    await page.goto(`${SERVER}/${level}/${week}`)
    await page.pdf({
      preferCSSPageSize: true,
      format: 'A4',
      path: `${listPDFsDirectory}/spelling-level-${level}-week-${week}.pdf`,
      displayHeaderFooter: false,
    })
  }
}
console.log('All Done!')

await browser.close()
