# obs-mpd-widget
## Dependencies:
- mpd
- playerctl
- mpd-mpris
- nodejs
- npm

On Arch Linux:
`sudo pacman -S mpd mpd-mpris nodejs npm playerctl` 

## Instruction
Be sure that MPD and mpd-mpris are running and mpd-mpris is connected to MPD.

Clone the repository

Change into the directory

Type `npm install` to install the dependencies.

Then run `node server.js` to start the program.

Now you should be able to enter `localhost:3000` in the URL of your browser, and it should work.

### In OBS:

Create a new Browser Source with the frame rate set as high as possible and the resolution to 1920 x 1080.
