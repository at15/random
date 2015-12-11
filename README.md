# random - Serve random image and audio

A sever that serve local files
random music, avatar, background image
more fun when dev.

## Usage

First you need to have `config.js`, or you can config it programmatically. 

````js
{
    music:{
        light:[
            '/Users/gpl/Music/网易云音乐/*.mp3'
        ],
        electric:[
            '/Users/gpl/Music/网易云音乐/*.mp3'
        ],
    }
}
````

Add a `audio` tag to your html, remember to disable it in production.

`http://localhost:3838/music?group=light` to random in light music
`http://localhost:3838/music?group=_all` to random in all music

````
<div id="music">
<audio autoplay loop>
  <source src="http://localhost:3838/music type="audio/mpeg">
  <p>If you can read this, your browser does not support the audio element.</p>
</audio>
</div>
```
