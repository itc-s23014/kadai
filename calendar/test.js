import { google } from 'googleapis'

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']
const GOOGLE_PROJECT_ID = 'ancient-ivy-415007' // 自分のGoogle CloudプロジェクトIDに置き換える

const auth = new google.auth.GoogleAuth({
  keyFile:
    './config/client_secret_84532789310-uj6k7agccich18sptu2r401co3ck5l0f.apps.googleusercontent.com.json',
  scopes: SCOPES,
  projectId: GOOGLE_PROJECT_ID
})

const calendar = google.calendar({
  version: 'v3',
  auth: auth
})

const GOOGLE_CALENDAR_ID =
  'std.it-college.ac.jp_tnoeduuvi6ao087fg0j9u1m770@group.calendar.google.com' // 自分のGoogle CalendarのIDに置き換える
const res = await calendar.events.list({
  calendarId: GOOGLE_CALENDAR_ID,
  timeMin: new Date().toISOString(),
  maxResults: 10,
  orderBy: 'startTime'
})

const { summary, description, timeZone, updated, items } = res.data

const events = items.map(
  ({
    id,
    updated,
    summary,
    organizer: { displayName },
    start: { date: startDate }
  }) => ({
    id,
    lastUpdated: updated,
    displayName,
    startDate,
    summary
  })
)
