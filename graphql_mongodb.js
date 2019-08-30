const { ApolloServer, gql } = require("apollo-server");
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(function (err) {
  console.log("MONGOdb connected");
  db = client.db("users"); //mongodb database name
});


const typeDefs = gql`
type Query {
  my_query:[counters]
  hello: String
}
type counters{
_id:String,
seq:String
}`

const resolvers = {
  Query: {
    hello: () => {
      return `hey sup ? `;
    },
    my_query: async () => {
      values = await db.collection('counters').find().toArray().then(res => { return res });
      return values
    }
  }
};
const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen(3000).then(({ url }) => console.log(`Server running at ${ url } `));