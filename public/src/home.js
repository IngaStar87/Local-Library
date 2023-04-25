function getTotalBooksCount(books) {
 return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) { let booksCheckedOut = books.filter(
  (book) =>
   book.borrows.filter((record) => record.returned === false).length > 0
 );
 return booksCheckedOut.length;
}


function getMostCommonGenres(books) {
 const map = books.reduce((map,num) => {
  if (map[num.genre]) {
   map[num.genre]++;
  } else {
   map[num.genre] = 1;
  }
  return map;
 },{});
 return Object.entries(map)
  .map(([name, count]) => {
   return {
    name,
    count
   };
  })
  .sort((a, b) => b.count - a.count)
  .slice(0, 5);
}

function getMostPopularBooks(books) {
  return books
  .map((book) => {
   return { name: book.title, count: book.borrows.length };
  })
  .sort((a, b) => (a.count < b.count ? 1 : -1))
  .slice(0, 5);
}


function getMostPopularAuthors(books, authors) {
  let result = [];
  authors.forEach((author) => {
   let theAuthor = {
    name: `${author.name.first} ${author.name.last}`,
    count: 0
   };
   books.forEach((book) => {
    if (book.authorId === author.id) {
     theAuthor.count += book.borrows.length;
    }
   });
   result.push(theAuthor);
  });
  return sortAndSlice(result)
 }

 function sortAndSlice(array) {
  return array.sort((a, b) => b.count - a.count).slice(0, 5);
 }
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
