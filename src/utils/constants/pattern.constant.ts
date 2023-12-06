// const emailOrPhone =
//   '/[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$|^(?([0-9]{3}))?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/';
// export const regex = {emailOrPhone};

export const PATTERN_EMAIL =
  /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$|^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

export const PATTERN_PASSWORD =
  /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export const PATTERN_PHONE = /(84|0[3|5|7|8|9])+([0-9]{8})$/;

export const PATTERN_NAME =
  /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$|^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

export const PATTERN_NUMBER = /^\d+$/;



