import axios from 'axios'

export let closingPrice = ''

export const update = async (event) => {
  try {
    // let id = event.message.text.replace('代碼', '')
    const id = event.message.text
    let name = ''
    console.log(id)
    const { data } = await axios.get('https://openapi.twse.com.tw/v1/exchangeReport/STOCK_DAY_AVG_ALL')
    console.log(data.length)
    console.log('查詢中')

    for (let i = 0; i < data.length; i++) {
      // console.log(datas.length)
      if (id === data[i].Code) {
        console.log(data[i].Code)
        closingPrice = data[i].ClosingPrice
        console.log(closingPrice)
        console.log('已回覆')
        name = data[i].Code + data[i].Name + '-收盤價'
      } else if (id === data[i].Name) {
        console.log(data[i].Code)
        closingPrice = data[i].ClosingPrice
        console.log(closingPrice)
        console.log('已回覆')
        name = data[i].Code + data[i].Name + '-收盤價'
      }
      //  else {
      //   closingPrice = '查無資料，請重新輸入代碼或名稱，謝謝'
      // }
    }

    console.log(name)
    console.log(closingPrice)
    event.reply(name + closingPrice)
  } catch (error) {
    console.log(error)
  }
}
