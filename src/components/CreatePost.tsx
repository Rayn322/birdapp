import { type FormEvent, useState } from 'react';
import { trpc } from '../utils/trpc';

const CreatePost = () => {
  const utils = trpc.useContext();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const createPost = trpc.post.createPost.useMutation({
    onSuccess: () => {
      utils.post.invalidate();
    }
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createPost.mutate({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <div className="flex w-80 flex-col">
      <h1 className="text-3xl">Create Post</h1>
      <form className="flex flex-col" onSubmit={(event) => onSubmit(event)}>
        <input
          className="m-1 rounded border-2 border-black p-1.5 focus:outline-none dark:border-gray-300 dark:bg-transparent dark:placeholder:text-gray-500"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <textarea
          className="m-1 rounded border-2 border-black p-1.5 focus:outline-none dark:border-gray-300 dark:bg-transparent dark:placeholder:text-gray-500"
          placeholder="Content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <button
          className="m-1 rounded-lg border-2 border-black p-1 dark:border-gray-300 "
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
