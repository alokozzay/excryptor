function enterCoins() {

    let fields = document
      .querySelector(".wallet")
      .querySelectorAll(".main__crypto_field-drop");
    let settings = {
      async: true,
      crossDomain: true,
      url: "https://api.godex.io/api/v1/coins",
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };
  
    $.ajax(settings).done(function (response) {
      $.ajax({
        complete: function () {
          mas = response;
          for (let i = 0; i < fields.length; i++) {
            for (let j = 0; j < mas.length; j++) {
              fields[
                i
              ].innerHTML += `<li class="main__crypto_field-drop-el" onclick="coinInput(this)" data-id="${j}">
                  <img src="${mas[j]["icon"]}"/>
                  <p>${mas[j]["name"]}</p>
                  </li>`;
            }
          }

          let idFrom = +document.location.href.split('?')[1].split(';')[0].split('=')[0];
          let idTo = +document.location.href.split('?')[1].split(';')[1].split('=')[0];
          let amountFrom = +document.location.href.split('?')[1].split(';')[0].split('=')[1];
          let amountTo = +document.location.href.split('?')[1].split(';')[1].split('=')[1];
  
          let icon = document.querySelector('.main__crypto_field-send').querySelector('.main__crypto_field-icon');
          icon.setAttribute('data-id', `${mas[idFrom]["code"]}`);
          icon.style.background = `url('${mas[idFrom]["icon"]}')`;
          document.querySelector('.main__crypto_field-send').querySelector('input').value = `${amountFrom} ${mas[idFrom]["code"]}`;
  
          let iconTwo = document.querySelector('.main__crypto_field-get').querySelector('.main__crypto_field-icon');
          iconTwo.setAttribute('data-id', `${mas[idTo]["code"]}`);
          iconTwo.style.background = `url('${mas[idTo]["icon"]}')`;
  
          let idFirst = document.querySelector('.main__crypto_field-send');
        idFirst.setAttribute('data-id', idFrom)

        let idSecond = document.querySelector('.main__crypto_field-get');
        idSecond.setAttribute('data-id', idTo)
          
          fieldEvent()
          inputCheck();
        },
      });
    });
  }

  enterCoins();
  
  function inputCheck() {
    let inputs = document
      .querySelector(".wallet")
      .querySelectorAll(".main__crypto_input");
  
    inputs.forEach((el) => {
      el.addEventListener("input", () => {
        let btn = document.querySelector(".main__crypto-btn");
        btn.style = "background: #FD7B01; color: #FFF;";
        btn.innerHTML = "Exchange now";
        btn.removeAttribute("onclick");
        let coinEnter;
        let coin = el.parentNode
          .querySelector(".main__crypto_field-icon")
          .getAttribute("data-id")
          .split("");
        for (let i = 0; i < el.value.length; i++) {
          for (let j = 0; j < coin.length; j++) {
            if (el.value[i] == coin[j]) {
              coinEnter = i;
              return;
            }
          }
        }
        for (let i = coinEnter; i < el.value.length; i++) {
          el.value[i] = "";
        }
        el.value += el.parentNode
          .querySelector(".main__crypto_field-icon")
          .getAttribute("data-id");
      });
    });
  }
  
  function getPrice(coinsFrom, coinsTo, amount) {
    let settings = {
      async: true,
      crossDomain: true,
      url: "https://api.godex.io/api/v1/info",
      method: "POST",
      data: {
        from: coinsFrom,
        to: coinsTo,
        amount: amount,
      },
      headers: {
        accept: "application/json",
      },
    };
    let masRes = [];
    let c = 0;
  
    $.ajax(settings).done(function (response) {
      $.ajax({
        complete: function () {
          masRes.push(response);
          c++;
        },
      });
    });
  
    settings = {
      async: true,
      crossDomain: true,
      url: "https://api.godex.io/api/v1/info",
      method: "POST",
      data: {
        from: coinsFrom,
        to: coinsTo,
        amount: 1,
      },
      headers: {
        accept: "application/json",
      },
    };
  
    $.ajax(settings).done(function (response) {
      $.ajax({
        complete: function () {
          masRes.push(response);
          c++;
        },
      });
    });
  }
  
   document.querySelector('.main__crypto_field-send').querySelector('input').addEventListener('input', fieldEvent, false) 
   
  function fieldEvent () {
    let fields = document
      .querySelector(".wallet")
      .querySelectorAll(".main__crypto_field");
    let coinFrom;
    let amount;
    let coinTo;
    fields.forEach((el) => {
      if (el.classList.contains("main__crypto_field-send")) {
        coinFrom = el
          .querySelector(".main__crypto_field-icon")
          .getAttribute("data-id");
        amount = el
          .querySelector(".main__crypto_input")
          .value.replace(" ", "")
          .replace(coinFrom, "");
      } else {
        coinTo = el
          .querySelector(".main__crypto_field-icon")
          .getAttribute("data-id");
      }
    });
  
    let settings = {
      async: true,
      crossDomain: true,
      url: "https://api.godex.io/api/v1/info",
      method: "POST",
      data: {
        from: coinFrom,
        to: coinTo,
        amount: amount,
      },
      headers: {
        accept: "application/json",
      },
    };

    document.querySelector('.input-test').setAttribute('placeholder', `Enter the ${coinTo} payout address`)
  
    /*---изменение нижнего поля при вводе данных---*/
    $.ajax(settings).done(function (response) {
      $.ajax({
        complete: function () {
          let val = document
            .querySelector(".wallet")
            .querySelector(".main__crypto_field-get")
            .querySelector(".main__crypto_input");
          val.value = `${response["amount"]} ${val.parentNode
            .querySelector(".main__crypto_field-icon")
            .getAttribute("data-id")}`;
        },
      });
    });
    /*---------------------------------------------*/
  
    settings = {
      async: true,
      crossDomain: true,
      url: "https://api.godex.io/api/v1/info",
      method: "POST",
      data: {
        from: coinFrom,
        to: coinTo,
        amount: 1,
      },
      headers: {
        accept: "application/json",
      },
    };
  
    $.ajax(settings).done(function (response) {
      $.ajax({
        complete: function () {
          let p = document.querySelector(".wallet__box_rate-value");
          p.innerHTML = `1 ${coinFrom} = ${response["amount"]} ${coinTo}`;
        },
      });
    });
  
    let inp = document.querySelector('.main__crypto_field-send').querySelector('input');
    let inpCoin = document.querySelector('.main__crypto_field-send').querySelector('.main__crypto_field-icon').getAttribute('data-id');
  
    if (inp.value.replace(inpCoin, '') == " " || inp.value.replace(inpCoin, '') == "") {
      document.querySelector('.main__crypto_field-get').querySelector('input').value = `${document.querySelector('.main__crypto_field-get').querySelector('.main__crypto_field-icon').getAttribute('data-id')}`;
    }
  };
  
  let rotate = document.querySelector(".wallet__box-change");
  rotate.onclick = () => {
    let send = document.querySelector(".main__crypto_field-send");
    let get = document.querySelector(".main__crypto_field-get");
  
    let idSend = send.getAttribute("data-id");
    let idGet = get.getAttribute("data-id");
  
    let sendVal = send.querySelector(".main__crypto_input").value;
    let getVal = get.querySelector(".main__crypto_input").value;
  
    let sendCoin = send.querySelector('.main__crypto_field-icon').getAttribute('data-id')
    let getCoin = get.querySelector('.main__crypto_field-icon').getAttribute('data-id')
  
    send.querySelector('.main__crypto_field-icon').setAttribute('data-id', `${getCoin}`)
    get.querySelector('.main__crypto_field-icon').setAttribute('data-id', `${sendCoin}`)
  
    send.querySelector(
      ".main__crypto_field-icon"
    ).style.background = `url('${mas[idGet]["icon"]}')`;
  
    get.querySelector(
      ".main__crypto_field-icon"
    ).style.background = `url('${mas[idSend]["icon"]}')`;
  
    send.querySelector(".main__crypto_input").value = getVal;
    get.querySelector(".main__crypto_input").value = sendVal;
  
    send.setAttribute("data-id", idGet);
    get.setAttribute("data-id", idSend);
  
    fieldEvent()
  };

  document.querySelector('.input-test').addEventListener('input', () => {
    let val = document.querySelector('.input-test').value;
    let btn = document.querySelector('.wallet__box-btn');

    if (val.length > 26 && val.length < 70) {
        btn.removeAttribute('disabled');
        btn.style.cursor = "pointer"
        btn.style.background = "#FD7B01"
    } else {
        btn.setAttribute('disabled', true);
        btn.style.cursor = "default"
        btn.style.background = "rgba(153,154,163,.25)"
    }
  })

  let pageIndex = 0;

  let wallet = "";
  let sendId;
  let getId;
  let sendCount = 0;
  let getCount = 0;

  function saveData(el) {
      /*--------получение данных-----------*/
      let container = el.parentNode;
      wallet = container.querySelector('.input-test').value;
      let send = document.querySelector('.main__crypto_field-send');
      let get = document.querySelector('.main__crypto_field-get')
      sendId = +send.getAttribute('data-id');
      getId = +get.getAttribute('data-id')
      sendCount = send.querySelector('.main__crypto_input').value.replace(`${mas[sendId]["code"]}`, '')
      getCount = get.querySelector('.main__crypto_input').value.replace(`${mas[getId]["code"]}`, '')

      /*------------------------------------*/

      /*---------- окно agree --------------*/
      let agree = document.querySelector('.agree__box');

      let sendField = agree.querySelectorAll('.exchange__currency')[0];
      sendField.querySelector('p').innerHTML = `${sendCount} ${mas[sendId]["code"]}`
      sendField.querySelector('img').setAttribute('src', `${mas[sendId]["icon"]}`)

      let getField = agree.querySelectorAll('.exchange__currency')[1];
      getField.querySelector('p').innerHTML = `≈ ${getCount} ${mas[getId]["code"]}`
      getField.querySelector('img').setAttribute('src', `${mas[getId]["icon"]}`)

      agree.querySelector('.agree__box-key').innerHTML = `${wallet}`

      let settings = {
        async: true,
        crossDomain: true,
        url: "https://api.godex.io/api/v1/info",
        method: "POST",
        data: {
          from: mas[sendId]["code"],
          to: mas[getId]["code"],
          amount: 1,
        },
        headers: {
          accept: "application/json",
        },
      };

      $.ajax(settings).done(function (response) {
        $.ajax({
          complete: function () {
            agree.querySelector('.agree__box-swap').innerHTML = `1 ${mas[sendId]["code"]} = ${response['amount']} ${mas[getId]["code"]}`
        },
        });
      });
      /*----------------------------------------*/

      /* --------------- последнее окно-------------*/

      let awaiting = document.querySelector('.awaiting__box');

      let sendFil = awaiting.querySelectorAll('.exchange__currency')[0];
      sendFil.querySelector('p').innerHTML = `${sendCount} ${mas[sendId]["code"]}`
      sendFil.querySelector('img').setAttribute('src', `${mas[sendId]["icon"]}`)

      let getFil = awaiting.querySelectorAll('.exchange__currency')[1];
      getFil.querySelector('p').innerHTML = `≈ ${getCount} ${mas[getId]["code"]}`
      getFil.querySelector('img').setAttribute('src', `${mas[getId]["icon"]}`)

      awaiting.querySelector('.awaiting__box_my-key').innerHTML = `${wallet}`

      /*--------------------------------------------*/
  }

  function prevPage() {
    pageIndex--;
    pageState();
  }

  function nextPage() {
      pageIndex++;
      pageState();
  }

  function pageState() {
    let sections = document.querySelector('main').querySelectorAll('section');
    let progress = document.querySelector('.progress')

    if (sections[pageIndex - 1]) {
        let prev = sections[pageIndex - 1];
        prev.style.display = "none";
        let prevStage = progress.querySelectorAll('.stage')[pageIndex - 1];
        prevStage.querySelector('svg').innerHTML = `
        <ellipse cx="30" cy="30.0323" rx="30" ry="30.0323" fill="#2F3038"/>
        <path d="M24.8553 35.3152L17.9606 28.4474L15 31.3964L24.8553 41.2133L45.1793 20.9685L42.2187 18.0195L24.8553 35.3152Z" fill="white"/>
        `
        prevStage.querySelector('.progress-text').style.color = "#999AA3"
    }

    if (sections[pageIndex + 1]) {
        let next = sections[pageIndex + 1];
        next.style.display = "none";
        let nextStage = progress.querySelectorAll('.stage')[pageIndex + 1];
        nextStage.querySelector('svg').innerHTML = `<path d="M59.2637 30.0323C59.2637 45.7918 46.5023 58.5647 30.7637 58.5647C15.0251 58.5647 2.26367 45.7918 2.26367 30.0323C2.26367 14.2728 15.0251 1.5 30.7637 1.5C46.5023 1.5 59.2637 14.2728 59.2637 30.0323Z" fill="#1D1B22" stroke="#2F3038" stroke-width="3"/>`
        nextStage.querySelector('.progress-text').style.color = "#999AA3"
    }

    let now = sections[pageIndex];
        now.style.display = "block";
        let nowStage = progress.querySelectorAll('.stage')[pageIndex];
        nowStage.querySelector('svg').innerHTML = `<svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="30.5361" cy="30.0323" rx="30" ry="30.0323" fill="#FD7B01"/>
        <path d="M25.3914 35.3152L18.4967 28.4474L15.5361 31.3964L25.3914 41.2133L45.7154 20.9685L42.7549 18.0195L25.3914 35.3152Z" fill="white"/>
        </svg>
        `
        nowStage.querySelector('.progress-text').style.color = "#FFFFFF"
  }

  let checkbox = document.querySelector('.agree__box-check');

  checkbox.addEventListener('change', () => {
      let btn = document.querySelector('.agree__box_btn-confirm');
      if (checkbox.checked) {
        btn.removeAttribute('disabled');
        btn.style.background = "#FD7B01"
        btn.style.cursor = "pointer"
      } else {
        btn.setAttribute('disabled', true);
        btn.style.background = "rgba(153, 154, 163, 0.25)"
        btn.style.cursor = "default"
      }
  })

  pageState()

