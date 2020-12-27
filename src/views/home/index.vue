<template>
  <div class="home-container">
    <el-card class="box-card" shadow="always">
      <div slot="header" class="clearfix">
        <span>历史今天</span>
      </div>
      <el-timeline :reverse="reverse">
        <el-timeline-item
          v-for="(activity, index) in historyToday" :key="index">
          <el-card shadow="hover">
            <h4>{{activity.title}}</h4>
            <p>{{activity.date}}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>
<script>
import { getTodayOnhistory } from '@/api/home'
export default {
  // 指定 name 选项的另一个好处是便于调试
  // 有名字的组件有更友好的警告信息
  // 当在有 vue-devtools，未命名组件将显示成 <AnonymousComponent>, 非语义化
  // 通过提供 name 选项，可以获得更有语义信息的组件树
  // 结论：给一个组件起名字非常有必要，尽量不要让组件的名字重复
  name: 'HomeIndex',
  components: {},
  props: {},
  data () {
    return {
      historyToday: [],
      reverse: true,
      activities: [{
        content: '活动按期开始',
        timestamp: '2018-04-15'
      }, {
        content: '通过审核',
        timestamp: '2018-04-13'
      }, {
        content: '创建成功',
        timestamp: '2018-04-11'
      }]
    }
  },
  computed: {},
  created () {
    this.loadHistory()
  },
  mounted () {},
  watch: {},
  methods: {
    loadHistory () {
      getTodayOnhistory(new Date()).then((res) => {
        this.historyToday = res.data.result
        this.historyToday.splice(0, this.historyToday.length - 5)
        console.log(this.historyToday)
      })
    }
  }
}
</script>
<style scoped lang="less">
*{
  padding: 0%;
  margin: 0%;
  box-sizing: border-box;
}

.home-container{
  font-size: 16px;
  .box-card {
  width: 40%;
  }
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

</style>
