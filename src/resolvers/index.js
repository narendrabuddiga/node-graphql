import commentResolvers from "./commentResolvers.js";
import postResolvers from "./postResolvers.js";
import userResolvers from "./userResolvers.js";
import likeResolvers from "./likeResolvers.js";

export const resolvers = [userResolvers, postResolvers, commentResolvers, likeResolvers];