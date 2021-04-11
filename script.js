(_ => {

  const musicContainer = document.getElementById('music-container')
  const playBtn = document.getElementById('play')
  const prevBtn = document.getElementById('prev')
  const nextBtn = document.getElementById('next')
  const audio = document.getElementById('audio')
  const progress = document.getElementById('progress')
  const progressContainer = document.getElementById('progress-container')
  const title = document.getElementById('title')
  const cover = document.getElementById('cover')
  const songs = ['hey', 'summer', 'ukulele']
  
  let songIndex = 2
  
  const loadSong = song => {
    title.innerText = song
    audio.src = `music/${song}.mp3`
    cover.src = `images/${song}.jpg`
  }
  
  const playSong = _ => {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    audio.play()
  }
  
  const pauseSong = _ => {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    audio.pause()
  }
  
  const prevSong = _ => {
    songIndex--
    if (songIndex < 0) songIndex = songs.length - 1
    loadSong(songs[songIndex])
    playSong()
  }
  
  const nextSong = _ => {
    songIndex++
    if (songIndex > songs.length - 1) songIndex = 0
    loadSong(songs[songIndex])
    playSong()
  }
  
  const updateProgress = evt => {
    const { duration, currentTime } = evt.srcElement
    const progressPercent = currentTime / duration * 100
    progress.style.width = `${progressPercent}%`
  }
  
  const setProgress = evt => {
    const width = evt.currentTarget.clientWidth
    const clickX = evt.offsetX
    audio.currentTime = clickX / width * audio.duration
  }
  
  playBtn.addEventListener('click', _ => 
    musicContainer.classList.contains('play')
      ? pauseSong()
      : playSong()
  )
  
  prevBtn.addEventListener('click', prevSong)
  nextBtn.addEventListener('click', nextSong)
  audio.addEventListener('timeupdate', updateProgress)
  progressContainer.addEventListener('click', setProgress)
  audio.addEventListener('ended', nextSong)
  
  loadSong(songs[songIndex])
  
})()
