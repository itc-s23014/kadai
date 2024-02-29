// getEventsFromGoogleCalendar.js

import { google } from 'googleapis'

export async function getEventsFromGoogleCalendar (accessToken) {
  try {
    const calendar = google.calendar({ version: 'v3', auth: accessToken })

    const events = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime'
    })

    return events.data.items
  } catch (error) {
    console.error('Error fetching events from Google Calendar API:', error)
    throw error
  }
}
