import axios from 'axios'

export let closingPrice = ''

export const update = async (event) => {
  try {
    const input = event.message.text
    let name = ''
    const { data } = await axios.get('https://openapi.twse.com.tw/v1/exchangeReport/STOCK_DAY_AVG_ALL')

    for (let i = 0; i < data.length; i++) {
      // console.log(datas.length)
      if (input === data[i].Code) {
        closingPrice = data[i].ClosingPrice
        name = data[i].Code + data[i].Name + '-收盤價'
      } else if (input === data[i].Name) {
        closingPrice = data[i].ClosingPrice
        name = data[i].Code + data[i].Name + '-收盤價'
      }
    }
    event.reply(name + closingPrice)
  } catch (error) {
    console.log(error)
  }
}
