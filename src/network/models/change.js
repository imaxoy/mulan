import {post, get, put, _delete} from '../axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Policy {
  // 类中的方法可以代表一个用户行为
  /**
   * 获取位置（大楼）信息
   */
  async getPolicy(data) {
    const res = await get(`/change/policy`)
    return res
  }


  /**
   * 获取部门信息
   */
  async getDepartment(data) {
    const res = await get(`/change/depart`)
    return res
  }

  /**
   * 获取变更原因
   */
  async getReason(data) {
    const res = await get('/change/reason')
    return res
  }

  /**
   * 获取变更类型
   */
  async getType(data) {
    const res = await get('/change/type')
    return res
  }

  /**
   * 添加变更信息
   */
  async addChange(data) {
    return service.request({
      method: "post",
      url: "/change",
      data: data,
      auth: {
        username: sessionStorage.getItem("token")
      }
    });
  }

  /**
   * 查看变更信息
   */
  async getChange(data) {
    const res = await get('/change/show')
    return res
  }
}

export default new Policy()
