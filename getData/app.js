require('babel-polyfill')
const puppeteer = require('puppeteer')
const fs = require('fs')


let dt = new Date()
let nowHour = dt.getHours()
if (nowHour % 1 === 0) {
    getData()
}
async function getData() {
    let jsonDataList = []
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(`http://music.wandhi.com/?name=周杰伦&type=qq`)
    page.on('response', async res => {
        const url = res.url()
        if (url === 'http://music.wandhi.com/') {
            const data = await res.json()
            const list = data.data
            jsonDataList.push(...list)

            function writeData() {
                fs.writeFile('jayjsondata.json', JSON.stringify(jsonDataList, null, 4), (e, result) => {
                    if (e) {
                        console.error(e)
                        return
                    }
                    console.log(result)
                })
            }

            if (list.length >= 10) {
                console.log('下一页')
                setTimeout(() => {
                    page.click('.aplayer-more').catch(e => {
                        writeData()
                    })
                }, 300)
            } else {
                writeData()
                await browser.close()
            }
        }
    })
}