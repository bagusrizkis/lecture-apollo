const { ApolloServer, gql } = require("apollo-server");
const { default: axios } = require("axios");

const typeDefs = gql`
    type Query {
        batch: Batch
    }

    type Batch {
        _id: ID
        name: String
    }
`;

const batchs = [{ name: "Blazing" }, { name: "Blanford" }];

const resolvers = {
    Query: {
        batch: () => {
            return batchs;
        },
    },
};

module.exports = {
    typeDefs,
    resolvers,
};
