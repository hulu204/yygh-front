import request from '@/utils/request'

export default {
  getHospSetList(current,limit,searchObj) {
    return request({
      url: `/admin/hosp/hospitalSet/findPageHospSet/${current}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  deleteHospSet(id) {
    return request({
      url: `/admin/hosp/hospitalSet/delHospSet/${id}`,
      method: 'delete'
    })
  },
  batchDelHospSet(idList) {
    return request ({
      url: `/admin/hosp/hospitalSet/batchDelHospSet`,
      method: 'delete',
      data: idList
    })
  },
  lockHospSet(id,status) {
    return request ({
      url: `/admin/hosp/hospitalSet/lockHospSet/${id}/${status}`,
      method: 'put'
    })
  },
  saveHospSet(hospitalSet) {
    return request ({
      url: `/admin/hosp/hospitalSet/saveHospitalSet`,
      method: 'post',
      data: hospitalSet
    })
  },
  //院设置id查询
  getHospSet(id) {
    return request ({
    url: `/admin/hosp/hospitalSet/getHospSet/${id}`,
    method: 'get'
    })
  },
  //修改医院设置
  updateHospSet(hospitalSet) {
    return request ({
      url: `/admin/hosp/hospitalSet/updateHospSet`,
      method: 'put',
      data: hospitalSet
    })
  }
  
}
