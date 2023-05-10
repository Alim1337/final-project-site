import useSWR from 'swr';

export default function Tpage() {
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR('/api/posts', fetcher);

  if (error) return <div>An error occurred.</div>;
  if (!data) return <div>Loading ...</div>;

  console.log(data); // log the data object to the console

  return (
    <ul>
      {data.posts && data.posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
