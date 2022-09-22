export const useDateSeparatorText = (timestamp) => {
    const date = new Date(timestamp)
    const currentDate = new Date(Date.now())
    if (date.getFullYear() == currentDate.getFullYear())
        return date.toLocaleString("ru-RU", { day: "numeric", month: "long" })
    return date.toLocaleString("ru-RU", { day: "numeric", month: "long", year: "numeric" })
}