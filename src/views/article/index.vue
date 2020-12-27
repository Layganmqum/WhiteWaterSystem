<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>新闻天天看</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <!-- 数据筛选表单 -->
      <div>
        <el-radio-group v-model="areaType" @change="onTypeChange($event)">
          <el-radio-button border label="toutiao">头条</el-radio-button>
          <el-radio-button border label="shehui">社会</el-radio-button>
          <el-radio-button border label="guonei">国内</el-radio-button>
          <el-radio-button border label="yule">娱乐</el-radio-button>
          <el-radio-button border label="tiyu">体育</el-radio-button>
          <el-radio-button border label="junshi">军事</el-radio-button>
          <el-radio-button border label="keji">科技</el-radio-button>
          <el-radio-button border label="caijing">财经</el-radio-button>
          <el-radio-button border label="shishang">时尚</el-radio-button>
        </el-radio-group>
      </div>
      <!-- /数据筛选表单 -->
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>根据筛选条件共查询到{{articletest.length}}条结果</span>
      </div>
      <!-- 数据列表 -->
      <!--
        Table 表格组件
        1、把需要展示的数组列表数据绑定给 table 组件的 data 属性
          注意：不需要 v-for 遍历，组件自己会遍历
        2、设计表格列 el-table-column
          width：设置列的宽度
          label：设置列标题
          prop：设置要渲染的列表项数据字段，只能展示文本
        3、表格列默认只能渲染普通文本，如果需要展示其他表格列模板
          需要自定义
       -->
      <el-table
        class= "list-table"
        :data= "articletest.slice((this.currentPage - 1) * 5, (this.currentPage) * 5)"
        stripe
        size="medium"
        style="width: 100%">
        <el-table-column
          class="tableColumn"
          width="300px"
          prop="thumbnail_pic_s"
          label="封面">
          <template slot-scope="scope">
            <!-- <img v-if="scope.row.cover.image[0]" class="article-cover" :src="scope.row.cover.image[0]" alt=""> -->
            <img class="article-cover" :src="scope.row.thumbnail_pic_s">
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          width="300px"
          prop="category"
          label="类型">
          <!-- 如果需要在自定义列模板中获取当前遍历项数据
          那么就在 template 上声明 slot-scope="scope" -->
          <!-- <template> -->
            <!-- <el-tag :type="articleStatus[scope.row.status].type">{{ articleStatus[scope.row.status].text }}</el-tag> -->
            <!-- <el-tag :type="articleStatus[scope.row.status].type">{{ articleStatus[scope.row.status].text }}</el-tag> -->
            <!-- <el-tag v-if="scope.row.status === 0" type="warning">草稿</el-tag>
            <el-tag v-else-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-else-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-else-if="scope.row.status === 3" type="danger">审核失败</el-tag>
            <el-tag v-else-if="scope.row.status === 4" type="info">已删除</el-tag> -->
          <!-- </template> -->
        </el-table-column>
        <el-table-column
          width="300px"
          prop="date"
          label="发布时间">
        </el-table-column>
      </el-table>
      <!-- /数据列表 -->

      <!-- 列表分页：5条进行分页 -->
      <el-pagination
        layout= "prev, pager, next"
        background
        :page-size="5"
        :total= "articletest.length"
        @current-change= "onCurrentChange"/>
      <!-- /列表分页 -->
    </el-card>
  </div>
</template>

<script>
import { getArticles1 } from '@/api/article'
export default {
  name: 'ArticleIndex',
  components: {},
  props: {},
  data () {
    return {
      currentPage: 1,
      areaType: 'toutiao',
      articles: [ // 文章数据列表
        {
          date: '',
          title: '王小虎',
          status: 0,
          pubdate: '2016-05-02 12:12:12'
        },
        {
          date: '',
          title: '王小虎',
          status: 1,
          pubdate: '2016-05-02 12:12:12'
        },
        {
          date: '',
          title: '王小虎',
          status: 2,
          pubdate: '2016-05-02 12:12:12'
        },
        {
          date: '',
          title: '王小虎',
          status: 3,
          pubdate: '2016-05-02 12:12:12'
        },
        {
          date: '',
          title: '王小虎',
          status: 4,
          pubdate: '2016-05-02 12:12:12'
        }
      ],
      articletest: []
      // articleStatus: [
      //   { status: 0, text: '草稿', type: 'info' }, // 索引值0
      //   { status: 1, text: '待审核', type: '' }, // 索引值1
      //   { status: 2, text: '审核通过', type: 'success' }, // 索引值2
      //   { status: 3, text: '审核失败', type: 'warning' }, // 索引值3
      //   { status: 4, text: '已删除', type: 'danger' } // 索引值4
      // ]
    }
  },
  computed: {},
  created () {
    this.loadArticles()
  },
  beforeMount () {},
  mounted () {},
  watch: {},
  methods: {
    loadArticles () {
      getArticles1(this.areaType).then((res) => {
        this.articletest = res.data.result.data
        console.log(this.articletest)
        // 可以分别调用不同type值的新闻
      })
    },
    onTypeChange (event) {
      console.log(event)
      this.areaType = event
      this.loadArticles()
    },
    onCurrentChange (page) {
      this.currentPage = page
    }
  }
}
</script>

<style scoped lang='less'>
.filter-card{
  font-size: 14px;
  margin-bottom: 30px;
}
.list-table{
  margin-bottom: 20px;
  font-size: 16px;
  .tableColumn{
    padding: 0 10px;
  }
}
.article-cover{
  width: 100px;
  background-size: cover;
}
</style>
