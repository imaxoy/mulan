import {post, get, put, _delete} from '../axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Mobile {
  // 类中的方法可以代表一个用户行为
  async addMobile(info) {
    const res = await post('v1/book', info, {handleError: true})
    return res
  }

  // 在这里通过 async await 语法糖让代码同步执行
  // 1. await 一定要搭配 async 来使用
  // 2. await 后面跟的是一个 Promise 对象
  async getMobile(id) {
    const res = await get(`v1/book/${id}`)
    return res
  }

  /**
   * 获取位置（大楼）信息
   */
  async getBuild(data) {
    const res = await get(`/mobile/build`)
    return res
  }

  /**
   * 获取事件类型信息
   */
  async getType(data) {
    const res = await get(`/mobile/pctype`)
    return res
  }

  /**
   * 获取操作系统类型
   */
  async getOS(data) {
    const res = await get(`/mobile/ostype`)
    return res
  }

  /**
   * 查看事件信息
   */
  async catEvent(data) {
    const res = await get(`/mobile/show`)
    return res
  }

  /**
   * 添加事件信息
   */
  async addEvent(data) {
    const res = await post('v1/book', data,
        {handleError: true, auth: {username: sessionStorage.getItem("token")}}
    )
    return res
  }



  async editMobile(id, info) {
    const res = await put(`v1/book/${id}`, info)
    return res
  }

  async delectMobile(id) {
    const res = await _delete(`v1/book/${id}`)
    return res
  }

  async getMobiles() {
    const res = await get('v1/book', {handleError: true})
    return res
  }
}

export default new Mobile()
