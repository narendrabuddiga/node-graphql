import prisma from "../db/prisma.js";

const postResolvers = {
  Query: {
    posts: async () => {
      return await prisma.post.findMany();
    },
  },
  Mutation: {
    createPost: async (_, args) => {
      const { title, content, authorId } = args;
      return await prisma.post.create({
        data: {
          title,
          content,
          authorId,
        },
      });
    },
    updatePost: async (_, args) => {
      const { id, title, content, authorId } = args;
      return await prisma.post.update({
        where: { id },
        data: {
          title,
          content,
          authorId,
        },
      });
    },
    deletePost: async (_, args) => {
      const { id } = args;
      return await prisma.post.delete({
        where: { id },
      });
    },
  },
  Post: {
    author: async (parent) => {
      return await prisma.user.findUnique({
        where: { id: parent.authorId },
      });
    },
    comments: async (parent) => {
      return await prisma.comment.findMany({
        where: { postId: parent.id },
      });
    },
    likes: async (parent) => {
        return await prisma.like.findMany({
          where: { postId: parent.id },
        });
      },
  },
};

export default postResolvers;