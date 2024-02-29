import { getEventsFromGoogleCalendar } from 'path/to/getEventsFromGoogleCalendarFile'

const accessToken =
  'ya29.a0AfB_byDUAVRDVis3ov8HCIffbLSOz30hJf8SUEGi-PTUdi-kpnx5Iis65-32m4M8oQdZN3QM-4PZvKwZ5IBPmkt99eOobnLxqqdXMU-BO6N4vISMmYAXDzQXZWeeHDrbLtTuPgRDp13UhOqDrIxV-pN-2c2lSRww0AaCgYKARYSARASFQHGX2Mi_oEB0xST_FxHM1qSI5Ulvg0169'

getEventsFromGoogleCalendar(accessToken)
  .then(events => {
    console.log('Fetched events:', events)
  })
  .catch(error => {
    console.error('Error fetching events:', error)
  })
