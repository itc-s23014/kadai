const { google } = require('googleapis')
const fs = require('fs')

// 認証情報の読み込み
const credentials = JSON.parse(fs.readFileSync('credentials.json'))

// 認証情報の設定
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/calendar.readonly']
});

// GoogleカレンダーAPIクライアントの作成
const calendar = google.calendar({ version: 'v3', auth })

// Googleカレンダーからイベントを取得する関数
    async function getEvents() {
  try {
    const now = new Date().toISOString();
    const events = await calendar.events.list({
      calendarId: 'std.it-college.ac.jp_tnoeduuvi6ao087fg0j9u1m770@group.calendar.google.com', // カレンダーIDを指定
      ...options() // options関数の呼び出し
    });
  } catch (error) {
    console.error('Error fetching events:', error);
  }
}

// options関数の定義
const options = () => ({
  timeMin: now,
  maxResults: 5,
  singleEvents: true,
  orderBy: 'startTime'
});


    const items = events.data.items
    const formattedEvents = items.map(event => {
      const start = event.start.dateTime || event.start.date
      const end = event.end.dateTime || event.end.date
      return {
        start: start,
        end: end,
        summary: event.summary
      }
    })

    let response = '[Closest 5 events]\n'
    formattedEvents.forEach(event => {
      if (event.start.includes('T')) {
        // イベントの開始時刻に"T"が含まれる場合
        const startDate = new Date(event.start).toLocaleDateString()
        const startTime = new Date(event.start).toLocaleTimeString()
        const endTime = new Date(event.end).toLocaleTimeString()
        response += `${startDate} ${startTime} ~ ${endTime}\n${event.summary}\n\n`
      } else {
        // 終日イベントの場合
        const startDate = new Date(event.start).toLocaleDateString()
        response += `${startDate} All Day\n${event.summary}\n\n`
      }
    })

    console.log(response)
  } catch (error) {
    console.error('Error fetching events:', error)
  }
}

getEvents()
