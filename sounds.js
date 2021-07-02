$(function() {
  let soundPlaying = false
  $('#sound-player').on('click', () => {
    if (soundPlaying) {
      soundPlaying = false
      stopBGMs()
      $('#sound-player .mute').css({ display: 'block' })
    } else {
      soundPlaying = true
      playBGMs()
      $('#sound-player .mute').css({ display: 'none' })
    }
  })

  const playBGMs = () => {
    $('#bgms').children('audio').each((i, audio) => {
      audio.volume = $(audio).attr('volume')
      audio.play()
    })
  }
  const stopBGMs = () => {
    $('#bgms').children('audio').each((i, audio) => {
      audio.pause()
      audio.currentTime = 0
    })
  }

  setInterval(() => {
    if (!soundPlaying) return
    if (Math.random() < 0.5) {
      const soundOwl = document.getElementById('sound-owl')
      soundOwl.volume = 0.3
      soundOwl.play()
      if (Math.random() < 0.5) {
        setTimeout(() => {
          soundOwl.currentTime = 0
          soundOwl.play()
        }, 2000)
      }
    }
  }, 11000)

  setInterval(() => {
    if (!soundPlaying) return
    if (Math.random() < 0.6) {
      const soundWhale = document.getElementById('sound-whale')
      soundWhale.volume = 0.3
      soundWhale.play()
    }
  }, 13000)
})
