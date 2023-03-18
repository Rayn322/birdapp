import type { Post, User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { trpc } from '../utils/trpc';

type PostType = { post: Post & { author: User } };

// consider using context instead of passing refetch
const PostCard: React.FC<PostType> = ({ post }) => {
  const utils = trpc.useContext();
  const session = useSession();
  const deletePost = trpc.post.deletePost.useMutation({
    onSuccess: () => {
      utils.post.invalidate();
    }
  });

  function deleteButton() {
    deletePost.mutate({
      postId: post.id
    });
  }

  function getRelativeTime(date: Date) {
    const formatter = new Intl.RelativeTimeFormat('en');
    const now = new Date();
    const diff = date.valueOf() - now.valueOf();
    return formatter.format(Math.ceil(diff / (1000 * 60 * 60 * 24)), 'days');
  }

  return (
    <div
      className="w-96 break-words rounded border-2 border-black p-2 dark:border-gray-300"
      key={post.id}
    >
      <div className="flex">
        <div className="flex items-center gap-2">
          {post.author.image && (
            <Image
              src={post.author.image}
              width={32}
              height={32}
              alt={`${post.author.name}'s profile picture`}
              className="rounded-full"
            />
          )}
          <p>{post.author.name}</p>
        </div>
        {post.author.id === session.data?.user?.id && (
          <button
            className="ml-auto rounded border-2 border-black p-1 text-sm dark:border-gray-400"
            onClick={deleteButton}
          >
            Delete
          </button>
        )}
      </div>
      <h1 className="mt-2 text-xl">{post.title}</h1>
      <p className="mt-1 font-light">{post.content}</p>
      <p
        className="mt-2 text-gray-600 dark:text-gray-400"
        title={`${post.createdAt.toLocaleDateString()} at ${post.createdAt.toLocaleTimeString()}`}
      >
        {/* show time relative to now */}
        {getRelativeTime(post.createdAt)}
      </p>
    </div>
  );
};

export default PostCard;
