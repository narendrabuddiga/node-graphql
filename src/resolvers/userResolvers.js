import prisma from "../db/prisma.js";

const userResolvers = {
    Query: {
        user: async () => {
            return await prisma.user.findMany();
        },
    },
    Mutation: {
        createUser: async (_, args) => {
            const { email, name } = args;
            return await prisma.user.create({
                data: {
                    email,
                    name,
                },
            });
        },
        updateUser: async (_, args) => {
            const { id, name } = args;
            return await prisma.user.update({
                where: {
                    id,
                },
                data: {
                    name,
                },
            });
        },
        deleteUser: async (_, args) => {
            const { id } = args;
            return await prisma.user.delete({
                where: { id },
            });
        },
    },
    User: {
        comments: async (parent) => {
            return await prisma.comment.findMany({
                where: { userId: parent.id },
            });
        },
        posts: async (parent) => {
            return await prisma.post.findMany({
                where: { authorId: parent.id },
            });
        },
        likes: async (parent) => {
            return await prisma.like.findMany({
                where: { userId: parent.id },
            });
        },
    },
};

export default userResolvers;