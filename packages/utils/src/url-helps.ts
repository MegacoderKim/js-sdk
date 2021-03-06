export const HtQuerySerialize = function(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      if (obj[p] || obj[p] == 0 || obj[p] == false)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

export const GetUrlParam = (name: string, url?) => {
  url = url || window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

export const getMergedParams = (params, currentParams = {}) => {
  currentParams = {...currentParams};
  if (!params) return currentParams;
  const keys = Object.keys(params);
  return keys.reduce((query, key) => {
    if (!!params[key]) {
      query[key] = params[key]
    } else {
      delete  query[key]
    }
    return query
  },currentParams)
}
