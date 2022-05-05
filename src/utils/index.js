

export function debounce(delay, callback) {
  let task
  return function() {
    clearTimeout(task)
    task = setTimeout(() => {
      callback.apply(this, arguments)
    }, delay)
  }
}

export function $(el){
  return document.querySelector(el)
}


export function isNumber(val){
  return typeof val == 'number' && !isNaN(val)
}

export function sleep(timer){
  return new Promise(resolve=>{setTimeout(resolve,timer)})
}

export function formatNumber(num,decimals,decimal,separator,prefix,suffix){
  num = num.toFixed(decimals)
  num += ''
  const x = num.split('.')
  let x1 = x[0]
  const x2 = x.length > 1 ? decimal + x[1] : ''
  const rgx = /(\d+)(\d{3})/
  if(separator&&!isNumber(separator)){
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + separator + '$2')
    }
  }
  return prefix + x1 + x2 + suffix
}