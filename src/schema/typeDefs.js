export const typeDefs = `#graphql
    type Query {
        user: [User]
        posts: [Post]
        comments: [Comment]
        likes:[Like]
    }

    type Mutation { 
        createUser(email: String!, name: String): User
        updateUser(id: Int!, name: String!): User
        deleteUser(id: Int!): User
        createPost(title: String!, content: String, authorId: Int!): Post
        updatePost(id: Int!, title: String, content: String, authorId: Int): Post
        deletePost(id: Int!): Post
        createComment(text: String!, postId: Int!, userId: Int!): Comment
        updateComment(id: Int!, text: String, postId: Int, userId: Int): Comment
        deleteComment(id: Int!): Comment
        createLike(userId: Int!, postId: Int!, commentId: Int!): Like
        updateLike(id: Int!, userId: Int!, postId: Int, commentId: Int): Like
        deleteLike(id: Int!): Like
    }

    type User {
        id: Int
        email: String
        name: String
        posts: [Post]
        comments: [Comment]  # Add comments field to the User type
        likes:[Like]
    }

    type Post {
        id: Int
        title: String
        content: String
        published: Boolean
        author: User
        comments: [Comment]  # Add comments field to the Post type
        likes:[Like]
    }

    type Comment {
        id: Int
        text: String
        post: Post           # Add a reference to the Post the comment belongs to
        user: User           # Add a reference to the User who wrote the comment
        likes:[Like]
    }

    type Like {
        id: Int
        user:User
        post: Post           # Add a reference to the Post the comment belongs to
        comment: Comment           # Add a reference to the comment belongs to
    }
`;