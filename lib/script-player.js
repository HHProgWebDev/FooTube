'use strict';

/*
* Þessi javascript skrá er fyrir myndbandaspilarann fyrir
* player.html
*/

/*
* empty tæmir öll börn el.
*/
function empty(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

/*
* loadJSON tekur við falli callback sem tekur response
* og vinnur með það
*/
function loadJSON(callback) {
  var r = new XMLHttpRequest();
  r.overrideMimeType('application/json');
  r.open('GET', 'videos.json', true);

  r.onload = function () {
    if (r.status >= 200 && r.status < 400) {
      callback(r.response);
    } else {
      console.log('villa!', r);
    }
  };

  r.onerror = function () {
    console.log('villa í tengingu');
  };

  r.send();
}

/*
* parseQuery skoðar url og skilar gildi id frá querystrengnum.
* Ef query strengur er ekki réttur skilar parseQuery -1.
*/
function parseQuery() {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  var result = -1;

  vars.forEach(function (v) {
    var pair = v.split('=');
    if (decodeURIComponent(pair[0]) === 'id') {
      result = decodeURIComponent(pair[1]);
    }
  });

  return result;
}

/*
* getIndex tekur fylki data af hlutum obj og skilar index af data
* með attribute obj.id = id.
* Ef ekki er til obj með obj.id = id þá skilar fallið -1.
*/
function GetIndexById(data, id) {
  var temp = -1;
  var index = -1;

  data.forEach(function (obj) {
    if (obj.id === parseInt(id, 10)) {
      index = temp + 1;
    } else {
      temp += 1;
    }
  });

  return index;
}

/*
* createVideo fallið býr til html fyrir player.html
*/
function createVideo() {
  //  Finna body og main element
  var body = document.querySelector('body');
  var main = document.querySelector('main');
  //  Tæma body element.
  empty(body);

  //  Búa til element.
  var videoDiv = document.createElement('div');
  var title = document.createElement('h1');
  var videoframe = document.createElement('div');
  var video = document.createElement('video');
  var videoplayerDiv = document.createElement('div');
  var buttonDiv = document.createElement('div');
  var back = document.createElement('button');
  var play = document.createElement('button');
  var mute = document.createElement('button');
  var fullscreen = document.createElement('button');
  var next = document.createElement('button');
  var returnToIndex = document.createElement('a');
  var loadError = document.createElement('p');

  //  Bæta við texta og attribute á element.
  videoDiv.setAttribute('class', 'video-block');
  title.setAttribute('class', 'video-title');
  videoframe.setAttribute('class', 'video-frame');
  video.setAttribute('class', 'videoplayer');
  videoplayerDiv.setAttribute('class', 'videoplayer-overlay');
  buttonDiv.setAttribute('class', 'button-block');
  back.appendChild(document.createTextNode('Fyrra'));
  back.setAttribute('class', 'button button--back');
  play.appendChild(document.createTextNode('Spila'));
  play.setAttribute('class', 'button button--play');
  mute.appendChild(document.createTextNode('Hljóð af'));
  mute.setAttribute('class', 'button button--mute');
  fullscreen.appendChild(document.createTextNode('Allur skjárinn'));
  fullscreen.setAttribute('class', 'button button--fullscreen');
  next.appendChild(document.createTextNode('Næsta'));
  next.setAttribute('class', 'button button--next');
  returnToIndex.appendChild(document.createTextNode('Til baka'));
  returnToIndex.setAttribute('href', './index.html');
  loadError.appendChild(document.createTextNode('Gat ekki hlaðið myndbandi'));
  loadError.setAttribute('class', 'hidden');

  //  Bæta við upplýsingum úr videos.json skv. query streng í url.
  loadJSON(function (response) {
    var data = JSON.parse(response);
    var index = GetIndexById(data.videos, parseQuery());
    if (index >= 0) {
      title.appendChild(document.createTextNode(data.videos[index].title));
      video.setAttribute('src', data.videos[index].video);
      video.setAttribute('poster', data.videos[index].poster);
    } else {
      videoDiv.setAttribute('class', 'hidden');
      loadError.setAttribute('class', 'loadError');
    }
  });

  //  Setja inn element
  body.appendChild(main);
  main.appendChild(title);
  main.appendChild(videoframe);
  videoframe.appendChild(video);
  videoframe.appendChild(videoplayerDiv);
  main.appendChild(buttonDiv);
  buttonDiv.appendChild(back);
  buttonDiv.appendChild(play);
  buttonDiv.appendChild(mute);
  buttonDiv.appendChild(fullscreen);
  buttonDiv.appendChild(next);
  main.appendChild(loadError);
  main.appendChild(returnToIndex);

  //  Bæta við takka atburða hlustendum.
  video.addEventListener('ended', function (e) {
    e.preventDefault();

    video.pause();
    video.currentTime = 0;
    empty(play);
    play.appendChild(document.createTextNode('Spila'));
    play.setAttribute('class', 'button button--play');
  });

  function playClick(e) {
    e.preventDefault();

    if (video.paused) {
      video.play();
      empty(play);
      play.appendChild(document.createTextNode('Stoppa'));
      play.setAttribute('class', 'button button--pause');
      videoplayerDiv.setAttribute('class', 'videoplayer-overlay playing');
    } else {
      video.pause();
      empty(play);
      play.appendChild(document.createTextNode('Spila'));
      play.setAttribute('class', 'button button--play');
      videoplayerDiv.setAttribute('class', 'videoplayer-overlay');
    }
  }

  play.addEventListener('click', playClick);
  videoplayerDiv.addEventListener('click', playClick);

  mute.addEventListener('click', function (e) {
    e.preventDefault();

    if (video.volume === 1.0) {
      video.volume = 0.0;
      empty(mute);
      mute.appendChild(document.createTextNode('Hljóð á'));
      mute.setAttribute('class', 'button button--sound');
    } else {
      video.volume = 1.0;
      empty(mute);
      mute.appendChild(document.createTextNode('Hljóð af'));
      mute.setAttribute('class', 'button button--mute');
    }
  });

  fullscreen.addEventListener('click', function (e) {
    e.preventDefault();

    // requestFullScreen verður það fullscreen fall sem vafrinn styður
    var requestFullScreen = video.requestFullscreen || video.msRequestFullscreen || video.mozRequestFullScreen || video.webkitRequestFullscreen;

    requestFullScreen.call(video);
  });

  back.addEventListener('click', function (e) {
    e.preventDefault();

    video.currentTime -= 3;
  });

  next.addEventListener('click', function (e) {
    e.preventDefault();

    video.currentTime += 3;
  });
}
/*
* Þessi atburða hlustandi keyrist þegar DOM tréið
* er að fullu hlaðið
*/
document.addEventListener('DOMContentLoaded', function () {
  createVideo();
});
//# sourceMappingURL=script-player.js.map