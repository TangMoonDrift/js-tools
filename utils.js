const deepClone = (origin) => {
  // 判断类型 基本判断
  if (origin === null) return null
  if (typeof origin !== 'object') return origin
  // 使用缓存解决循环引用
  if (!deepClone.cache) {
    deepClone.cache = new WeakMap()
  }
  if (deepClone.cache.has(origin)) {
    return deepClone.cache.get(origin)
  }
  // 引用数据类型 set map
  if (origin instanceof Set) {
    const set = new Set()
    deepClone.cache.set(origin, set)
    origin.forEach(item => {
      set.add(deepClone(item))
    })
    return set
  } else if (origin instanceof Map) {
    const map = new Map()
    deepClone.cache.set(origin, map)
    origin.forEach((value, key) => {
      map.set(key, deepClone(value))
    })
    return map
  } else if (origin instanceof RegExp) {
    return new RegExp(origin)
  } else {
    const result = new origin.constructor()
    deepClone.cache.set(origin, result)
    for (const originKey in origin) {
      result[originKey] = deepClone(origin[originKey])
    }
    return result
  }
}

const drag = (ele) => {
  ele.addEventListener('mousedown', function (e) {
    let x = e.pageX - this.offsetLeft
    let y = e.pageY - this.offsetTop
    document.addEventListener('mousemove', move, false)

    function move(e) {
      ele.style.left = e.pageX - x + 'px'
      ele.style.top = e.pageY - y + 'px'
    }

    this.addEventListener('mouseup', function () {
      document.removeEventListener('mousemove', move, false)
    }, false)
  }, false)
}

const _async = (url, callback) => {
  let script = document.createElement('script')
  script.type = 'text/javascript'
  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === 'complete' || script.readyState === 'loaded') {
        callback()
      } else {
        script.onload = function () {
          callback()
        }
      }
    }
  }
  script.src = url
  document.head.appendChild(script)
}

const singleton = (fn) => {
  let result
  return function () {
    if (result != null) {
      return result
    }
    result = fn.apply(this, arguments)
    return result
  }
}

const _instanceof = (obj, fn) => {
  let proto = Object.getPrototypeOf(obj)
  if (!proto) return false
  if (proto === fn.prototype) {
    return true
  } else {
    return _instanceof(proto, fn)
  }
}

const _new = (fn, ...args) => {
  if (!fn ||
    typeof fn !== 'function' ||
    typeof fn !== 'object'
  ) return Object.create(null)
  const instance = Object.create(fn.prototype)
  const res = fn.call(instance, ...args)
  return typeof res === 'function' || typeof res === 'object' ? res : instance
}

