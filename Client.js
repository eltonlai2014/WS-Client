// get API TOKEN from MXview
const TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjc1MTUxNjAxLCJqdGkiOiJhODZlZGZiZTQ4YTc0ZDk2YjkyZjFmMWViODRiMGY4NTAxZjA1Y2EwIn0.eLDU446jd0cbKcB4iWb3_h-ZslXVvO4Rmo-_nZV1hFU`;
const io = require("socket.io-client");
const socket = io("wss://127.0.0.1/?token=" + TOKEN
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
  if (typeof data.trigger_detail.events !== 'undefined') {
    let events = data.trigger_detail.events;
    // console.log(events);
  }

  else if (typeof data.trigger_detail.site_changed !== 'undefined') {
    let site_changed = data.trigger_detail.site_changed;
    // console.log(site_changed);
  }

});

socket.on('connect_error', err => {
  console.log('connect_error', err);
})

socket.on('disconnect', () => {
  console.log('disconnected');
});

process.on('uncaughtException', (err) => {
  console.error(err);
  try {
      let killTimer = setTimeout(() => {
          process.exit(1);
      }, 1000);
      killTimer.unref();
  } catch (e) {
      logger.error('error when exit', e.stack);
  }
});