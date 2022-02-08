@@include('_progressBar.js');

function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});

$(document).ready(function () {
  $(".comment__slider").slick({
    arrows: true,
    dots: false,
    slidesToShow: 2,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 849,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
});

let mas = [];

function enterCoins() {
  let fields = document
    .querySelector(".main__crypto")
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

        let icon = document.querySelector('.main__crypto_field-send').querySelector('.main__crypto_field-icon');
        icon.setAttribute('data-id', `${mas[0]["code"]}`);
        icon.style.background = "url('http://api.godex.io/storage/coins/nlQJWbSb5SZ0CsXk0RTDFH2Tsg4bcRKuZLZwVyKr.png')";
        document.querySelector('.main__crypto_field-send').querySelector('input').value = "1";

        let iconTwo = document.querySelector('.main__crypto_field-get').querySelector('.main__crypto_field-icon');
        iconTwo.setAttribute('data-id', `${mas[1]["code"]}`);
        iconTwo.style.background = "url('http://api.godex.io/storage/coins/385DIuUmaRLHQCEY9G2edrQK8CoQ4VaL5jmnvWsI.png')";

        let nameOne = document.querySelector('.main__crypto_field-send').querySelector('.main__crypto_field-name');
        nameOne.innerHTML = "BTC"

        let idFirst = document.querySelector('.main__crypto_field-send');
        idFirst.setAttribute('data-id', '0')

        let idSecond = document.querySelector('.main__crypto_field-get');
        idSecond.setAttribute('data-id', '1')
        
        fieldEvent()
        inputCheck();
        tradeTable();
      },
    });
  });
}

enterCoins();

function coinInput(el) {
  let icon = el.parentNode.parentNode.querySelector(".main__crypto_field-icon");
  let input = el.parentNode.parentNode.querySelector(".main__crypto_input");
  let id = +el.getAttribute("data-id");
  let code = mas[id]["code"];
  let name = el.parentNode.parentNode.querySelector(".main__crypto_field-name");

  let classFirst = el.parentNode.parentNode.classList[1]

  let fields = document.querySelector('.main__crypto').querySelectorAll('.main__crypto_field');

  let idSec;

  fields.forEach(el => {
    if (!el.classList.contains(classFirst)) {
      idSec = el.getAttribute('data-id');
    }
  })

  if (id != idSec) {
    el.parentNode.parentNode.setAttribute("data-id", id);
  
    input.value = input.value.split(" ")[0];
  
    icon.style.background = `url("${mas[id]["icon"]}")`;
    icon.setAttribute("data-id", `${code}`);
  
    name.innerHTML = code;
  
    fieldEvent()
  }

}

