export const request = function({
  url,
  methods='post',
  data,
  headers = {}
}){
  return new Promise((resolve)=>{
    const xhr = new XMLHttpRequest()
    xhr.open(methods,url)
    Object.keys(headers).forEach(key=>{
      xhr.setRequestHeader(key,headers[key])
    })
    xhr.send(data)
    xhr.onload = function(e){
      resolve({
        data:e.target.response
      })
    } 
  })
}

//ajax设置请求头 setRequestHeader(key,value)
// onload和onreadystatechange 区别
// 只要进入onload请求中，一定是已经到4这个状态