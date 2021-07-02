$(function() {
  let soundPlaying = false
  $('#sound-player').on('click', function() {
    soundPlaying = !soundPlaying
  })

  const fishEllipse = $('#fish-ellipse')
  fishEllipse.children('div').each((i, fish) => {
    const $fish = $(fish)
    $fish.attr('id', `fish${i}`)
    const src = $fish.attr('src')
    const classes = $fish.attr('class').split(' ')
    const duration = parseInt(classes.find(c => c.startsWith('duration')).replace('duration', ''))
    const width    = parseInt(classes.find(c => c.startsWith('w')).replace('w', ''))
    const height   = parseInt(classes.find(c => c.startsWith('h')).replace('h', ''))
    const scale    = parseInt(classes.find(c => c.startsWith('s')).replace('s', '')) / 100
    const delay    = Math.floor(Math.random() * duration)

    const $ve = $('<div>', { class: 'vertical animation single' })
    const $he = $('<div>', { class: 'horizontal animation single' })
    const $re = $('<div>', { class: 'rotate animation double' })
    const $img = $('<img>', { class: 'animation single', src: src })

    $fish.css({ width: '100%', height: '100%', transform: `scale(${scale})` })
    $ve.css({ 'animation-duration': `${duration / 2}s`, 'animation-delay': `${-delay}s` })
    $he.css({ 'animation-duration': `${duration / 2}s`, 'animation-delay': `${-delay - (duration / 4)}s` })
    $re.css({ 'animation-duration': `${duration}s`, 'animation-delay': `${-delay}s`})
    $img.css({
      width: `${width}px`, height: `${height}px`,
      left: `${-width / 2}px`, top: `${-height / 2}px`,
      'animation-duration': `${duration / 2}s`,
      'animation-delay': `${-delay}s`
    })

    $img.appendTo($re)
    $re.appendTo($he)
    $he.appendTo($ve)
    $ve.appendTo($fish)
  })

  const removeBubbleAfterAnimation = (element, duration) => {
    setTimeout(() => element.remove(), duration)
  }
  setInterval(() => {
    const $vbubble = $('<div>').attr('class', 'v-bubble')
    const $hbubble = $('<div>').attr('class', 'h-bubble')

    const size = (5 + Math.random() * 30) + 'px'
    $hbubble.css({
      left: (2 + Math.random() * 98) + 'vw',
      width: size, height: size,
      'animation-duration': `${(2 + Math.random() * 4)}s`
    })
    const vduration = (4 + Math.random() * 11)
    $vbubble.css({
      'animation-duration': `${vduration}s`
    })

    $hbubble.appendTo($vbubble)
    $('#partials').append($vbubble)

    removeBubbleAfterAnimation($vbubble, (vduration + 2) * 1000)
  }, 1500)

  const shootingStar = (sound) => {
    const $shootingStar = $('<div>').attr('class', 'shooting-star')
    $shootingStar.css('top', (-400 + Math.random() * 1000) + 'px')
    $('#partials').append($shootingStar)

    if (soundPlaying && sound) {
      const soundShootingStar = document.getElementById('sound-shooting-star')
      soundShootingStar.volume = 0.3
      soundShootingStar.play()
    }
    setTimeout(() => {
      $('.shooting-star').get(0).remove()
    }, 1100)
  }
  const meteorShower = () => {
    if (soundPlaying) {
      const soundMeteorShower = document.getElementById('sound-meteor-shower')
      soundMeteorShower.volume = 0.7
      soundMeteorShower.play()
    }
    for (let i = 0; i < 50; i++) {
      const wait = Math.random() * 5600
      setTimeout(() => { shootingStar(false) }, wait)
    }
  }
  setInterval(() => {
    if (Math.random() < 0.12) shootingStar(true)
    if (Math.random() < 0.01) meteorShower()
  }, 2500)
  setTimeout(() => { meteorShower() }, 10000 + Math.random() * 30000)
})
