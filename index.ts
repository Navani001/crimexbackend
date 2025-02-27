const express = require('express')
const app = express()
const PORT = 4000


app.get('/', (req:any, res:any) => {
  res.status(200).json('Welcome, your app is working well');
})


app.listen(4000, () => {
  console.log(`Server running at http://localhost:4000`);
});

// Export the Express API
module.exports = app