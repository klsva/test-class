import moment from 'moment';

export const createDateArr = async (date, days, count = 0, lastDate = '') => {
  let result = [];
  let i = 0;
  let week = 0;
  const maxCount = 300;
  let checkDate = null;
  if (days.includes(moment(date).day())) {
    //check stopper
    if (count === null && lastDate === null) {
      return 'Insert count or lastDate';
    }
    //check count
    if (count === null || count > maxCount) {
      count = maxCount;
    }
    //check lastDate
    if (lastDate === null || moment(lastDate) > moment(date).add(1, 'years')) {
      lastDate = moment(date).add(1, 'years');
    }
    let maxDate = moment(date).add(1, 'years');
    if (maxDate > moment(lastDate)) {
      maxDate = moment(lastDate);
    }
    let idxDays = days.indexOf(moment(date).day());
    while (i < count && checkDate < maxDate) {
      if (idxDays < days.length) {
        result.push(
          moment(date)
            .day(days[idxDays] + week)
            .format('YYYY-MM-DD')
        );
      } else {
        idxDays = 0;
        week += 7;
        result.push(
          moment(date)
            .day(days[idxDays] + week)
            .format('YYYY-MM-DD')
        );
      }
      idxDays++;
      checkDate = moment(result.at(-1));
      i++;
    }
    if (moment(result.at(-1)) > maxDate) {
      result.pop();
    }
    return result;
  } else {
    return `Your Start date and Days of lessons doesn't match. Check them.`;
  }
};
