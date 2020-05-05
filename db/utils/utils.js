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

exports.formatComments = (comments, articleRef) => {
  const formattedComments = comments.map((item) => {
    const { belongs_to, created_by, ...restOfKeys } = item;
    const newObj = {
      article_id: articleRef[belongs_to],
      author: created_by,
      ...restOfKeys,
    };
    return newObj;
  });
  return formattedComments;
};
