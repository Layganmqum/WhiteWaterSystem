<template>
  <div class="game-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>贪吃蛇</span>
        <!-- <router-link to="/snake">
          <el-button @click="startSnakeGame" style="float: right; padding: 3px 1rem; font-size: 2rem;" type="text">开始</el-button>
        </router-link> -->
        <el-button @click="startSnakeGame" style="float: right; padding: 3px 1rem; font-size: 2rem;" type="text">开始</el-button>
      </div>
      <div class="demo-image">
        <div class="block">
          <el-image
            style="width: 100%; height: 200px"
            :src="require('@/views/game/snack.jpeg')"
            fit="contain"></el-image>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'GameIndex',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {
    ...mapState({
      snake: false
    })
  },
  created () {},
  mounted () {},
  watch: {},
  methods: {
    startSnakeGame () {
      // this.snake = true
      console.log('开始游戏')
    }
  }
}
</script>

<style scoped lang='less'>
*{
  padding: 0%;
  margin: 0%;
}
body{
  font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
}
.box-card{
  width: 40%;
  height: auto;
  font-size: 2rem;
}
</style>
