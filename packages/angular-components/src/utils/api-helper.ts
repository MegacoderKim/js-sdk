export const AuthLessReqOptions = () => {
  let headers = { 'Content-Type': 'application/json', 'X-NoAuth': "test" };
  let options = { headers: headers };
  return options
};
