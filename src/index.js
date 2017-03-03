const path = require('path');
const cors = require('cors');
const express = require('express');
const caniuse = require('caniuse-api');
const favicon = require('serve-favicon');
const compression = require('compression');

const port = process.env.PORT || 8000;
const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(favicon(path.join(__dirname, '../favicon.png')));
app.use(compression());
app.use((req, res) => {
  const browsers = caniuse.getLatestStableBrowsers();
  const versions = browsers.reduce((memo, bro) => {
    const parts = bro.split(' ');

    memo[parts[0]] = parts[1];

    return memo;
  }, {});

  res.json({ versions });
});

app.listen(port, () => {
  console.log(`latest browsers api started at http://localhost:${port}`);
});
