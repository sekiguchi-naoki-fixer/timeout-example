(function () {
  const MAX_COUNT = 10;
  const CHECK_INTERVAL_SECOND = 1000 * 3;
  const CHECK_INTERVAL_COUNT = 2;
  const timer = setInterval(intervalHandler, 1000);
  const $timer = document.getElementById('timer');
  const $expires = document.getElementById('expires');

  let currentCount = 0;
  let expires;
  let lastActedLocalTime = Date.now();

  function shouldRequest(baseTime, nowTime) {
    return nowTime - baseTime > CHECK_INTERVAL_SECOND;
  }

  function requestAction (shouldUpdateSession) {
    const fetchOpt = {
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      }
    };
    const url = `/api/time${shouldUpdateSession ? '?shouldUpdateSession=true' : ''}`;
    const request = fetch(url, fetchOpt).then(function (res) {
      if (res.ok && /(api\/time)/.test(res.url)) {
        return res.json();
      } else {
        location.href = '/login';
        clearInterval(timer);
      }
    });
    if (request.then) {
      request.then(function (data) {
        if (data) { 
          if (shouldUpdateSession) {
            expires = data.expires;
            currentCount = 0;
          }
          updateView(MAX_COUNT - currentCount, expires);
        }
      });
    }
  }

  function intervalHandler() {
    currentCount ++;
    const count = MAX_COUNT - currentCount;
    updateView(count < 0 ? 0 : count);
    if (currentCount % CHECK_INTERVAL_COUNT === 0) {
      requestAction(false);
    } else {
      console.log('skip');
    }
  }

  function activityHandler () {
    if (shouldRequest(lastActedLocalTime, Date.now())) {
      lastActedLocalTime = Date.now();
      requestAction(true);
    } else {
      currentCount = 0;
      console.log('skip');
    }
  }

  function updateView (second, expires) {
    if ($timer) {
      $timer.innerHTML = `${second} seconds left`;
    }
    if (expires && $expires) {
      const d = new Date(expires);
      // $expires.innerHTML = `${d.toString()}`;
    }
  }

  window.addEventListener('mousemove', activityHandler, false);
  window.addEventListener('keydown', activityHandler, false);
  window.addEventListener('focus', activityHandler, false);

})();
