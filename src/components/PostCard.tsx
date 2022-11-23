import type { Post, User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { trpc } from '../utils/trpc';

type PostType = { post: Post & { author: User }; refetch: () => void };

const PostCard: React.FC<PostType> = ({ post, refetch }) => {
  const session = useSession();
  const deletePost = trpc.post.deletePost.useMutation({
    onSuccess: () => {
      refetch();
    }
  });

  function deleteButton() {
    deletePost.mutate({
      postId: post.id
    });
  }

  return (
    <div className="m-2 w-96 rounded border-2 border-black p-2" key={post.id}>
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
            className="ml-auto rounded border-2 border-black p-1 text-sm"
            onClick={deleteButton}
          >
            Delete
          </button>
        )}
      </div>
      <h1 className="mt-2 text-xl">{post.title}</h1>
      <p className="my-1">{post.content}</p>
      <p className="text-gray-600">
        {post.createdAt.toLocaleDateString()} at{' '}
        {post.createdAt.toLocaleTimeString()}
      </p>
    </div>
  );
};

export default PostCard;
