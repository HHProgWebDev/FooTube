/*
*
*/
/*
*
*/
function createVideo() {
  //  Finna body og main element
  const body = document.querySelector('body');
  const main = document.querySelector('main');
  //  Tæma body element.
  empty(body);

  //  Búa til element.
  const title = document.createElement('h1');
  const videoframe = document.createElement('div');
  const video = document.createElement('video');
  const videoplayerDiv = document.createElement('div');
  const buttonDiv = document.createElement('div');
  const back = document.createElement('button');
  const play = document.createElement('button');
  const mute = document.createElement('button');
  const fullscreen = document.createElement('button');
  const next = document.createElement('button');
  const returnToIndex = document.createElement('a');

  //  Bæta við texta og attribute á element.
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

  //  Bæta við upplýsingum úr videos.json skv. query streng í url.
  loadJSON(function (response) {
    const data = JSON.parse(response);
    const index = GetIndexById(data.videos, parseQuery());
    title.appendChild(document.createTextNode(data.videos[index].title));
    video.setAttribute('src', data.videos[index].video);
    video.setAttribute('poster', data.videos[index].poster);
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
  main.appendChild(returnToIndex);

  //  Bæta við takka atburða hlustendum.
  video.addEventListener('ended', e => {
    e.preventDefault();

    video.pause();
    video.currentTime = 0;
    empty(play);
    play.appendChild(document.createTextNode('Spila'));
    play.setAttribute('class', 'button button--play');
  })

  play.addEventListener('click', e => {
    e.preventDefault();

    if (video.paused) {
      video.play();
      empty(play);
      play.appendChild(document.createTextNode('Stoppa'));
      play.setAttribute('class', 'button button--pause');
      document.querySelector('.videoplayer-overlay').setAttribute('class', 'videoplayer-overlay hidden');
    }
    else {
      video.pause();
      empty(play);
      play.appendChild(document.createTextNode('Spila'));
      play.setAttribute('class', 'button button--play');
      document.querySelector('.videoplayer-overlay').setAttribute('class', 'videoplayer-overlay');
    }
  });

  mute.addEventListener('click', e => {
    e.preventDefault();

    if(video.volume == 1.0) {
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

  fullscreen.addEventListener('click', e => {
    e.preventDefault();

    //requestFullScreen verður það fullscreen fall sem vafrinn styður
    var requestFullScreen = video.requestFullscreen || video.msRequestFullscreen || video.mozRequestFullScreen || video.webkitRequestFullscreen;

    requestFullScreen.call(video);
  })

  back.addEventListener('click', e => {
    e.preventDefault();

    video.currentTime -= 3;
  })

  next.addEventListener('click', e => {
    e.preventDefault();

    video.currentTime += 3;
  })

}
/*
* empty tæmir öll börn el.
*/
function empty(el) {
  while(el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

/*
* loadJSON tekur við falli callback sem tekur response
* og vinnur með það
*/
function loadJSON(callback) {
  const r = new XMLHttpRequest();
  r.overrideMimeType("application/json");
  r.open('GET', 'videos.json', true);


  r.onload = function() {
    if (r.status >= 200 && r.status < 400) {
      callback(r.response);
    } else {
      console.log('villa!',r);
    }
  };

  r.onerror = function() {
    console.log('villa í tengingu');
  }

  r.send();
}

/*
* parseQuery skoðar url og skilar gildi id frá querystrengnum.
* Ef query strengur er ekki réttur skilar parseQuery -1.
*/
function parseQuery() {
  const query = window.location.search.substring(1);
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
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
function GetIndexById(data, id) {
  let ind = 0;
  let index = 0;


  data.forEach(function(obj) {
    if(obj.id == id) {
      index = ind;
    } else {
      ind += 1;
    }
  });

  return index;
}


document.addEventListener('DOMContentLoaded', () => {
  createVideo();
});
