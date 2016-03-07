import responseTime from 'response-time'
import StatsD from 'node-statsd'

// let stats = new StatsD({
//   host: 'stats.tala.is',
// })

export default responseTime((req, res, time) => {
  try {
    let stat = (req.method + req.route.path).toLowerCase()
      .replace(/[:\.]/g, '')
      .replace(/\//g, '_')
    // stats.timing(stat, time)
  } catch (err) {
    console.log(err)
  }
})
