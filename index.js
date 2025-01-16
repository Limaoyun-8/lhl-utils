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
