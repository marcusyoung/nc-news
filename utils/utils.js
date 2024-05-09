import format from "date-fns/format"

export function formatDate(date, type="full") {
    if (type==="full") {
    return format(date, "E dd MMMM yyyy hh:mm bb")
    } else {
        return format(date, "dd MMMM yyyy")
    }
}
