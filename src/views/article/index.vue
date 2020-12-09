<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <!-- 数据筛选表单 -->
      <el-form ref="form" :model="form" label-width="40px" size="mini">
        <el-form-item label="状态">
          <el-radio-group v-model="form.resource">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
            <el-radio label="已删除"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="form.region" placeholder="请选择频道">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.date1"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">筛选</el-button>
        </el-form-item>
      </el-form>
      <!-- /数据筛选表单 -->
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>根据筛选条件共查询到46147条结果</span>
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
        class="list-table"
        :data="articles"
        stripe
        size="mini"
        style="width: 100%">
        <el-table-column
          prop="data"
          label="封面">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          label="状态">
          <!-- 如果需要在自定义列模板中获取当前遍历项数据
          那么就在 template 上声明 slot-scope="scope" -->
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="warning">草稿</el-tag>
            <el-tag v-else-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-else-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-else-if="scope.row.status === 3" type="danger">审核失败</el-tag>
            <el-tag v-else-if="scope.row.status === 4" type="info">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <!-- 自定义表格列模板，template -->
          <template>
            <el-button
              size="mini"
              circle
              type="primary"
              icon="el-icon-edit"></el-button>
            <el-button
              size="mini"
              type="danger"
              circle
              icon="el-icon-delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /数据列表 -->

      <!-- 列表分页：10条进行分页 -->
      <el-pagination
        layout="prev, pager, next"
        background
        :total="1000">
      </el-pagination>
      <!-- /列表分页 -->
    </el-card>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  name: 'ArticleIndex',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
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
      ]
    }
  },
  computed: {},
  created () {
    this.loadArticles()
  },
  mounted () {},
  watch: {},
  methods: {
    loadArticles () {
      getArticles().then(res => {
        // this.articles = res.data.data.results
      })
    },
    onSubmit () {
      console.log('submit!')
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
}
</style>
