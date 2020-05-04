exports.formatDates = (list) => {
  const newList = [];
  list.forEach((article) => {
    let newObj = { ...article };
    newObj.created_at = new Date(article.created_at);
    newList.push(newObj);
  });
  return newList;
};
