/*
* Fallið byrjar þegar DOM tréið hefur hlaðist og hleður initIndex
* og skilgreinir hvað á að gera þegar videos.json hleðst inn.
*/
function initIndex() {
  const main = document.querySelector('main');

  empty(main);

  loadJSON(response => {
    const data = JSON.parse(response);
    const videos = data.videos;
    const categories = data.categories;

    categories.forEach(function (category) {
      createCategory(main, category, videos);
    })
  });
}

/*
* Fallið createCategory býr til myndbanda flokk Fyrir
* index.html
*/
function createCategory(main, category, videos) {
  const section = document.createElement('section');
  const sectionTitle = document.createElement('h2');

  section.setAttribute('class', 'category');
  sectionTitle.setAttribute('class', 'category__title');
  sectionTitle.appendChild(document.createTextNode(category.title));

  main.appendChild(section);
  section.appendChild(sectionTitle);

  category.videos.forEach(function (videoId) {
    let vIndex = GetIndexById(videos, videoId);

    let sectionItem = document.createElement('div');
    let videoLink = document.createElement('a');
    let videoImage = document.createElement('div');
    let videoImg = document.createElement('img');
    let videoLength = document.createElement('div');
    let videoTitle = document.createElement('h2');
    let videoDate = document.createElement('h3');

    sectionItem.setAttribute('class', 'category__item');
    videoLink.setAttribute('class', 'video');
    videoLink.setAttribute('href', './player.html?id=' + videoId);
    videoImage.setAttribute('class', 'video__image');
    videoImg.setAttribute('class', 'video__img');
    videoImg.setAttribute('src', videos[vIndex].poster);
    videoLength.setAttribute('class', 'video__length');
    videoLength.appendChild(document.createTextNode(durationFormat(videos[vIndex].duration)));
    videoTitle.setAttribute('class', 'video__title');
    videoTitle.appendChild(document.createTextNode(videos[vIndex].title));
    videoDate.setAttribute('class', 'video__date');
    videoDate.appendChild(document.createTextNode(timeSinceCreated(videos[vIndex].created)));

    section.appendChild(sectionItem);
    sectionItem.appendChild(videoLink);
    videoLink.appendChild(videoImage);
    videoImage.appendChild(videoImg);
    videoImage.appendChild(videoLength);
    videoLink.appendChild(videoTitle);
    videoLink.appendChild(videoDate);
  })
}

function durationFormat(duration) {
  const minInSec = 60;

  const min = Math.floor(duration / minInSec);
  const sec = duration - min * minInSec;

  return `${min}:${sec}`;


}

/*
* Fallið timeSinceCreated tekur tíma í millisekundum
* og skilar streng um hve langt það var.
*/
function timeSinceCreated(created) {
  const secSince = (Date.now() - created) / 1000;
  const hourInSec = 60 * 60;
  const dayInSec = 24 * hourInSec;
  const weekInSec = 7 * dayInSec;
  const monthInSec = 30 * dayInSec;
  const yearInSec = 365 * dayInSec

  if (secSince >= yearInSec) {
    const n = Math.floor(secSince / yearInSec);

    if (n == 1) {
      return `Fyrir ${n} ári síðan`;
    } else {
      return `Fyrir ${n} árum síðan`;
    }
  } else if (secSince >= monthInSec) {
    const n = Math.floor(secSince / monthInSec);

    if (n == 1) {
      return `Fyrir ${n} mánuði síðan`;
    } else {
      return `Fyrir ${n} mánuðum síðan`;
    }
  } else if (secSince >= weekInSec) {
    const n = Math.floor(secSince / weekInSec);

    if (n == 1) {
      return `Fyrir ${n} viku síðan`;
    } else {
      return `Fyrir ${n} vikum síðan`;
    }
  } else if (secSince >= dayInSec) {
    const n = Math.floor(secSince / dayInSec);

    if (n == 1) {
      return `Fyrir ${n} degi síðan`;
    } else {
      return `Fyrir ${n} dögum síðan`;
    }
  } else {
    const n = Math.floor(secSince / hourInSec);

    if (n == 1) {
      return `Fyrir ${n} klukkustund síðan`;
    } else {
      return `Fyrir ${n} klukkustundum síðan`;
    }
  }
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
* loadJSON hleður inn videos.json með XMLHttpRequest
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
  initIndex();
});
