const { ApolloServer, gql } = require("apollo-server");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const user = require("./schema/User");
const batch = require("./schema/Batch");

const typeDefs = gql`
    type Query {
        halo: String
    }
`;

const resolvers = {
    Query: {
        halo: () => "Halo graphql",
    },
};

const schema = makeExecutableSchema({
    typeDefs: [typeDefs, user.typeDefs, batch.typeDefs],
    resolvers: [resolvers, user.resolvers, batch.resolvers],
});

const server = new ApolloServer({
    schema: schema,
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
