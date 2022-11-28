## music-score.js

Example usage: https://arvin-z.github.io/music-score.js/examples.html

### Getting started:

Load music-score.css and music-score.js on your HTML page:

```html
<link rel="stylesheet" href="music-score.css">
<script defer type="text/javascript" src="music-score.js"></script>
```

Create an empty div with a unique id:

```html
<div id='sample'></div>
```

In your script, initialize a MusicScore instance with the div id as argument:

```javascript
const demoSong = new MusicScore('sample');
```

Documentation: https://arvin-z.github.io/music-score.js/documentation.html
