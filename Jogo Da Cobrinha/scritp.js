document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')
  
    const width = 10
    let currentIndex = 0 
    let appleIndex = 0 
    let currentCobra = [2,1,0] 
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0
  
  
   
    function startGame() {
      currentCobra.forEach(index => squares[index].classList.remove('cobra'))
      squares[appleIndex].classList.remove('apple')
      clearInterval(interval)
      score = 0
      randomApple()
      direction = 1
      scoreDisplay.innerText = score
      intervalTime = 1000
      currentSobra = [2,1,0]
      currentIndex = 0
      currentCobra.forEach(index => squares[index].classList.add('cobra'))
      interval = setInterval(moveOutcomes, intervalTime)
    }
  
  
    
    function moveOutcomes() {
  
      
      if (
        (currentCobra[0] + width >= (width * width) && direction === width ) || 
        (currentCobra[0] % width === width -1 && direction === 1) || 
        (currentCobra[0] % width === 0 && direction === -1) || 
        (currentCobra[0] - width < 0 && direction === -width) ||  
        squares[currentCobra[0] + direction].classList.contains('cobra')
      ) {
        return clearInterval(interval) 
      }
  
      const tail = currentCobra.pop() 
      squares[tail].classList.remove('cobra')  
      currentCobra.unshift(currentCobra[0] + direction) 
  

      if(squares[currentCobra[0]].classList.contains('apple')) {
        squares[currentCobra[0]].classList.remove('apple')
        squares[tail].classList.add('cobra')
        currentCobra.push(tail)
        randomApple()
        score++
        scoreDisplay.textContent = score
        clearInterval(interval)
        intervalTime = intervalTime * speed
        interval = setInterval(moveOutcomes, intervalTime)
      }
      squares[currentCobra[0]].classList.add('cobra')
    }
  

    function randomApple() {
      do{
        appleIndex = Math.floor(Math.random() * squares.length)
      } while(squares[appleIndex].classList.contains('cobra')) 
      squares[appleIndex].classList.add('apple')
    }
  
  
    function control(e) {
      squares[currentIndex].classList.remove('cobra')
  
      if(e.keyCode === 39) {
        direction = 1
     } else if (e.keyCode === 38) {
        direction = -width 
      } else if (e.keyCode === 37) {
        direction = -1 
      } else if (e.keyCode === 40) {
        direction = +width 
      }
    }
  
    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)
  })