import service from "@/utils/request";

/**
 * 添加事件信息
 */
export function AddPerson(data) {
  return service.request({
    method: "post",
    url: "/person",
    data: data,
    auth: {
      username: sessionStorage.getItem("token")
    }
  });
}

/**
 * 添加事件信息
 */
export function GetPerson(data) {
  return service.request({
    method: "get",
    url: "/person",
    data: data
  });
}
