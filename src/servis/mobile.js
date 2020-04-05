import service from "@/utils/request";

/**
 * 获取位置（大楼）信息
 */
export function GetBuild(data) {
  return service.request({
    method: "get",
    url: "/mobile/build",
    data: data
  });
}

/**
 * 获取事件类型信息
 */
export function GetType(data) {
  return service.request({
    method: "get",
    url: "/mobile/pctype",
    data: data
  });
}

/**
 * 获取操作系统类型
 */
export function GetOS(data) {
  return service.request({
    method: "get",
    url: "/mobile/ostype",
    data: data
  });
}

/**
 * 查看事件信息
 */
export function CatEvent(data) {
  return service.request({
    method: "get",
    url: "/mobile/show",
    data: data
  });
}

/**
 * 添加事件信息
 */
export function AddEvent(data) {
  return service.request({
    method: "post",
    url: "/mobile",
    data: data,
    auth: {
      username: sessionStorage.getItem("token")
    }
  });
}

/**
 * 绘制报表信息
 */
export function GetTotalReport(data) {
  return service.request({
    method: "get",
    url: "/mobile/totalreport",
    data: data
  });
}

/**
 * 绘制报表信息
 */
export function GetTypeReport(data) {
  return service.request({
    method: "get",
    url: "/mobile/typereport",
    data: data
  });
}
