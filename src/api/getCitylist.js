import request from '@/utils/request'

// 获取城市列表
export function getCitylist() {
  return request({
    url: 'https://study.duyiedu.com/api/citylist',
    method: 'get'
  })
}

/**
 * 获取王者荣耀列表
 */

export function getHeroListName() {
  return request({
    url: 'https://study.duyiedu.com/api/herolist',
    method: 'get'
  })
}