function copedAddress(elem, st) {
  if (st) {
    const str = elem.parentNode.querySelector('span').innerText;
  } else {
    const str = elem.parentNode.innerText;
  }
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert('wallet ID has been copied')
}

function startTrade() {
  let sendCoin = mas[sendId]["code"];
  let getCoin = mas[getId]["code"];

  let settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.godex.io/api/v1/info-revert",
    "method": "POST",
    "data": {
        "from": getCoin,
        "to": sendCoin,
        "amount": sendCount
},
    "headers": {
        "accept": "application/json"
    }
}

let amountNeed;
let id = "";

$.ajax(settings).done(function (response) {
    $.ajax({
      complete: function () {
        amountNeed = +response['amount']

        let set = {
          "async": true,
          "crossDomain": true,
          "url": "https://api.godex.io/api/v1/transaction",
          "method": "POST",
          "data": {
              "coin_from": sendCoin,
              "coin_to": getCoin,
              "deposit_amount": sendCount,
              "withdrawal": wallet,
              "withdrawal_extra_id": "qbGDbH9gwrAkJTM6gxsfQpWYMfe8zRuZsSpoU77sx73peCPbzdZaUWW9tKWbBDs3hmeV",
              "return": "LsZK2wfxvXrfsfB6L39qmCcV5DK29ismmAwN41",
              "return_extra_id": "qbGDbH9gwrAkfJTM6gxsfQpWYMfe8zRuZsSpoU77sx73peCPbzdZaUWW9tKWbBDs3hmeV",
              "affiliate_id": "ONIcCtFlJQnszB01"
        },
          "headers": {
              "accept": "application/json",
              // "public-key": "lPM1O83kxGXJn9u+JwlKXNMmz3F8k37sIzKC3gar5piGP8koije8/NPM1OEM6BC7IzuGJZms06TmUBMwUA==60d17228fb5176f9b78a5f7425f0e54c",
              
          }
        }
        
        $.ajax(set).done(function (resp) {
          document.querySelector('.awaiting__box_new-key').querySelector('p').innerHTML = resp["deposit"];
          document.querySelector('.trade-info').querySelector('.trade-info__id').querySelector('span').innerHTML = resp['transaction_id'];
          id = resp['transaction_id'];
        });

        $.ajax({
          complete: function () {setInterval(() => {
            let awaiting = document.querySelector('.way-circle1');
            let confirming = document.querySelector('.way-circle2');
            let exchanging = document.querySelector('.way-circle3');
            let sending = document.querySelector('.way-circle4');
  
            let act = "checked-status";
  
            let sett = {
              "async": true,
              "crossDomain": true,
              "url": `https://api.godex.io/api/v1/transaction/${id}`,
              "method": "GET",
              "headers": {
                  "accept": "application/json"
              }
          }
         
          $.ajax(sett).done(function (respon) {
              if (respon["status"] === "confirmed" ) {
                awaiting.classList.add(act)
              }

              if (respon["status"] === "exchanging" ) {
                confirming.classList.add(act)
              }

              if (respon["status"] === "sending" ) {
                exchanging.classList.add(act)
              }

              if (respon["status"] === "success" ) {
                sending.classList.add(act)
                return
              }
          });
          }, 1500)}
      })
      },
    });
});
}