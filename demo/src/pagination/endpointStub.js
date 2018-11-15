const getId = length => () => {
  let result = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (let i = 0; i < length; i += 1) {
    result += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return result;
};

const charsGen = getId(10);

const rows = Array(1000)
  .fill({})
  .map((_, i) => ({
    id: `${i}_${charsGen()}`
  }));

const getPage = elementsPerPage => (searchPhrase, pageNumber) =>
  new Promise((resolve, reject) => {
    console.log(`fetching page ${pageNumber} with phrase: ${searchPhrase}`);
    setTimeout(() => {
      console.log(`fetched ${pageNumber} (${searchPhrase})`);
      const filteredElements = rows.filter(x =>
        x.id.toLowerCase().includes(searchPhrase.toLowerCase())
      );
      const itemCount = filteredElements.length;
      const pageElements = filteredElements.slice(
        pageNumber * elementsPerPage,
        pageNumber * elementsPerPage + elementsPerPage
      );

      const isFailed = Math.random() > 0.9;
      if (isFailed) {
        reject(new Error("Server response failed."));
      } else {
        resolve({ pageElements, itemCount });
      }
    }, 400);
  });

export default getPage;
