export const useDateComparison = (d1, d2) => {
    const getLocalISODate = (date) => {
        function pad(number) {
            if (number < 10) {
                return '0' + number;
            }
            return number;
        }

        return date.getFullYear() +
            '-' + pad(date.getMonth() + 1) +
            '-' + pad(date.getDate())
    }

    const date1 = new Date(d1)
    const date2 = new Date(d2)

    return getLocalISODate(date1) == getLocalISODate(date2)
}