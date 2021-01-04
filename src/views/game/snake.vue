<template>
  <body ref="body">
     <div ref="startPage" class="page startGame">
      <h1>贪吃蛇</h1>
      <div class="startBtn" @click="startBtnClick">开始游戏</div>
      <router-link to="/game">
        <div class="startBtn" @click="endBtnClick">退出游戏</div>
      </router-link>
    </div>
    <div ref="gamingPage" class="page gaming">
      <div class="score">
        <div class="left">
          score:<span ref="numDom" class="num">0</span>
        </div>
        <div ref="pauseBtn" @click="pauseClick" class="pauseBtn">暂停</div>
      </div>
      <div ref="mainGame" @keydown.up="ArrowUp" class="mainGame"></div>
    </div>
    <div ref="endGamePage" class="page endGame">
      <h1>你的最终分数是<span ref="endGameDom" class="num">0</span>分</h1>
      <div ref="reStartBtn" class="reStartBtn" @click="reStartBtnClick">重新开始</div>
    </div>
  </body>
</template>
<script>
export default {
  data () {
    return {
      snake: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
      direction: { x: -1, y: 0 },
      score: 0,
      body: document.querySelector('body'),
      running: false,
      timer: Function // 定时器
    }
  },
  methods: {
    startBtnClick () {
      this.$refs.startPage.style.display = 'none'
      this.$refs.gamingPage.style.display = 'block'
      // setInterval(this.interId, 100)
      this.running = true
      this.timer = setInterval(this.interId, 100)
    },
    endBtnClick () {
      clearInterval(this.interId())
    },
    pauseClick () {
      if (!this.running) {
        this.timer = setInterval(this.interId, 100)
        this.running = true
      } else {
        window.clearInterval(this.timer)
        this.running = false
      }
    },
    renderGezi () {
      for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 15; j++) {
          const gezi = document.createElement('div')
          gezi.className = 'gezi'
          gezi.id = 'x' + j + 'y' + i
          this.$refs.mainGame.appendChild(gezi)
        }
      }
    },
    createSnake () {
      const randomX = parseInt(Math.random() * 13)
      const randomY = parseInt(Math.random() * 20)
      this.snake = []
      for (let i = 0; i < 3; i++) {
        this.snake.push({
          x: randomX + i,
          y: randomY
        })
      }
    },
    renderSnake () {
      this.snake.forEach(function (item, i) {
        const snakeBody = document.querySelector('#x' + item.x + 'y' + item.y)
        snakeBody.className = 'gezi snake'
      })
    },
    renderFood () {
      const randomX = parseInt(Math.random() * 15)
      const randomY = parseInt(Math.random() * 20)
      const foodDIv = document.querySelector('#x' + randomX + 'y' + randomY)
      if (foodDIv.className === 'gezi snake') {
        this.renderFood()
      } else {
        foodDIv.className = 'gezi food'
      }
    },
    isSnake (snakeHeader) {
      const newHeader = document.querySelector('#x' + snakeHeader.x + 'y' + snakeHeader.y)
      if (newHeader.className === 'gezi snake') {
        clearInterval(this.interId())
        this.$refs.gamingPage.style.display = 'none'
        this.$refs.endGamePage.style.display = 'flex'
        this.$refs.endGameDom.innerHTML = this.score
      }
    },
    isFood (snakeHeader) {
      const newHeader = document.querySelector('#x' + snakeHeader.x + 'y' + snakeHeader.y)
      if (newHeader.className === 'gezi food') {
        this.score++
        this.$refs.numDom.innerHTML = this.score
        this.renderFood()
        return true
      }
      return false
    },
    interId () {
      let headerX = this.snake[0].x + this.direction.x
      let headerY = this.snake[0].y + this.direction.y
      if (headerX < 0) {
        headerX = 14
      }
      if (headerX > 14) {
        headerX = 0
      }
      if (headerY < 0) {
        headerY = 19
      }
      if (headerY > 19) {
        headerY = 0
      }
      const snakeHeader = {
        x: headerX,
        y: headerY
      }
      this.snake.unshift(snakeHeader)
      this.isSnake(snakeHeader)
      if (!this.isFood(snakeHeader)) {
        // 将删除的蛇，找到相应的 dom，将其 className 修改为 gezi
        const snakeFooter = this.snake.pop()
        const snakeFooterDiv = document.querySelector('#x' + snakeFooter.x + 'y' + snakeFooter.y)
        snakeFooterDiv.className = 'gezi'
      }
      this.renderSnake()
    },
    reStartBtnClick () {
      location.reload()
    },
    ArrowUp (event) {
      console.log('event')
    }
  },
  created () {},
  mounted () {
    this.renderGezi()
    this.createSnake()
    this.renderSnake()
    this.renderFood()
    document.body.addEventListener('keydown', () => {
      if (event.key === 'ArrowUp' && this.direction.y !== 1) {
        this.direction = { x: 0, y: -1 }
      }
      if (event.key === 'ArrowDown' && this.direction.y !== -1) {
        this.direction = { x: 0, y: 1 }
      }
      if (event.key === 'ArrowLeft' && this.direction.x !== 1) {
        this.direction = { x: -1, y: 0 }
      }
      if (event.key === 'ArrowRight' && this.direction.x !== -1) {
        this.direction = { x: 1, y: 0 }
      }
    })
    syEvent.init(this.body)
    this.body.addEvent('swiperLeft', function () {
      if (this.direction.x !== 1) {
        this.direction = {
          x: -1,
          y: 0
        }
      }
    })
    this.body.addEvent('swiperRight', function () {
      if (this.direction.x !== 1) {
        this.direction = {
          x: 1,
          y: 0
        }
      }
    })
    this.body.addEvent('swiperTop', function () {
      if (this.direction.x !== 1) {
        this.direction = {
          x: 0,
          y: -1
        }
      }
    })
    this.body.addEvent('swiperBottom', function () {
      if (this.direction.x !== 1) {
        this.direction = {
          x: 0,
          y: 1
        }
      }
    })
  }
}
const syEvent = {
  eventAll: {},
  init: function (dom) {
    dom.eventAll = {}
    dom.addEvent = this.addEvent
    dom.emit = this.emit
    dom.removeEvent = this.removeEvent
    dom.touchData = {} // 装触摸事件的数据
    dom.addEventListener('touchstart', function (event) {
      this.touchData.startX = event.touches[0].pageX
      this.touchData.startY = event.touches[0].pageY
    })
    dom.addEventListener('touchmove', function (event) {
      this.touchData.endX = event.touches[0].pageX
      this.touchData.endY = event.touches[0].pageY
    })
    dom.addEventListener('touchend', function (event) {
      var x = this.touchData.endX - this.touchData.startX
      var y = this.touchData.endY - this.touchData.startY
      if (Math.abs(x) > Math.abs(y) && Math.abs(x) > 100) {
        if (x > 0) {
          console.log('向右')
          event.swiperDir = 'swiperRight'
          this.body.emit('swiperRight', event)
        } else {
          console.log('向左')
          event.swiperDir = 'swiperLeft'
          this.body.emit('swiperLeft', event)
        }
      } else if (Math.abs(x) < Math.abs(y) && Math.abs(y) > 100) {
        if (y > 0) {
          console.log('向下')
          event.swiperDir = 'swiperBottom'
          this.body.emit('swiperBottom', event)
        } else {
          console.log('向上')
          event.swiperDir = 'swiperTop'
          this.body.emit('swiperTop', event)
        }
      }
    })
  },
  addEvent: function (eventName, callBackFn) {
    if (this.eventAll[eventName] === undefined) {
      this.eventAll[eventName] = []
    }
    this.eventAll[eventName].push(callBackFn)
  },
  emit: function (eventName, eventMsg) {
    if (this.eventAll[eventName] !== undefined) {
      this.eventAll[eventName].forEach((item, i) => {
        item(eventMsg)
      })
    }
  },
  removeEvent: function (eventName, callBackFn) {
    var that = this
    this.eventAll[eventName].forEach((item, i) => {
      if (item === callBackFn) {
        that.eventAll[eventName].splice(i, 1)
      }
    })
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  font-size: 1rem;
}

.startGame {
  width: 100vw;
  height: 100vh;
  background-color: darkslategray;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  color: #fff;
}

.startGame .startBtn,.endGame .reStartBtn {
  width: 200px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  background-color: lightslategray;
  color: #fff;
  border-radius: 5px;
}

.endGame {
  width: 100vw;
  height: 100vh;
  display: none;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: lightsteelblue;
}

.gaming {
  display: none;
  width: 100vw;
  height: 100vh;
  background-color: black;
  color: #fff;
}

.gaming .score {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  line-height: 50px;
  width: 100vw;
  padding: 0 20px;
}

.gaming .score .pauseBtn {
  width: 80px;
  height: 30px;
  line-height: 30px;
  background-color: #999;
  text-align: center;
  border-radius: 2px;
}

.gaming .mainGame {
  width: 345px;
  height: 460px;
  background-color: #666;
  margin: 30px auto;
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  box-sizing: content-box;
}

.gaming .mainGame .gezi {
  width: 23px;
  height: 23px;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

.gezi {
  width: 23px;
  height: 23px;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

.gaming .mainGame .gezi.snake {
  background-color: #fff;
}

.gaming .mainGame .gezi.snake::before {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  background-color: #ccc;
  animation: snake 0.4s;
  box-sizing: border-box;
}

@keyframes snake {
  from {
    background-color: #fff;
    box-shadow: 0 0 15px rgba(255, 255, 255, 1);
  }
  to {
    background-color: #ccc;
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  }
}

.gaming .mainGame .gezi.food::before {
  content: '';
  width: 100%;
  height: 100%;
  display: block;
  background-color: orangered;
  animation: food 1s alternate infinite;
  box-shadow: 0 0 10px #ffffcc;
}

@keyframes food {
  from {
    transform: scale(1) rotate(0deg);
  }
  to {
    transform: scale(0.7) rotate(360deg);
  }
}
</style>
