const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });
const assetsRouter = require('./routes/assets');
const jobSitesRouter = require('./routes/jobSites');
const assignmentsRouter = require('./routes/assignments');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/assets', assetsRouter);
app.use('/job_sites', jobSitesRouter);
app.use('/assignments', assignmentsRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Field Equipment Tracker API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});