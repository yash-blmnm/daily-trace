export const convertToPostgresDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch (error) {
      console.error("Invalid date string:", error);
      return null;
  }
};

function snakeToCamel(str: string) {
  let splitStringArr = str.split("_");
  let builtStr = splitStringArr.reduce((acc, curr, i) => {
    curr = i !== 0 ? curr[0].toUpperCase() + curr.slice(1) : curr;
    return acc + curr;
  }, "");
  return builtStr;
}

export function convertResponse(response: any) {
  let parentKeys = Object.keys(response);
  parentKeys.forEach((key) => {
    let currentObj = response[key];
    delete response[key];
    let newKey = snakeToCamel(key);
    response[newKey] = currentObj;
    if (typeof response[newKey] === "object") {
      convertResponse(response[newKey]);
    }
  });
  return response;
}
  