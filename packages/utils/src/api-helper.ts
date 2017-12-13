export const AuthLessReqOptions = () => {
  let headers = new Headers({
    "Content-Type": "application/json",
    Authorization: null
  });
  let options = { headers: headers };
  return options;
};
