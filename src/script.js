/*
* Þetta er  javascript skrá fyrir index.html
*/

/*
* durationFormat tekur inn sekúndufjöla og skilar
* streng á forminu mín:sek
*/
function durationFormat(duration) {
  const minInSec = 60;

  const min = Math.floor(duration / minInSec);
  const sec = duration - (min * minInSec);

  const minStr = `${min}`;
  const secStr = (sec < 10 ? `0${sec}` : `${sec}`);

  return `${minStr}:${secStr}`;
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
  const yearInSec = 365 * dayInSec;

  if (secSince >= yearInSec) {
    const n = Math.floor(secSince / yearInSec);

    if (n === 1) {
      return `Fyrir ${n} ári síðan`;
    }
    return `Fyrir ${n} árum síðan`;
  } else if (secSince >= monthInSec) {
    const n = Math.floor(secSince / monthInSec);

    if (n === 1) {
      return `Fyrir ${n} mánuði síðan`;
    }
    return `Fyrir ${n} mánuðum síðan`;
  } else if (secSince >= weekInSec) {
    const n = Math.floor(secSince / weekInSec);

    if (n === 1) {
      return `Fyrir ${n} viku síðan`;
    }
    return `Fyrir ${n} vikum síðan`;
  } else if (secSince >= dayInSec) {
    const n = Math.floor(secSince / dayInSec);

    if (n === 1) {
      return `Fyrir ${n} degi síðan`;
    }
    return `Fyrir ${n} dögum síðan`;
  }
  const n = Math.floor(secSince / hourInSec);

  if (n === 1) {
    return `Fyrir ${n} klukkustund síðan`;
  }
  return `Fyrir ${n} klukkustundum síðan`;
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
* loadJSON hleður inn videos.json með XMLHttpRequest
*/
function loadJSON(callback) {
  const r = new XMLHttpRequest();
  r.overrideMimeType('application/json');
  r.open('GET', 'videos.json', true);


  r.onload = () => {
    if (r.status >= 200 && r.status < 400) {
      callback(r.response);
    } else {
      console.log('villa!', r);
    }
  };

  r.onerror = () => {
    console.log('villa í tengingu');
  };

  r.send();
}

/*
* getIndex tekur fylki data af hlutum obj og skilar index af data
* með attribute obj.id=id.
*/
function GetIndexById(data, id) {
  let ind = 0;
  let index = 0;

  data.forEach((obj) => {
    if (obj.id === id) {
      index = ind;
    } else {
      ind += 1;
    }
  });

  return index;
}

/*
* Fallið createCategory býr til myndbanda flokk Fyrir
* index.html
*/
function createCategory(main, category, videos) {
  const section = document.createElement('section');
  const sectionTitle = document.createElement('h2');
  const sectionItems = document.createElement('div');

  section.setAttribute('class', 'category');
  sectionTitle.setAttribute('class', 'category__title');
  sectionTitle.appendChild(document.createTextNode(category.title));
  sectionItems.setAttribute('class', 'category__items');

  main.appendChild(section);
  section.appendChild(sectionTitle);
  section.appendChild(sectionItems);

  category.videos.forEach((videoId) => {
    const vIndex = GetIndexById(videos, videoId);

    const videoLink = document.createElement('a');
    const videoImage = document.createElement('div');
    const videoImg = document.createElement('img');
    const videoLength = document.createElement('div');
    const videoTitle = document.createElement('h3');
    const videoDate = document.createElement('p');

    videoLink.setAttribute('class', 'video');
    videoLink.setAttribute('href', `./player.html?id=${videoId}`);
    videoImage.setAttribute('class', 'video__image');
    videoImg.setAttribute('class', 'video__img');
    videoImg.setAttribute('src', videos[vIndex].poster);
    videoLength.setAttribute('class', 'video__length');
    videoLength.appendChild(document.createTextNode(durationFormat(videos[vIndex].duration)));
    videoTitle.setAttribute('class', 'video__title');
    videoTitle.appendChild(document.createTextNode(videos[vIndex].title));
    videoDate.setAttribute('class', 'video__date');
    videoDate.appendChild(document.createTextNode(timeSinceCreated(videos[vIndex].created)));

    sectionItems.appendChild(videoLink);
    videoLink.appendChild(videoImage);
    videoImage.appendChild(videoImg);
    videoImage.appendChild(videoLength);
    videoLink.appendChild(videoTitle);
    videoLink.appendChild(videoDate);
  });

  main.appendChild(document.createElement('hr'));
}

/*
* Fallið byrjar þegar DOM tréið hefur hlaðist og hleður initIndex
* og skilgreinir hvað á að gera þegar videos.json hleðst inn.
*/
function initIndex() {
  const main = document.querySelector('main');

  empty(main);

  loadJSON((response) => {
    const data = JSON.parse(response);
    const { videos, categories } = data;

    categories.forEach((category) => {
      createCategory(main, category, videos);
    });
  });
}

/*
* Þessi atburða hlustandi keyrist þegar DOM tréið
* er að fullu hlaðið
*/
document.addEventListener('DOMContentLoaded', () => {
  initIndex();
});
