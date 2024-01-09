export const rxEmail =
  /^[a-z][a-z0-9%_.-]{3,32}@[a-z0-9]{3,}(\.[a-z]{3,4}){1,2}$/;
export const rxPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d][\x22-\x7E]+$/;
export const rxPhoneVN = /(84|0[2|3|5|7|8|9])+(([0-9]{9})|([0-9]{10}))\b/;
export const rxPrice = /\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})?/;
export const rxUserName = /^[0-9A-Za-z\-._]+$/;
export const rxPhoneVNCustom = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
export const rxUserNameCustom =
  /^(?=[a-zA-Z0-9._]{6,32})(?!.*[_.]{2})[^_.].*[^_.]$/;
export const rxNoSpace = /^\S*$/;
export const rxAlphabet = /^[A-Z]+$/i;
export const rxNumber = /^\d+$/;
export const rxRemoveCharacter = /[^\d.-]/g;
export const rxMustbeNumberOrAlphaBet = /[A-Za-z0-9]/;
export const rxASCII = /^[\x21-\x7E]+$/;
export const rxMustContainNumber = /.*[0-9].*/;
export const rxMustContainAlphabet = /.*[A-Za-z].*/;
