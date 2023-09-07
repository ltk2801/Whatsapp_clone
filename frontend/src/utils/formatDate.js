import moment from "moment";

export const translateToVietnameseDay = (englishDay) => {
  switch (englishDay) {
    case "Monday":
      return "Thứ 2";
    case "Tuesday":
      return "Thứ 3";
    case "Wednesday":
      return "Thứ 4";
    case "Thursday":
      return "Thứ 5";
    case "Friday":
      return "Thứ 6";
    case "Saturday":
      return "Thứ 7";
    case "Sunday":
      return "Chủ nhật";
    default:
      return "";
  }
};

export const dateFormatHandler = (date) => {
  let now = moment();
  let momentDate = moment(date);
  // Thời gian so với bây giờ
  let time = momentDate.fromNow(true);
  // chuyển qua xx:yy
  let dateByHourAndMin = momentDate.format("HH:mm");
  // Hàm lấy ra số ngày cách hôm nay (<7)
  const getDay = () => {
    let days = time.split(" ")[0];
    if (Number(days) < 8) {
      const dayOfWeek = now.subtract(Number(days), "days").format("dddd");
      const vietnameseDayOfWeek = translateToVietnameseDay(dayOfWeek); // Dịch ngày trong tuần sang tiếng Việt
      return vietnameseDayOfWeek;
    } else {
      return momentDate.format("DD/MM/YYYY");
    }
  };
  if (time === "a few seconds") {
    return "Bây giờ";
  }
  if (time.search("minute") !== -1) {
    let mins = time.split(" ")[0];
    if (mins === "a") {
      return "1 phút trước";
    } else {
      return `${mins} phút trước`;
    }
  }
  if (time.search("hour") !== -1) {
    return dateByHourAndMin;
  }
  if (time === "a day") {
    return "Hôm qua";
  }
  if (time.search("days") !== -1) {
    return getDay();
  }
  return momentDate.format("DD/MM/YYYY");
};
