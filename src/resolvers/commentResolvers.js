import prisma from "../db/prisma.js";

const commentResolvers = {
    Query: {
        comments: async () => {
            return await prisma.comment.findMany();
        },
    },
    Mutation: {
        createComment: async (_, args) => {
            const { text, postId, userId } = args;
            return await prisma.comment.create({
                data: {
                    text,
                    postId,
                    userId,
                },
            });
        },
        updateComment: async (_, args) => {
            const { id, text, postId, userId } = args;
            return await prisma.comment.update({
                where: { id },
                data: {
                    text,
                    postId,
                    userId,
                },
            });
        },
        deleteComment: async (_, args) => {
            const { id } = args;
            return await prisma.comment.delete({
                where: { id },
            });
        },
    },
    Comment: {
        post: async (parent) => {
            return await prisma.post.findUnique({
                where: { id: parent.postId },
            });
        },
        user: async (parent) => {
            return await prisma.user.findUnique({
                where: { id: parent.userId },
            });
        },
        likes: async (parent) => {
            return await prisma.like.findMany({
                where: { commentId: parent.id },
            });
        },
    },
};

export default commentResolvers;