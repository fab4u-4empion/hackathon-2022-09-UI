export const useTimeDifference = (d) => {
    const date = new Date(d)
    const currentDate = Date.now()
    let diff = currentDate - date
    if (diff < 1000) return "0c"
}