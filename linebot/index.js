import 'dotenv/config'
import linebot from 'linebot'
import { scheduleJob } from 'node-schedule'
import * as closingPrice from './data/closingPrice.js'

// https://crontab.guru/once-a-day
scheduleJob('0 0 * * *', () => {
  closingPrice.update()
})

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', event => {
  if (event.message.type === 'text') {
    closingPrice.update(event)
    console.log('準備查詢')
  }
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