function inputCheck() {
  let inputs = document
    .querySelector(".main__crypto")
    .querySelectorAll(".main__crypto_input");

  inputs.forEach((el) => {
    el.addEventListener("input", () => {
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

function dropCoins(btn) {
  let field = btn.parentNode;
  let menus = field.parentNode.querySelectorAll(".main__crypto_field-drop");
  let fieldMenu = field.querySelector(".main__crypto_field-drop");

  menus.forEach((el) => {
    if (el !== fieldMenu && window.getComputedStyle(el)["display"] == "block") {
      el.style.animation = "up .25s ease forwards";

      setTimeout(() => {
        el.style.display = "none";
      }, 245);
    }
  });

  if (window.getComputedStyle(fieldMenu)["display"] == "none") {
    fieldMenu.style.display = "block";
    fieldMenu.style.animation = "drop .25s ease forwards";
    btn.querySelector("svg").style.transform = "rotate(180deg)";
  } else {
    fieldMenu.style.animation = "up .25s ease forwards";
    btn.querySelector("svg").style.transform = "rotate(0deg)";
    setTimeout(() => {
      fieldMenu.style.display = "none";
    }, 245);
  }
}

window.onclick = (e) => {
  let fields = document
    .querySelector(".main__crypto")
    .querySelectorAll(".main__crypto_field-drop");
  let btns = document
    .querySelector(".main__crypto")
    .querySelectorAll(".main__crypto_drop-btn");

  for (let i = 0; i < fields.length; i++) {
    if (
      e.target != fields[i] &&
      e.target != btns[i].querySelector("svg").querySelector("path") &&
      e.target != btns[i].querySelector("svg") &&
      window.getComputedStyle(fields[i])["display"] == "block" &&
      e.target != btns[i]
    ) {
      fields[i].style.animation = "up .25s ease forwards";
      btns[i].querySelector("svg").style.transform = "rotate(0deg)";

      setTimeout(() => {
        fields[i].style.display = "none";
      }, 245);
    }
  }
};

 document.querySelector('.main__crypto_field-send').querySelector('input').addEventListener('input', fieldEvent, false) 
 
function fieldEvent () {
  let fields = document
    .querySelector(".main__crypto")
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

  /*---изменение нижнего поля при вводе данных---*/
  $.ajax(settings).done(function (response) {
    $.ajax({
      complete: function () {
        let idFirst = +document.querySelector('.main__crypto_field-send').getAttribute('data-id');
        let idSecond = +document.querySelector('.main__crypto_field-get').getAttribute('data-id');
        let val = document
          .querySelector(".main__crypto")
          .querySelector(".main__crypto_field-get")
          .querySelector(".main__crypto_input");
        val.value = `${response["amount"]}`;

        let p = document.querySelector(".main__crypto-info_results");
        let amount2 = +response["amount"];
        let minamout = +response["min_amount"];
        // ---------- echange rate ------ 
        if (amount2.toFixed() > 0) {
          let setp = +response["amount"] / amount;
          p.innerHTML = `1 ${coinFrom} = ${setp.toFixed(7)} ${coinTo}`;
        } else {
          settings = {
            async: true,
            crossDomain: true,
            url: "https://api.godex.io/api/v1/info",
            method: "POST",
            data: {
              from: coinFrom,
              to: coinTo,
              amount: minamout,
            },
            headers: {
              accept: "application/json",
            },
          };
          // 
          $.ajax(settings).done(function (response) {
            $.ajax({
              complete: function () {
                let p = document.querySelector(".main__crypto-info_results");
                let p2 = document.querySelector(".main__crypto-subtitle-info");
                p2.innerHTML = `Minimum value: ${response["min_amount"]} ${coinFrom}`; 
                p2.style.display = "block"; 
                if (amount2 <= minamout) {
                  let setp = +response["amount"] / response["min_amount"];
                  // setp = sept.toFixed(7)l
                  p.innerHTML = `1 ${coinFrom} = ${setp.toFixed(7)} ${coinTo}`;
                  // p.innerHTML = `${response["amount"]}`;
                }
               
              },
            });
          });

        }
        // --------- end echange rate ---------

          val.parentNode
          .querySelector(".main__crypto_field-name").innerHTML = coinTo
          let btn = document.querySelector(".main__crypto-btn");
        btn.setAttribute("onclick", `document.location.href='./exchange.html?${idFirst}=${amount};${idSecond}=${response["amount"]}'`);

        
        
      },
    });
  });
  /*---------------------------------------------*/

  // settings = {
  //   async: true,
  //   crossDomain: true,
  //   url: "https://api.godex.io/api/v1/info",
  //   method: "POST",
  //   data: {
  //     from: coinFrom,
  //     to: coinTo,
  //     amount: 1,
  //   },
  //   headers: {
  //     accept: "application/json",
  //   },
  // };

  // $.ajax(settings).done(function (response) {
  //   $.ajax({
  //     complete: function () {
  //       let p = document.querySelector(".main__crypto-info_results");
  //       let amount = +response["amount"];
  //       // p.innerHTML = `1 ${coinFrom} = ${response["amount"]} ${coinTo}`;
  //       if (amount.toFixed() > 0) {
  //         // p.innerHTML = `1 ${coinFrom} = ${response["amount"]} ${coinTo}`;
  //       } else {
  //         let minamout = +response["min_amount"];


  //         settings = {
  //           async: true,
  //           crossDomain: true,
  //           url: "https://api.godex.io/api/v1/info",
  //           method: "POST",
  //           data: {
  //             from: coinFrom,
  //             to: coinTo,
  //             amount: minamout,
  //           },
  //           headers: {
  //             accept: "application/json",
  //           },
  //         };

  //         $.ajax(settings).done(function (response) {
  //           $.ajax({
  //             complete: function () {
  //               let p = document.querySelector(".main__crypto-info_results");
  //               let p2 = document.querySelector(".main__crypto-subtitle-info");
  //               let amount = +response["amount"];
  //               let setp = +response["amount"] / response["min_amount"];
  //               // setp = sept.toFixed(7)l
  //               p.innerHTML = `1 ${coinFrom} = ${setp.toFixed(7)} ${coinTo}`;
  //               // p.innerHTML = `${response["amount"]}`;
  //               p2.innerHTML = `Minimum value: ${response["min_amount"]} ${coinFrom}`; 
  //               p2.style.display = "block"; 
  //             },
  //           });
  //         });

  //       }
  //     },
  //   });
  // });
};

let rotate = document.querySelector(".main__crypto-change");
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

  get.querySelector('p.main__crypto_field-name').innerHTML = mas[idSend]['code']
  send.querySelector('p.main__crypto_field-name').innerHTML = mas[idGet]['code']

  send.setAttribute("data-id", idGet);
  get.setAttribute("data-id", idSend);

  fieldEvent()
};

function tradeTable() {
  let months = {
    0: "january",
    1: "february",
    2: "march",
    3: "april",
    4: "may",
    5: "june",
    6: "july",
    7: "august",
    8: "September",
    9: "october",
    10: "november",
    11: "december",
  };

  let container = document.querySelector(".stat__boxbig");

  let date = new Date();

  let day = date.getDate();
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  let hours = date.getHours();
  let minuts = date.getMinutes();

  if ((day + "").length == 1) {
    day = "0" + day;
  }

  let settings = {};

  for (let i = 0; i < 4; i++) {
    let needHour = getRandomNum(0, hours).toFixed(0);
    let needMinut = getRandomNum(0, minuts).toFixed(0);
    if (needHour.length == 1) {
      needHour = "0" + needHour;
    }
    if (needMinut.length == 1) {
      needMinut = "0" + needMinut;
    }

    let coinIdFirst = getRandomNum(0, mas.length).toFixed(0);
    let coinIdSecond = getRandomNum(0, mas.length).toFixed(0);
    let count = getRandomNum(1, 25).toFixed(5);

    settings = {
      async: true,
      crossDomain: true,
      url: "https://api.godex.io/api/v1/info-revert",
      method: "POST",
      data: {
        from: mas[coinIdFirst]["code"],
        to: mas[coinIdSecond]["code"],
        amount: +count,
      },
      headers: {
        accept: "application/json",
      },
    };

    $.ajax(settings).done(function (response) {
      $.ajax({
        complete: function () {
          let card = "";
          if (response["amount"] == 0) {
            let co = (+response["min_amount"]).toFixed(5);
            if((response["min_amount"]).toString(10).replace('.', '').length > 7) {co = (+response["min_amount"]).toFixed(3)}
            card = `
    <div class="stat__boxbig_field">
    <div class="stat__boxbig_data">
        <p class="stat__boxbig-month">${day} ${month} ${year}</p>
        <p class="stat__boxbig-time">${needHour}:${needMinut}</p>
    </div>
    <div class="stat__boxbig_exchange">
        <div class="stat__boxbig_wellbefore stat__boxbig_well">
            <img src="${
              mas[coinIdSecond]["icon"]
            }" alt="icon" class="stat__boxbig-image">
            <p class="stat__boxbig-name">${
              mas[coinIdSecond]["name"].split(" ")[0]
            } <span>${mas[coinIdSecond]["code"]}</span></p>
            <p class="stat__boxbig-price1 stat__boxbig-pricetop">${count}</p>
        </div>
        <div class="stat__boxbig_arrow">
            <img src="./img/arrow.svg" alt="image" class="stat__boxbig_arrowimage">
        </div>
        <div class="stat__boxbig_wellafter stat__boxbig_well">
            <img src="${
              mas[coinIdFirst]["icon"]
            }" alt="icon" class="stat__boxbig-image">
            <p class="stat__boxbig-name">${
              mas[coinIdFirst]["name"].split(" ")[0]
            } <span>${mas[coinIdFirst]["code"]}</span></p>
            <p class="stat__boxbig-price">${co}</p>
        </div>
    </div>
</div>
    `;
          } else {
            let co = (+response["amount"]).toFixed(5);
            if((response["amount"]).toString(10).replace('.', '').length > 7) {co = (+response["amount"]).toFixed(3)}
            card = `
    <div class="stat__boxbig_field">
    <div class="stat__boxbig_data">
        <p class="stat__boxbig-month">${day} ${month} ${year}</p>
        <p class="stat__boxbig-time">${needHour}:${needMinut}</p>
    </div>
    <div class="stat__boxbig_exchange">
        <div class="stat__boxbig_wellbefore stat__boxbig_well">
            <img src="${
              mas[coinIdSecond]["icon"]
            }" alt="icon" class="stat__boxbig-image">
            <p class="stat__boxbig-name">${
              mas[coinIdSecond]["name"].split(" ")[0]
            } <span>${mas[coinIdSecond]["code"]}</span></p>
            <p class="stat__boxbig-price1 stat__boxbig-pricetop">${count}</p>
        </div>
        <div class="stat__boxbig_arrow">
            <img src="./img/arrow.svg" alt="image" class="stat__boxbig_arrowimage">
        </div>
        <div class="stat__boxbig_wellafter stat__boxbig_well">
            <img src="${
              mas[coinIdFirst]["icon"]
            }" alt="icon" class="stat__boxbig-image">
            <p class="stat__boxbig-name">${
              mas[coinIdFirst]["name"].split(" ")[0]
            } <span>${mas[coinIdFirst]["code"]}</span></p>
            <p class="stat__boxbig-price">${co}</p>
        </div>
    </div>
</div>
    `;
          }
          container.innerHTML += card;
        },
      });
    });
  }
}

function getRandomNum(min, max) {
  return Math.random() * (max - min) + min;
}

function prettify(num) {
  let n = num.toString();
  return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + " ");
}

function speed(a,b,c) {
  let block = document.querySelector(".stat__boxmedium_static");

  block
    .querySelector(".stat__boxmedium_time-min")
    .querySelector("span").innerHTML = b;
  block
    .querySelector(".stat__boxmedium_time-max")
    .querySelector("span").innerHTML = a;

    let div = document.querySelector('.stat__boxmedium_info-progress-bar');

    let bar = new ProgressBar.Circle(div, {
      strokeWidth: 8,
      easing: 'easeInOut',
      duration: 1400,
      color: '#FD7B01',
      trailColor: 'rgba(253, 123, 1, 0.08)',
      trailWidth: 8,
      svgStyle: null
    });

    document.querySelector('.stat__boxmedium_info-progress-text').querySelectorAll('span')[0].innerHTML = `${((+a + +b)/2).toFixed(1)} min`
    bar.animate((1 - (((+a + +b)/2)/1.25)/100) - 0.35);

    document.querySelector(".stat__boxsmall_info-number").innerHTML = prettify(
      c
    );
}

function parAm() {
  let ata;
  fetch("http://80.78.241.227:3016", {
    // var hst = "http://localhost:3016";
    // fetch(hst, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      return resp.json();
    })
    .then((resBody) => {
      ata = resBody;
    }).then(() => {
      let minMinut = ata[0];
      let maxMinut = ata[1];
      let randCount = ata[2];

      speed(minMinut, maxMinut, randCount)
    })
}

parAm()