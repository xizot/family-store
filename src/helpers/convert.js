export const moneyFormat = (value) => {
  var parts = value.toString().split('.');
  return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts[1] ? '.' + parts[1] : '');
};

export const dateFormat = (date) => {
  try {
    const d = new Date(date);
    return (
      d.getDate() +
      '-' +
      (d.getMonth() + 1) +
      '-' +
      d.getFullYear() +
      ' ' +
      d.getHours() +
      ':' +
      d.getMinutes()
    );
  } catch (error) {}
  return date;
};
