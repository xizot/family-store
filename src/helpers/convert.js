export const moneyFormat = (value) => {
  const newMoney = Number(value).toFixed(2);
  var parts = newMoney.toString().split('.');
  return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts[1] ? '.' + parts[1] : '');
};

export const dateFormat = (date) => {
  try {
    const d = new Date(date);
    return (
      `0${d.getDate()}`.slice(-2) +
      '-' +
      `0${d.getMonth() + 1}`.slice(-2) +
      '-' +
      d.getFullYear() +
      ' ' +
      `0${d.getHours()}`.slice(-2) +
      ':' +
      `0${d.getMinutes()}`.slice(-2)
    );
  } catch (error) {}
  return date;
};
