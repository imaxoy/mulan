import service from "@/utils/request";

/**
 * 获取部门信息
 */
export function GetDepartment(data) {
  return service.request({
    method: "get",
    url: "/change/depart",
    data: data
  });
}

/**
 * 获取变更原因
 */
export function GetReason(data) {
  return service.request({
    method: "get",
    url: "/change/reason",
    data: data
  });
}

/**
 * 获取变更类型
 */
export function GetType(data) {
  return service.request({
    method: "get",
    url: "/change/type",
    data: data
  });
}

/**
 * 添加变更信息
 */
export function AddChange(data) {
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
export function GetChange(data) {
  return service.request({
    method: "get",
    url: "/change/show",
    data: data
  });
}

/**
 * 查看策略规则
 */
export function GetPolicy(data) {
  return service.request({
    method: "get",
    url: "/change/policy",
    data: data
  });
}
