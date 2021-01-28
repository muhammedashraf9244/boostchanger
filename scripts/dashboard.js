// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const sys_info = require('systeminformation')

// close app if user hit close button
const closeApp = document.getElementById('close');
closeApp.addEventListener('click', () => {
  window.close();
});

//os name
if (localStorage.getItem("os_name")) {
  document.getElementById("os_name").innerHTML = localStorage.getItem("os_name")
} else {
  sys_info.osInfo().then((os_name) => {
    localStorage.setItem("os_name", os_name.distro)
    document.getElementById("os_name").innerHTML = localStorage.getItem("os_name")
  })
}

//Kernel name
if (localStorage.getItem("kernel")) {
  document.getElementById("kernel").innerHTML = localStorage.getItem("kernel")
} else {
  sys_info.osInfo().then((kernel) => {
    localStorage.setItem("kernel", kernel.kernel)
    document.getElementById("kernel").innerHTML = localStorage.getItem("kernel")
  })
}

// Up time 
if (localStorage.getItem("up_time")) {
  document.getElementById("up_time").innerHTML = localStorage.getItem("up_time")
} else {
  var timeInSec = sys_info.time().uptime // time will be in Sec
  var timeInHour = timeInSec / 3600 // change time from Sec to Hours
  var timeResult = timeInHour.toFixed(2) + " Hours"
  localStorage.setItem("up_time", timeResult)
  document.getElementById("up_time").innerHTML = localStorage.getItem("up_time")
}

// cpu name
if (localStorage.getItem("cpu_name")) {
  document.getElementById("cpu_name").innerHTML = localStorage.getItem("cpu_name")
} else {
  sys_info.cpu().then((cpu_name) => {
    var cpuname = cpu_name.manufacturer + " " + cpu_name.brand + " " + cpu_name.speed + "GHz"
    localStorage.setItem("cpu_name", cpuname)
    document.getElementById("cpu_name").innerHTML = localStorage.getItem("cpu_name")
  })
}

// cpu core
if (localStorage.getItem("cpu_core")) {
  document.getElementById("cpu_core").innerHTML = localStorage.getItem("cpu_core")
} else {
  sys_info.cpu().then((cpu_core) => {
    var cpuCore = "Physical Cores: " + cpu_core.physicalCores
    localStorage.setItem("cpu_core", cpuCore)
    document.getElementById("cpu_core").innerHTML = localStorage.getItem("cpu_core")
  })
}

// cpu vendor
if (localStorage.getItem("cpu_vendor")) {
  document.getElementById("cpu_vendor").innerHTML = localStorage.getItem("cpu_vendor")
} else {
  sys_info.cpu().then((cpu_vendor) => {
    var cpuVendor = cpu_vendor.vendor
    localStorage.setItem("cpu_vendor", cpuVendor)
    document.getElementById("cpu_vendor").innerHTML = localStorage.getItem("cpu_vendor")
  })
}

// Total memory
if (localStorage.getItem("mem_total")) {
  document.getElementById("mem_total").innerHTML = localStorage.getItem("mem_total")
} else {
  sys_info.mem().then(
    (total_memory) => {
      var total_memoryInByte = total_memory.total
      var total_memoryInGB = total_memoryInByte / Math.pow(1024, 3)
      var total = "Total: " + total_memoryInGB.toFixed(0) + " GB"
      localStorage.setItem("mem_total", total)
      document.getElementById("mem_total").innerHTML = localStorage.getItem("mem_total")
    })
}

// memory Type
if (localStorage.getItem("mem_type")) {
  document.getElementById("mem_type").innerHTML = localStorage.getItem("mem_type")
} else {
  sys_info.memLayout().then(
    (memory_type) => {
      //console.log(memory_type[0].type);
      localStorage.setItem("mem_type", memory_type[0].type)
      document.getElementById("mem_type").innerHTML = localStorage.getItem("mem_type")
    })
}

// memory Clock speed
if (localStorage.getItem("mem_speed")) {
  document.getElementById("mem_speed").innerHTML = localStorage.getItem("mem_speed")
} else {
  sys_info.memLayout().then(
    (memory_type) => {
      //console.log(memory_type[0].clockSpeed);
      localStorage.setItem("mem_speed", memory_type[0].clockSpeed)
      document.getElementById("mem_speed").innerHTML = localStorage.getItem("mem_speed")
    })
}

// GPU

sys_info.graphics().then(
  (GPU) => {
    for (let i = 0; i < GPU.controllers.length; i++) {
      document.getElementById("GPU").children[i].innerHTML = GPU.controllers[i].model
    }
  })

// Local IP
if (localStorage.getItem("local_ip")) {
  document.getElementById("local_ip").innerHTML = "Local IP: " + localStorage.getItem("local_ip")
} else {
  sys_info.networkInterfaces().then((data) => {
    localStorage.setItem("local_ip", data[1].ip4)
    document.getElementById("local_ip").innerHTML = "Local IP: " + localStorage.getItem("local_ip")
  })
}

// Public IP 
if (localStorage.getItem("public_ip")) {
  document.getElementById("public_ip").innerHTML = "Public IP: " + localStorage.getItem("public_ip")
} else {
  const publicIp = require('public-ip');
  publicIp.v4().then((ip_public) => {
    localStorage.setItem("public_ip", ip_public)
    document.getElementById("public_ip").innerHTML = "Public IP: " + localStorage.getItem("public_ip")
  })
}
