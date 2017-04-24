export function FormattingDate(date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  return `${year}-${(month < 10) ? '0' + month : month}-${(day < 10) ? '0' + day : day}`
}

export function IsEqualDates(firstDay, secondDay) {
  return (firstDay.getFullYear() === secondDay.getFullYear() && firstDay.getMonth() === secondDay.getMonth() && firstDay.getDate() === secondDay.getDate())
}