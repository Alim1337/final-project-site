// Import the required dependencies
const express = require('express');
const { PrismaClient } = require('@prisma/client');

// Create an instance of the Prisma client
const prisma = new PrismaClient();

// Create an instance of the Express app
const app = express();

// Set up middleware to parse JSON body from incoming requests
app.use(express.json());

// Create a route for handling POST requests to /signup_client
app.post('/signup_client', async (req, res) => {
  try {
    // Extract the data from the request body
    const { Nom,PreNom,Date,Telephone, email,password,Sex } = req.body;

    // Use Prisma client to insert data into the database
    const newClient = await prisma.client.create({
      data: {
        Nom,
        PreNom,
        Date,

Telephone,

  email,
password, 
  Sex,



      
      },
    });

    // Return the newly created client as the response
    res.status(201).json(newClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the client.' });
  }
});

// Start the server on port 3000
app.listen(3001, () => {
  console.log('Server is running on port 3000');
});
