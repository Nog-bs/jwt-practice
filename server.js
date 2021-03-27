const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const { graphql, buildSchema } = require("graphql");

const schema = buildSchema(`
  type Query {
    post(id: Int!): Post
    posts: [Post]
  }

  type Mutation {
      createPost(title: String): Post
  }

  type Post {
      id: Int
      title: String
      comments: [Comment]
  }

  type Comment {
    text: String
    user: String
  }
`);

const posts = [
    {
        id: 1,
        title: "First post that I will send",
        comments: [{ text: "what is up", user: "bob" }],
    },
    {
        id: 2,
        title: "I like apples and Jujutsu Kaisen",
        comments: [{ text: "what is up", user: "bob" }],
    },
    {
        id: 3,
        title: "Hello world",
    },
    {
        id: 4,
        title: "Fourth id and I ran out of ideas",
        comments: [{ text: "what is up", user: "bob" }],
    },
];

class Post {
    constructor(post) {
        Object.assign(this, post);
    }

    async comments() {
        // mongodb query
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        text: "what is up",
                        user: "bob",
                    },
                ]);
            }, 1000);
        });
    }
}

const root = {
    post: ({ id }) => {
        return posts.find((item) => item.id === id);
    },
    posts: () => {
        // RETURN ALL OF POSTS ARRAYjk
        return posts.map((post) => new Post(post));
    },
    createPost: ({ title }) => {
        const newPost = new Post({ title });
        posts.push(newPost);
        return newPost;
    },
};

const app = express();

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true,
    })
);

app.listen(4000, () => {
    console.log("----- Server Running on Port 4000 -----");
});
