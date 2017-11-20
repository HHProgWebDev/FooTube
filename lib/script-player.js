'use strict';

/*
*
*/
/*
*
*/
function createVideo() {
  //  Finna body og main element
  var body = document.querySelector('body');
  var main = document.querySelector('main');
  //  Tæma body element.
  empty(body);

  //  Búa til element.
  var title = document.createElement('h1');
  var video = document.createElement('video');
  var buttonDiv = document.createElement('div');
  var prev = document.createElement('button');
  var play = document.createElement('button');
  var mute = document.createElement('button');
  var fullscreen = document.createElement('button');
  var next = document.createElement('button');
  var returnToIndex = document.createElement('a');

  //  Bæta við texta og attribute á element.
  title.setAttribute('class', 'video-title');
  video.setAttribute('class', 'video');
  buttonDiv.setAttribute('class', 'button-block');
  prev.appendChild(document.createTextNode('Fyrra'));
  prev.setAttribute('class', 'button button--prev');
  play.appendChild(document.createTextNode('Spila'));
  play.setAttribute('class', 'button button--play');
  mute.appendChild(document.createTextNode('Hljóð af'));
  mute.setAttribute('class', 'button button--mute');
  fullscreen.appendChild(document.createTextNode('Allur skjárinn'));
  fullscreen.setAttribute('class', 'button button--fullscreen');
  next.appendChild(document.createTextNode('Næsta'));
  next.setAttribute('class', 'button button--next');
  returnToIndex.appendChild(document.createTextNode('Til baka'));
  returnToIndex.setAttribute('href', '../');

  //  Bæta við upplýsingum úr videos.json skv. query streng í url.
  loadJSON(function (response) {
    var data = JSON.parse(response);
    var index = getIndex(data.videos, parseQuery());
    console.log(index);
    title.appendChild(document.createTextNode(data.videos[index].title));
    video.setAttribute('src', data.videos[index].video);
    video.setAttribute('poster', data.videos[index].poster);
  });

  //  Setja inn element
  body.appendChild(title);
  body.appendChild(main);
  main.appendChild(video);
  main.appendChild(buttonDiv);
  buttonDiv.appendChild(prev);
  buttonDiv.appendChild(play);
  buttonDiv.appendChild(mute);
  buttonDiv.appendChild(fullscreen);
  buttonDiv.appendChild(next);
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

  play.addEventListener('click', function (e) {
    e.preventDefault();

    if (video.paused) {
      video.play();
      empty(play);
      play.appendChild(document.createTextNode('Stoppa'));
      play.setAttribute('class', 'button button--pause');
    } else {
      video.pause();
      empty(play);
      play.appendChild(document.createTextNode('Spila'));
      play.setAttribute('class', 'button button--play');
    }
  });
}
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
  r.overrideMimeType("application/json");
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
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) == 'id') {
      return decodeURIComponent(pair[1]);
    }
  }
  console.log('Query strengur er ekki réttur');
}

/*
* getIndex tekur fylki data af hlutum obj og skilar index af data
* með attribute obj.id=id.
*/
function getIndex(data, id) {
  var ind = 0;
  var index = 0;

  data.forEach(function (obj) {
    if (obj.id == id) {
      index = ind;
    } else {
      ind += 1;
    }
  });

  return index;
}

document.addEventListener('DOMContentLoaded', function () {
  createVideo();
});
//# sourceMappingURL=script-player.js.map