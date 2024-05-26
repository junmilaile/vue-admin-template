<template>
  <div class="sech-container">
    <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" label="全选" />
    <div v-for="(item, index) in checkboxData" :key="index" class="item" @click="handleClick(index)">
      <div class="left">
        <el-checkbox v-model="item.check" />
      </div>
      <div class="right">
        {{ item.cname }}
      </div>
      <div :class="{ 'adm-selector-check-mark-wrapper': item.check }">
        <i class="el-icon-check" />
      </div>
    </div>
  </div>
</template>

<script>
import { getHeroListName } from '@/api/getCitylist'
export default {
  data() {
    return {
      checkboxData: [],
      checkList: []
    }
  },
  computed: {
    checkAll: {
      get() {
        console.log(this.checkList)
        console.log(this.checkboxData)
        return this.checkboxData.length === this.checkList.length
      },
      set(value) {
        if (value) {
          this.checkList = []
          this.checkboxData.forEach((item) => {
            item.check = true
            this.checkList.push({ id: item.moss_id, check: true })
          })
        } else {
          this.checkboxData.forEach((item) => {
            item.check = false
          })
          this.checkList = []
        }
      }
    },
    isIndeterminate() {
      return this.checkList.length > 0 && this.checkList.length < this.checkboxData.length
    }
  },
  async created() {
    const result = await getHeroListName()
    this.checkboxData = result.data
    this.checkboxData.length = 3
    for (const item of this.checkboxData) {
      this.$set(item, 'check', true)
      this.checkList.push({ id: item.moss_id, check: item.check })
    }
  },
  methods: {
    handleClick(index) {
      console.log(index)
      this.checkboxData[index].check = !this.checkboxData[index].check

      if (this.checkboxData[index].check) {
        this.checkList.push({ id: this.checkboxData[index].moss_id, check: true })
      } else {
        this.checkList = this.checkList.filter((item) => item.id !== this.checkboxData[index].moss_id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sech-container {
  padding: 16px;
  background: #f5f5f5;
  .item {
    display: flex;
    margin-top: 10px;
    width: 320px;
    height: 200px;
    background-color: #fff;
    border-radius: 4px;
    position: relative;
    cursor: pointer;
    .left {
      margin-right: 10px;
    }
    .adm-selector-check-mark-wrapper {
      position: absolute;
      top: 0;
      right: 0;
      width: 20px;
      height: 20px;
      border-top: 10px solid #1677ff;
      border-left: 10px solid transparent;
      border-right: 10px solid #1677ff;
      border-bottom: 10px solid transparent;
      i {
        color: #fff;
        position: absolute;
        top: -4px;
        font-size: 12px;
        left: 4px;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>
