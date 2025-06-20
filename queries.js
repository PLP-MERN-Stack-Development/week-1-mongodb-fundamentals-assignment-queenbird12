//use Plp_bookstore

db.Books.insertMany([
    {   title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Fiction',
        published_year: 1960,
        price: 12.99,
        in_stock: true,
        pages: 336,
        publisher: 'J. B. Lippincott & Co.'},
    {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    published_year: 1949,
    price: 10.99,
    in_stock: true,
    pages: 328,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    published_year: 1925,
    price: 9.99,
    in_stock: true,
    pages: 180,
    publisher: 'Charles Scribner\'s Sons'
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    genre: 'Dystopian',
    published_year: 1932,
    price: 11.50,
    in_stock: false,
    pages: 311,
    publisher: 'Chatto & Windus'
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1937,
    price: 14.99,
    in_stock: true,
    pages: 310,
    publisher: 'George Allen & Unwin'
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Fiction',
    published_year: 1951,
    price: 8.99,
    in_stock: true,
    pages: 224,
    publisher: 'Little, Brown and Company'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    published_year: 1813,
    price: 7.99,
    in_stock: true,
    pages: 432,
    publisher: 'T. Egerton, Whitehall'
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1954,
    price: 19.99,
    in_stock: true,
    pages: 1178,
    publisher: 'Allen & Unwin'
  },
  {
    title: 'Animal Farm',
    author: 'George Orwell',
    genre: 'Political Satire',
    published_year: 1945,
    price: 8.50,
    in_stock: false,
    pages: 112,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    published_year: 1988,
    price: 10.99,
    in_stock: true,
    pages: 197,
    publisher: 'HarperOne'
  },
  {
    title: 'Moby Dick',
    author: 'Herman Melville',
    genre: 'Adventure',
    published_year: 1851,
    price: 12.50,
    in_stock: false,
    pages: 635,
    publisher: 'Harper & Brothers'
  },
  {
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    genre: 'Gothic Fiction',
    published_year: 1847,
    price: 9.99,
    in_stock: true,
    pages: 342,
    publisher: 'Thomas Cautley Newby'
  }
])

db.Books.find({genre: "Fantasy" })
db.Books.find({published_year: { $gt: 1900} })
db.Books.find({author:"Emily Brontë"})
db.Books.updateOne (
    {title : "Animal Farm" },
    {$inc : { price: 0.50 } }
    )
db.Books.updateOne (
    {title : "Animal Farm" },
    {$set : { price: 10.50 } }
    )
db.Books.deleteOne ({title: "Animal Farm"})
db.Books.find({
    in_stock: true,
    published_year: {$gt:2010}})

db.Books.find(
  { title: 1, author: 1, price: 1, _id: 0 }
)
db.Books.find().sort({ price: 1 })
db.Books.find().sort({ price: -1 })
db.Books.find().skip(0).limit(5)
db.Books.find().skip(5).limit(5)
db.Books.find().skip(10).limit(5)

db.Books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" }
    }
    },
])

db.Books.aggregate([
    { $group:{ _id: "$author",
       bookCount: {$sum: 1}}
    },
    {$sort: {bookcount: -1}},{$limit:1}
])

db.Books.aggregate([
  {
    $addFields: {
      decade: {
        $concat: [
          { $substr: [{ $subtract: ["$published_year", { $mod: ["$published_year", 10] }] }, 0, 4] },
          "s"
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 }
    }
  },
  {
    $sort: { _id: 1 }
  }
])
// Create an index on the title field for faster searches
// This will help speed up queries that search for books by title 
db.Books.createIndex({ title: 1 })
db.Books.createIndex({ author: 1, published_year: 1 })
db.books.find({ title: "MongoDB Basics" }).explain("executionStats")