import { z } from 'zod';
import { protectedProcedure, router } from '../trpc';

export const postRouter = router({
  getPosts: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      where: {
        id: ctx.session.user.id
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
