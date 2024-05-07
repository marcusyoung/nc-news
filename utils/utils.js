import format from "date-fns/format"

export function formatDate(date) {
    return format(date, "E dd MMMM yyyy hh:mm bb")
}
