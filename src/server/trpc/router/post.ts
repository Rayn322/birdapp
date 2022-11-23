import { z } from 'zod';
import { protectedProcedure, router } from '../trpc';

export const postRouter = router({
  getPosts: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.post.findMany({
      include: {
        author: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }),
  createPost: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
          authorId: ctx.session.user.id
        }
      });

      return post;
    }),
  deletePost: protectedProcedure
    .input(
      z.object({
        postId: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.delete({
        where: {
          id_authorId: {
            id: input.postId,
            authorId: ctx.session.user.id
          }
        }
      });

      return post;
    })
});
