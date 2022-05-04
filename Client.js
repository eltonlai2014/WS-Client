// get API TOKEN from MXview
const TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjQyNzYxNjQzLCJqdGkiOiJmODE0ODE4MWUxNzIyOWJhNmJjZWQ5NjJlMTY4MGQzMjMzYzk2MGJlIn0.lz32A0BuapqSitfX2xr6kLAnAKiZi0B9GbfY8gzIl1U`;
const io = require("socket.io-client");
const socket = io("wss://10.123.35.122/?token=" + TOKEN
  , {
    reconnectionDelay: 10000,
    reconnection: true,
    transports: ['websocket'],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false
  });

socket.on("connect", () => {
  console.log('connect');
});

// handle MXview TRIGGER Event
socket.on("TRIGGER", data => {
  console.log('TRIGGER', data);
  // parse event by type
  if (typeof data.trigger_detail.events !== 'undefined') {
    let events = data.trigger_detail.events;
    if (!Array.isArray(events)) {
      events = [events];
    }
    for (let i = 0; i < events.length; i++) {
      analyzeEvent(events[i]);
    }
  }

});

function analyzeEvent(event) {
	// https://demo-sites.mxview.io/apiGuide#event-types
  const siteId = event.site_id;
  const type = event.type;
  console.log('analyzeEvent', siteId, type);
  switch (type) {
    case 0x00010001: // ICMP unreachable
    case 0x00010006: // Power Down
    case 0x00010007: // SNMP unreachable
    case 0x0001000D: // availability under threshold
    case 0x0001000E: // incorrect power type
    case 0x00010010: // DDoS under attack
    case 0x00010011: // Firewall under attack
    case 0x00010012: // Trusted access violation
    case 0x00010013: // Too many login lock
    case 0x00020005: // Input bandwidth over
    case 0x00020006: // Input bandwidth under
    case 0x00020007: // Output bandwidth over
    case 0x00020008: // Output bandwidth under
    case 0x00020009: // Input packet error over
    case 0x0002000A: // Output packet error over
      if (event.detector !== 2) {

      }
      break;
    case 0x00010008: // v3 trap parse error

      break;
    case 0x80010001: // ICMP reachable
    case 0x80010006: // Power Up
    case 0x80010007: // SNMP unreachable
    case 0x8001000D: // availability under threshold
    case 0x8001000E: // incorrect power type
    case 0x80010010: // DDoS under attack
    case 0x80010011: // Firewall under attack
    case 0x80010012: // Trusted access violation
    case 0x80010013: // Too many login lock
    case 0x80020005: // Input bandwidth over
    case 0x80020006: // Input bandwidth under
    case 0x80020007: // Output bandwidth over
    case 0x80020008: // Output bandwidth under
    case 0x80020009: // Input packet error over
    case 0x8002000A: // Output packet error over
      if (event.detector !== 2) {

      }
      break;
    case 0x80010008: // v3 trap parse error
      break;
    default:
      if (type >= 0x10100 && type < 0x20000) { // a custom event is triggered

      } else if (type >= 0x80010100 && type < 0x80020000) { // a custom event is recovered

      }
      break;
  }
}

socket.on('connect_error', err => {
  console.log('connect_error', err);
})

socket.on('disconnect', () => {
  console.log('disconnected');
});