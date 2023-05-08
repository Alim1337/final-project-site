import { useState, useEffect } from 'react';

export default function Testbdd() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    }
    getUsers();
  }, []);

  return (
    <main>
      <h2>Hello this is testbdd</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
