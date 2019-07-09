import io from 'socket.io-client'
// var SSCD = require('sscd').sscd
const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})
socket.on('addThumb', uniqueCanvas => {
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

socket.on('addHeart', uniqueCanvas => {
  const canvas = document.getElementById(uniqueCanvas)
  const ctx = canvas.getContext('2d')
  let base_image = new Image()

  base_image.src =
    'http://icons.iconarchive.com/icons/designbolts/free-valentine-heart/64/Heart-icon.png'
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
socket.on('addSmile', uniqueCanvas => {
  const canvas = document.getElementById(uniqueCanvas)
  const ctx = canvas.getContext('2d')
  let base_image = new Image()

  base_image.src =
    'http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/64/Emotes-face-laugh-icon.png'
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

export default socket
