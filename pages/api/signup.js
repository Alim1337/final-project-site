/*import { query } from 'db';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  const { nom, prenom, email, password, confirmPassword, dateDeNaissance, sexe } = req.body;

  if (!nom || !prenom || !email || !password || !confirmPassword || !dateDeNaissance || !sexe) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await query(
      'INSERT INTO "Client" (nom, prenom, email, motdepasse, datenaissance, sexe) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [nom, prenom, email, hashedPassword, dateDeNaissance, sexe]
    );

    res.status(200).json({ client: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
*/