import io from 'socket.io-client'
// var SSCD = require('sscd').sscd
const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})
socket.on('showCanvas', uniqueCanvas => {
  const canvas = document.getElementById(uniqueCanvas)
  const ctx = canvas.getContext('2d')
  let base_image = new Image()

  base_image.src =
    'http://icons.iconarchive.com/icons/iconarchive/blue-election/64/Election-Thumbs-Up-Outline-icon.png'
  base_image.onload = function() {
    let xpos = Math.random() * 100 + Math.random() * 100 + 50
    let ypos = Math.random() * 100 + Math.random() * 100 + 50

    // world.add(new SSCD.Circle(new SSCD.Vector(xpos, ypos), 75))
    // if (world.test_collision(new SSCD.Vector(xpos, y))) {
    //   console.log('Collision!')
    // } else {
    //   world.add(new SSCD.Circle(new SSCD.Vector(xpos, ypos), 75))
    // }
    // if (world.test_collision(new SSCD.Vector(300, 300))) {
    //   console.log('this should not display unless I add a circle')
    // }

    ctx.drawImage(base_image, xpos, ypos)

    setTimeout(function() {
      ctx.clearRect(xpos, ypos, 120, 120)
    }, 3000)
  }
})
// socket.on('doAnimation', uniqueCanvas => {
//   var sun = new Image()
//   var moon = new Image()
//   var earth = new Image()
//   function init() {
//     sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png'
//     moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png'
//     earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png'
//     window.requestAnimationFrame(draw)
//   }

//   function draw() {
//     var ctx = document.getElementById(uniqueCanvas).getContext('2d')

//     ctx.globalCompositeOperation = 'destination-over'
//     ctx.clearRect(0, 0, 300, 300) // clear canvas

//     ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'
//     ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)'
//     ctx.save()
//     ctx.translate(150, 150)

//     // Earth
//     var time = new Date()
//     ctx.rotate(
//       2 * Math.PI / 60 * time.getSeconds() +
//         2 * Math.PI / 60000 * time.getMilliseconds()
//     )
//     ctx.translate(105, 0)
//     ctx.fillRect(0, -12, 40, 24) // Shadow
//     ctx.drawImage(earth, -12, -12)

//     // Moon
//     ctx.save()
//     ctx.rotate(
//       2 * Math.PI / 6 * time.getSeconds() +
//         2 * Math.PI / 6000 * time.getMilliseconds()
//     )
//     ctx.translate(0, 28.5)
//     ctx.drawImage(moon, -3.5, -3.5)
//     ctx.restore()

//     ctx.restore()

//     ctx.beginPath()
//     ctx.arc(150, 150, 105, 0, Math.PI * 2, false) // Earth orbit
//     ctx.stroke()

//     ctx.drawImage(sun, 0, 0, 300, 300)

//     window.requestAnimationFrame(draw)
//   }

//   init()
// })
export default socket
