const { utcToZonedTime, format } = require('date-fns-tz')

export default ({ app }, inject) => {
  inject('jpDateTime', (dateTime) => {
    if (!dateTime) return
    const tempDateTime = new Date(dateTime)
    const timeZone = 'Asia/Tokyo'
    const tempJpDateTime = utcToZonedTime(tempDateTime, timeZone)
    const pattern = 'yyyy/MM/dd HH:mm:ss'
    const jpDateTime = format(tempJpDateTime, pattern, { timeZone })
    return jpDateTime
  })
}
