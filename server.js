const express = require('express');
const mpd = require('mpd');
const cmd = mpd.cmd;
const path = require('path');
const { execSync } = require("child_process");

const app = express();
const port = 3000;

const client = mpd.connect({
    path: "/tmp/mpd.socket",
});

let currentSong = {};

client.on('ready', () => {
    console.log('MPD verbunden!');
    updateSongInfo();
    setInterval(updateSongInfo, 500);
});

function updateSongInfo() {
  client.sendCommand(cmd("currentsong", []), function (err, msg) {
    if (err) throw err;
    currentSong = mpd.parseKeyValueMessage(msg);
  });
}

app.use(express.static(path.join(__dirname, 'public')));


app.get("/api/cover", (req, res) => {
  try {
    const uri = execSync(`playerctl metadata --player=mpd mpris:artUrl`)
      .toString()
      .trim();
    const path = uri.replace("file://", "");

    res.sendFile(path);
  } catch (err) {
    res.status(404).send("Cover not found");
  }
});

app.get("/api/coverid", (req, res) => {
  try {
    const uri = execSync(`playerctl metadata --player=mpd --format '{"trackid": "{{mpris:trackid}}"}'`)
      .toString()
      .trim();
    res.json(JSON.parse(uri));
  } catch (err) {
    res.status(404).send("Cover not found" + err);
  }
});


app.get('/api/song', (req, res) => {
  res.json(currentSong);
});


app.listen(port);
