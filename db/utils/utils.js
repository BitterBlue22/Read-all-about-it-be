exports.formatDates = (list) => {
  const newList = [];
  list.forEach((article) => {
    let newObj = { ...article };
    newObj.created_at = new Date(article.created_at);
    newList.push(newObj);
  });
  return newList;
};

exports.makeRefObj = (list) => {
  const lookupObj = {};
  list.forEach((item) => {
    lookupObj[item.article_id] = item.title;
  });
  return lookupObj;
};
