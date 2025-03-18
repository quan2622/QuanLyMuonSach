import moment from "moment";

export default function formatDate(date) {
  return date ? moment(date).format("DD/MM/YYYY") : "--/--/----";
}