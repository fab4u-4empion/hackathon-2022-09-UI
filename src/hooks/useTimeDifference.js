export const useTimeDifference = (d) => {
    const date = new Date(d)
    const currentDate = Date.now()
    let diff = currentDate - date
    if (diff < 1000) return "0с"
    diff = Math.round(diff / 1000)
    if (diff < 60) return `${diff}с`
    diff = Math.round(diff / 60)
    if (diff < 60) return `${diff}мин`
    diff = Math.round(diff / 60)
    if (diff < 24) return `${diff}ч`
    diff = Math.round(diff / 24)
    if (diff < 365) return `${diff}ч`
    diff = Math.round(diff / 365)
    return `${diff}г`
}