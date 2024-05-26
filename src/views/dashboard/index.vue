<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <el-select v-model="value" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCitylist } from '@/api/getCitylist'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name'])
  },
  created() {
    getCitylist().then((res) => {
      this.citylistData = res.data
      // this.handleData(this.citylistData)
      this.options = this.handleOptions(this.citylistData)
      // this.options = this.citylistData
    })
  },
  data() {
    return {
      options: [],
      citylistData: [],
      value: '选项1'
    }
  },
  methods: {
    handleData(arr) {
      for (const item of arr) {
        if (item.children.length > 0) {
          item.labldeName = []
          for (const item1 of item.children) {
            item.labldeName.push(item1.label)
          }
        }
      }
    },
    handleOptions(arr) {
      const result = []

      for (const item of arr) {
        result.push({
          value: item.value,
          label: item.label
        })
        delete item.children
      }
      return result
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
