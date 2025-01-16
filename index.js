/**
 * 格式化日期时间
 * @param { string } formater 格式（'YYYY-MM-DD HH:mm:ss'）
 * @param { number } t 时间
 * @return { string } 格式化后的日期时间
 */
export function formatDate(formater, t) {
  let date = t ? new Date(t) : new Date(),
      Y    = date.getFullYear() + '',
      M    = date.getMonth() + 1,
      D    = date.getDate(),
      H    = date.getHours(),
      m    = date.getMinutes(),
      s    = date.getSeconds()
  return formater.replace(/YYYY|yyyy/g, Y)
                 .replace(/YY|yy/g, Y.substring(2, 4))
                 .replace(/MM/g, (M < 10 ? '0' : '') + M)
                 .replace(/DD/g, (D < 10 ? '0' : '') + D)
                 .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
                 .replace(/mm/g, (m < 10 ? '0' : '') + m)
                 .replace(/ss/g, (s < 10 ? '0' : '') + s)
}

/**
 * 格式化内存大小
 * @param { number } size 占用内存大小（单位KB）
 * @return { string } 格式化后的大小
 */
export function formatSizeUnits(size) {
  if (typeof size !== 'number') {
    console.error(`${ size } is not a number`)
    return 'xx'
  }
  const units = [ 'KB', 'MB', 'GB', 'TB', 'PB' ]
  let unitIndex = 0
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }
  return `${ size.toFixed(2) } ${ units[unitIndex] }`
}

/**
 * 开启浏览器全屏
 */
export function toFullScreen() {
  const body = document.body
  body.webkitRequestFullScreen
  ? body.webkitRequestFullScreen()
  : body.mozRequestFullScreen
    ? body.mozRequestFullScreen()
    : body.msRequestFullscreen
      ? body.msRequestFullscreen()
      : body.requestFullScreen
        ? body.requestFullScreen()
        : alert('浏览器不支持全屏')
}

/**
 * 退出浏览器全屏
 */
export function exitFullscreen() {
  let doc = parent.document
  doc.webkitCancelFullScreen
  ? doc.webkitCancelFullScreen()
  : doc.mozCancelFullScreen
    ? doc.mozCancelFullScreen()
    : doc.cancelFullScreen
      ? doc.cancelFullScreen()
      : doc.msExitFullscreen
        ? doc.msExitFullscreen()
        : doc.exitFullscreen
          ? doc.exitFullscreen()
          : alert('切换失败,可尝试Esc退出')
}

/**
 * 获取 Url 参数
 * @return { Object } Url 参数
 */
export function getUrlParam() {
  const url = document.location.toString()
  let arrObj = url.split('?')
  let params = Object.create(null)
  if (arrObj.length > 1) {
    arrObj = arrObj[1].split('&')
    arrObj.forEach(item => {
      item = item.split('=')
      params[item[0]] = item[1]
    })
  }
  return params
}

/**
 * 获取浏览器信息
 * @return { Object<{type: string, version: number}> }
 */
export function getBrowserInfo() {
  const t = navigator.userAgent.toLowerCase()
  return 0 <= t.indexOf('msie') ? { // ie < 11
    type   : 'IE',
    version: Number(t.match(/msie ([\d]+)/)[1])
  } : !!t.match(/trident\/.+?rv:(([\d.]+))/) ? { // ie 11
    type   : 'IE',
    version: 11
  } : 0 <= t.indexOf('edge') ? {
    type   : 'Edge',
    version: Number(t.match(/edge\/([\d]+)/)[1])
  } : 0 <= t.indexOf('firefox') ? {
    type   : 'Firefox',
    version: Number(t.match(/firefox\/([\d]+)/)[1])
  } : 0 <= t.indexOf('chrome') ? {
    type   : 'Chrome',
    version: Number(t.match(/chrome\/([\d]+)/)[1])
  } : 0 <= t.indexOf('opera') ? {
    type   : 'Opera',
    version: Number(t.match(/opera.([\d]+)/)[1])
  } : 0 <= t.indexOf('Safari') ? {
    type   : 'Safari',
    version: Number(t.match(/version\/([\d]+)/)[1])
  } : {
    type   : t,
    version: -1
  }
}

/**
 * 检测是否为 PC 端浏览器模式
 * @return { boolean }
 */
export function isPCBrowser() {
  let e = navigator.userAgent.toLowerCase()
    , t = 'ipad' == e.match(/ipad/i)
    , i = 'iphone' == e.match(/iphone/i)
    , r = 'midp' == e.match(/midp/i)
    , n = 'rv:1.2.3.4' == e.match(/rv:1.2.3.4/i)
    , a = 'ucweb' == e.match(/ucweb/i)
    , o = 'android' == e.match(/android/i)
    , s = 'windows ce' == e.match(/windows ce/i)
    , l = 'windows mobile' == e.match(/windows mobile/i)
  return !(t || i || r || n || a || o || s || l)
}
