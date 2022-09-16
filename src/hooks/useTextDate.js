export const useTextDate = (d) => {
    const date = new Date(d)
    return date.toLocaleString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })
}