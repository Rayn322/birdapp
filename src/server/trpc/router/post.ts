import { z } from 'zod';
import { protectedProcedure, router } from '../trpc';

export const postRouter = router({
  getPosts: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.post.findMany({
      // where: {
      //   authorId: ctx.session.user.id
      // },
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
    })
});
