export const isNotEmpty = (value) => value?.toString().trim().length > 0;
export const isEmail = (value) => {
  const re = /^[a-z][a-z0-9_.]{3,32}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$/;
  return re.test(String(value).toLowerCase());
};
export const isPhoneNumber = (value) => {
  const re = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
  return re.test(String(value).toLowerCase());
};
