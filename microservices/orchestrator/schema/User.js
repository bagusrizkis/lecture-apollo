const { ApolloServer, gql } = require("apollo-server");
const { default: axios } = require("axios");

const typeDefs = gql`
    type Query {
        users: [User]
    }

    type Mutation {
        addUser(input: InputUser): User
    }

    input InputUser {
        name: String
        email: String
    }

    """
    Ini type data untuk user
    """
    type User {
        _id: ID
        name: String
        email: String
    }
`;

const resolvers = {
    Query: {
        users: () => {
            return axios.get("http://localhost:3002/users").then(({ data }) => {
                return data.body.users;
            });
        },
    },
    Mutation: {
        addUser: (_, { input }) => {
            return axios
                .post("http://localhost:3002/users", { ...input })
                .then(({ data }) => {
                    return data.body.user;
                });
        },
    },
};

module.exports = {
    typeDefs,
    resolvers,
};
