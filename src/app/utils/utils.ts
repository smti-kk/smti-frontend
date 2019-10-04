export const filterByFields = (text: string, map: {[name: string]: any}) => {
  const results = {};
  for (const key in map) {
    if (map.hasOwnProperty(key) && key.toLowerCase().includes(text.toLowerCase())) {
      results[key] = text[key];
    }
  }
  return  results;
};
