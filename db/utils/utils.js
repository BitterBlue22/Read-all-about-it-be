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
    lookupObj[item.title] = item.article_id;
  });
  return lookupObj;
};

exports.formatComments = (comments, articleRef) => {
  const formattedComments = comments.map((item) => {
    const { belongs_to, created_by, ...restOfKeys } = item;

    const newObj = {
      author: created_by,
      article_id: articleRef[belongs_to],
      ...restOfKeys,
    };
    return newObj;
  });

  return formattedComments;
};
