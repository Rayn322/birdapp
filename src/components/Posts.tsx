import { type FormEvent, useState } from 'react';
import { trpc } from '../utils/trpc';

const Posts = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const createPost = trpc.post.createPost.useMutation({
    onSuccess: (post) => {
      console.log('post', post);
    }
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createPost.mutate({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <div>
      <h1 className="text-3xl">Posts</h1>
      <form className="flex flex-col" onSubmit={(event) => onSubmit(event)}>
        <input
          className="m-1 rounded border-2 border-gray-700 p-1"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <textarea
          className="m-1 rounded border-2 border-gray-700 p-1"
          placeholder="Content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <button
          className="m-1 rounded-lg border-2 border-gray-700 p-1"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Posts;
