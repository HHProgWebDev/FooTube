'use strict';

/*
* Þetta er  javascript skrá fyrir index.html
*/

/*
* durationFormat tekur inn sekúndufjöla og skilar
* streng á forminu mín:sek
*/
function durationFormat(duration) {
  var minInSec = 60;

  var min = Math.floor(duration / minInSec);
  var sec = duration - min * minInSec;

  var minStr = '' + min;
  var secStr = sec < 10 ? '0' + sec : '' + sec;

  return minStr + ':' + secStr;
}

/*
* Fallið timeSinceCreated tekur tíma í millisekundum
* og skilar streng um hve langt það var.
*/
function timeSinceCreated(created) {
  var secSince = (Date.now() - created) / 1000;
  var hourInSec = 60 * 60;
  var dayInSec = 24 * hourInSec;
  var weekInSec = 7 * dayInSec;
  var monthInSec = 30 * dayInSec;
  var yearInSec = 365 * dayInSec;

  if (secSince >= yearInSec) {
    var _n = Math.floor(secSince / yearInSec);

    if (_n === 1) {
      return 'Fyrir ' + _n + ' \xE1ri s\xED\xF0an';
    }
    return 'Fyrir ' + _n + ' \xE1rum s\xED\xF0an';
  } else if (secSince >= monthInSec) {
    var _n2 = Math.floor(secSince / monthInSec);

    if (_n2 === 1) {
      return 'Fyrir ' + _n2 + ' m\xE1nu\xF0i s\xED\xF0an';
    }
    return 'Fyrir ' + _n2 + ' m\xE1nu\xF0um s\xED\xF0an';
  } else if (secSince >= weekInSec) {
    var _n3 = Math.floor(secSince / weekInSec);

    if (_n3 === 1) {
      return 'Fyrir ' + _n3 + ' viku s\xED\xF0an';
    }
    return 'Fyrir ' + _n3 + ' vikum s\xED\xF0an';
  } else if (secSince >= dayInSec) {
    var _n4 = Math.floor(secSince / dayInSec);

    if (_n4 === 1) {
      return 'Fyrir ' + _n4 + ' degi s\xED\xF0an';
    }
    return 'Fyrir ' + _n4 + ' d\xF6gum s\xED\xF0an';
  }
  var n = Math.floor(secSince / hourInSec);

  if (n === 1) {
    return 'Fyrir ' + n + ' klukkustund s\xED\xF0an';
  }
  return 'Fyrir ' + n + ' klukkustundum s\xED\xF0an';
}

/*
* loadJSON hleður inn videos.json með XMLHttpRequest
*/
function loadJSON(callback) {
  var r = new XMLHttpRequest();
  r.overrideMimeType('application/json');
  r.open('GET', 'videos.json', true);

  r.onload = function () {
    if (r.status >= 200 && r.status < 400) {
      callback(r.response);
    } else {
      // Lætur vita að villa hefur átt sér stað
      // eslint-disable-next-line no-console
      console.log('Villa!', r);
    }
  };

  r.onerror = function () {
    // Lætur vita að villa hefur átt sér stað
    // eslint-disable-next-line no-console
    console.log('Villa í tengingu');
  };

  r.send();
}

/*
* getIndex tekur fylki data af hlutum obj og skilar index af data
* með attribute obj.id=id.
*/
function GetIndexById(data, id) {
  var ind = 0;
  var index = 0;

  data.forEach(function (obj) {
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
  var section = document.createElement('section');
  var sectionTitle = document.createElement('h2');
  var sectionItems = document.createElement('div');

  section.setAttribute('class', 'category');
  sectionTitle.setAttribute('class', 'category__title');
  sectionTitle.appendChild(document.createTextNode(category.title));
  sectionItems.setAttribute('class', 'category__items row');

  main.appendChild(section);
  section.appendChild(sectionTitle);
  section.appendChild(sectionItems);

  category.videos.forEach(function (videoId) {
    var vIndex = GetIndexById(videos, videoId);

    var videoLink = document.createElement('a');
    var videoImage = document.createElement('div');
    var videoImg = document.createElement('img');
    var videoLength = document.createElement('div');
    var videoTitle = document.createElement('h3');
    var videoDate = document.createElement('p');

    videoLink.setAttribute('class', 'video col col-4 col-md-6 col-sm-12');
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
  var main = document.querySelector('main');

  loadJSON(function (response) {
    var data = JSON.parse(response);
    var videos = data.videos,
        categories = data.categories;


    categories.forEach(function (category) {
      createCategory(main, category, videos);
    });
  });
}

/*
* Þessi atburða hlustandi keyrist þegar DOM tréið
* er að fullu hlaðið
*/
document.addEventListener('DOMContentLoaded', function () {
  initIndex();
});
//# sourceMappingURL=script.js.map