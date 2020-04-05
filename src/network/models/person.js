import {post, get, put, _delete} from '../axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Person {
  // 类中的方法可以代表一个用户行为

  // TODO:
  async addPerson(data) {
    const res = await post(`/person`)
    return res
  }

  async getPerson(data) {
    const res = await get('/person')
    return res
  }

}

export default new Person()


