const sudo = require('sudo-prompt');
var fs = require('fs');
const readline = require('readline');
const sys_info = require('systeminformation');

// close app if user hit close button
const closeApp = document.getElementById('close');
closeApp.addEventListener('click', () => {
  window.close();
})

// Get CPU speed for the first time
sys_info.cpuCurrentSpeed().then((cpu_speed) => {
  var cpu_speedInMHz = cpu_speed.avg * 1000
  document.getElementById('cpu_MHz').innerHTML = cpu_speedInMHz + " MHz";
})
// CPU speed with interval
setInterval(() => {
  sys_info.cpuCurrentSpeed().then((cpu_speed) => {
    var cpu_speedInMHz = cpu_speed.avg * 1000 //cpu_speed.avg = cpu speed in GHz
    document.getElementById('cpu_MHz').innerHTML = cpu_speedInMHz + " MHz";
  })
}, 1000)

// CPU Temperature for the first Time
sys_info.cpuTemperature((cpu_temp) => {
  console.log(cpu_temp.main);
  document.getElementById("cpu-temp").innerHTML = "CPU Temperature: " + cpu_temp.main + "&#8451;"
})

//sudo-prompt needs always options with the name
var options = {
  name: 'Boost Changer'
};
var no_turbo = readline.createInterface({
  input: fs.createReadStream('/sys/devices/system/cpu/intel_pstate/no_turbo')
});
// function checked which state has no_turbo 0 or 1 when user starts this app. 
no_turbo.on('line', (line) => {
  if (line == 0) {
    document.getElementById("turbo_toggle").checked = true;
  } else {
    document.getElementById("turbo_toggle").checked = false;
  }
  document.getElementById("toggle_change").addEventListener('change', () => {
    var turbo_toggle = document.getElementById("turbo_toggle");
    if (turbo_toggle.checked == false) {
      sudo.exec("echo 1 > /sys/devices/system/cpu/intel_pstate/no_turbo", options, (stderr) => {
        if (stderr instanceof Error) { throw stderr; }
        new Notification('Boost Changer', { body: 'Turbo Boost is now OFF' })
      })
    } else {
      sudo.exec("echo 0 > /sys/devices/system/cpu/intel_pstate/no_turbo", options, (stderr) => {
        if (stderr instanceof Error) { throw stderr }
        new Notification('Boost Changer', { body: 'Turbo Boost is now ON' })
      })
    }
  })
})

var badgeTag = document.getElementById('bdg');
var max_perf = readline.createInterface({
  input: fs.createReadStream('/sys/devices/system/cpu/intel_pstate/max_perf_pct')
});
// function checked which state has no_turbo 0 or 1 when user starts this app. 
max_perf.on('line', (line) => {
  if (line == 30) {
    badgeTag.innerHTML = "&nbsp;Power Save";
  } else if (line == 50) {
    badgeTag.innerHTML = "&nbsp;Balance";
  } else if (line == 70) {
    badgeTag.innerHTML = "&nbsp;Performance";
  } else {
    badgeTag.innerHTML = "&nbsp;Ultra";
  }
})
document.getElementById('btn-save').addEventListener('click', () => {
  sudo.exec("echo 30 > /sys/devices/system/cpu/intel_pstate/max_perf_pct", options, (stderr) => {
    if (stderr instanceof Error) { throw stderr; }
    badgeTag.innerHTML = "&nbsp;Power Save";
  })
});
document.getElementById('btn-balance').addEventListener('click', () => {
  sudo.exec("echo 50 > /sys/devices/system/cpu/intel_pstate/max_perf_pct", options, (stderr) => {
    if (stderr instanceof Error) { throw stderr; }
    badgeTag.innerHTML = "&nbsp;Balance";
  })
});
document.getElementById('btn-perf').addEventListener('click', () => {
  sudo.exec("echo 70 > /sys/devices/system/cpu/intel_pstate/max_perf_pct", options, (stderr) => {
    if (stderr instanceof Error) { throw stderr; }
    badgeTag.innerHTML = "&nbsp;Performance";
  })
});
document.getElementById('btn-ultra').addEventListener('click', () => {
  sudo.exec("echo 100 > /sys/devices/system/cpu/intel_pstate/max_perf_pct", options, (stderr) => {
    if (stderr instanceof Error) { throw stderr; }
    badgeTag.innerHTML = "&nbsp;Ultra";
  })
});
