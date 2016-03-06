import responseTime from 'response-time'
import StatsD from 'node-statsd'

let stats = new StatsD({
  host: 'grafana-graphite-45577f49-1.52442bd4.cont.dockerapp.io',
})

export default responseTime((req, res, time) => {
  if (req.route && req.route.path) {
    let stat = (req.method + req.route.path).toLowerCase()
      .replace(/[:\.]/g, '')
      .replace(/\//g, '_')
    stats.timing(stat, time)
  }
})
