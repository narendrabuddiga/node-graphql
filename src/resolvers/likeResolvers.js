import prisma from "../db/prisma.js";

const likeResolvers = {
    Query: {
        likes: async () => {
            return await prisma.like.findMany();
        },
    },
    Mutation: {
        createLike: async (_, args) => {
            const { userId, postId, commentId } = args;
            return await prisma.like.create({
                data: {
                    userId,
                    postId,
                    commentId,
                },
            });
        },
        updateLike: async (_, args) => {
            const { id, userId, postId, commentId } = args;
            return await prisma.like.update({
                where: { id },
                data: {
                    userId,
                    postId,
                    commentId,
                },
            });
        },
        deleteLike: async (_, args) => {
            const { id } = args;
            return await prisma.like.delete({
                where: { id },
            });
        },
    },
    Like: {
        post: async (parent) => {
            return await prisma.post.findUnique({
                where: { id: parent.postId },
            });
        },
        comment: async (parent) => {
            return await prisma.comment.findUnique({
                where: { id: parent.commentId },
            });
        },
        user: async (parent) => {
            return await prisma.comment.findUnique({
                where: { id: parent.userId },
            });
        },
    },
};

export default likeResolvers;