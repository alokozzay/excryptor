let x = document.location.href.split("/");
let place = x[x.length - 1].split(".")[0];

let host = "http://80.78.241.227"; // ссылка на сервер

/*======порты сервера======*/

const main = 3002;
const all = 3004;
const coinData = 3006;
const btc = 3008;
const eth = 3010;
const ltc = 3012;

/*=========================*/

let mainData = [];
let addData = [];
let addltc = [];
let addbtc = [];
let addeth = [];

let link = "";
let addLink = "";

switch (place) {
  case "":
    link = host + ":" + main;
    indexFunc(link);
    break;

  case "index":
    link = host + ":" + main;
    indexFunc(link);
    break;

  case "allcourses":
    link = host + ":" + all;
    allFunc(link);
    break;

  case "bitcoin":
    link = host + ":" + btc;
    addLink = host + ":" + coinData;
    btcFunc(link, addLink);
    break;

  case "ethereum":
    link = host + ":" + eth;
    addLink = host + ":" + coinData;
    ethFunc(link, addLink);
    break;

  case "litecoin":
    link = host + ":" + ltc;
    addLink = host + ":" + coinData;
    ltcFunc(link, addLink);
    break;
}

/*===============ФУНКЦИИ ДЛЯ ЗАПУСКА ОТРИСОВКИ===============*/

function indexFunc(ad) {
  fetch(ad, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      return resp.json();
    })
    .then((resBody) => {
      mainData = resBody;
    })
    .then(() => {
      let x = 1;
      for (let i = 0; i < 10; i++) {
        let table = document
          .querySelector(".market__box")
          .querySelector(".market__box_info");
        img = mainData[i]["icon"];

        let name = mainData[i]["slug"].replace(
          mainData[i]["slug"][0],
          mainData[i]["slug"][0].toUpperCase()
        );
        let price = mainData[i]["price"].toFixed(5);
        let percent = "";
        if (mainData[i]["percent_change_24h"] < 0) {
          percent = `
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_2_329)">
            <path d="M0.185592 3.25195L4.56056 7.62688C4.68414 7.7506 4.8306 7.81241 4.99998 7.81241C5.16936 7.81241 5.31579 7.7506 5.43951 7.62688L9.81448 3.25195C9.93819 3.12823 10 2.98177 10 2.81253C10 2.64329 9.93819 2.49672 9.81448 2.37311C9.69062 2.24939 9.54419 2.18755 9.37495 2.18755L0.625048 2.18755C0.455771 2.18755 0.309241 2.24939 0.185592 2.37311C0.0620122 2.49669 -3.47842e-05 2.64325 -3.47694e-05 2.81253C-3.47546e-05 2.98181 0.0620123 3.12823 0.185592 3.25195Z" fill="#FF4B32"/>
            </g>
            <defs>
            <clipPath id="clip0_2_329">
            <rect width="10" height="10" fill="white" transform="translate(10 10) rotate(180)"/>
            </clipPath>
            </defs>
            </svg>
            <p class="redText market__text-change-up market__text-global">${(
              mainData[i]["percent_change_24h"].toFixed(2) + ""
            ).replace("-", "")}%</p>          
            `;
        } else {
          percent = `
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_2_324)">
  <path d="M9.81441 6.74805L5.43944 2.37312C5.31586 2.2494 5.1694 2.18759 5.00002 2.18759C4.83064 2.18759 4.68421 2.2494 4.56049 2.37312L0.185524 6.74805C0.0618071 6.87177 0 7.01823 0 7.18747C0 7.35671 0.0618071 7.50328 0.185524 7.62689C0.309378 7.75061 0.455806 7.81245 0.625049 7.81245H9.37495C9.54423 7.81245 9.69076 7.75061 9.81441 7.62689C9.93799 7.50331 10 7.35675 10 7.18747C10 7.0182 9.93799 6.87177 9.81441 6.74805Z" fill="#16C784"/>
  </g>
  <defs>
  <clipPath id="clip0_2_324">
  <rect width="10" height="10" fill="white"/>
  </clipPath>
  </defs>
  </svg>
  
            <p class="greenText market__text-change-up market__text-global">${mainData[
              i
            ]["percent_change_24h"].toFixed(2)}%</p>          
            `;
        }
        let volume = numChange(mainData[i]["volume_24h"].toFixed());
        let card = `
        <div class="market__box_height">
                      <div class="market__boxFlex">
                          <div class="market__number">
                              <p class="market__text-number market__text-global">${x}</p>
                          </div>
                          <div class="market__buy">
                          <img src="${img}" alt="icon" class="market__text-buyimage">
                              <p class="market__text-buy market__text-buy-usdt market__text-global">${name} <span>${mainData[i]["code"]}</span></p>
                          </div>
                          <div class="market__price">
                              <p class="market__text-price market__text-global">${price} <span>USD</span></p>
                          </div>
                          <div class="market__change">
                              ${percent}
                          </div>
                          <div class="market__volume">
                              <p class="market__text-volume market__text-global">${volume} <span>USD</span></p>
                          </div>
                          <div class="market__action">
                              <a href="#" class="market__text_btn"><p class="market__text-action">Exchange</p></a>
                          </div>
                      </div>
                  </div>
        `;
        table.innerHTML += card;

        x++;
      }
    });
}

function allFunc(ad) {
  fetch(ad, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      return resp.json();
    })
    .then((resBody) => {
      mainData = resBody;
    })
    .then(() => {
      let x = 1;
      
      for (let item of mainData) {
        let table = document
          .querySelector(".main__box")
          .querySelector(".main__box_info");
        img = item["icon"];
        let name = item["slug"].replace(
          item["slug"][0],
          item["slug"][0].toUpperCase()
        );
        let price = item["price"].toFixed(5);
        let percent = "";
        if (item["percent_change_24h"] < 0) {
          percent = `
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_2_329)">
        <path d="M0.185592 3.25195L4.56056 7.62688C4.68414 7.7506 4.8306 7.81241 4.99998 7.81241C5.16936 7.81241 5.31579 7.7506 5.43951 7.62688L9.81448 3.25195C9.93819 3.12823 10 2.98177 10 2.81253C10 2.64329 9.93819 2.49672 9.81448 2.37311C9.69062 2.24939 9.54419 2.18755 9.37495 2.18755L0.625048 2.18755C0.455771 2.18755 0.309241 2.24939 0.185592 2.37311C0.0620122 2.49669 -3.47842e-05 2.64325 -3.47694e-05 2.81253C-3.47546e-05 2.98181 0.0620123 3.12823 0.185592 3.25195Z" fill="#FF4B32"/>
        </g>
        <defs>
        <clipPath id="clip0_2_329">
        <rect width="10" height="10" fill="white" transform="translate(10 10) rotate(180)"/>
        </clipPath>
        </defs>
        </svg>
        <p class="redText market__text-change-up market__text-global">${(
          item["percent_change_24h"].toFixed(2) + ""
        ).replace("-", "")}%</p>          
        `;
        } else {
          percent = `
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2_324)">
<path d="M9.81441 6.74805L5.43944 2.37312C5.31586 2.2494 5.1694 2.18759 5.00002 2.18759C4.83064 2.18759 4.68421 2.2494 4.56049 2.37312L0.185524 6.74805C0.0618071 6.87177 0 7.01823 0 7.18747C0 7.35671 0.0618071 7.50328 0.185524 7.62689C0.309378 7.75061 0.455806 7.81245 0.625049 7.81245H9.37495C9.54423 7.81245 9.69076 7.75061 9.81441 7.62689C9.93799 7.50331 10 7.35675 10 7.18747C10 7.0182 9.93799 6.87177 9.81441 6.74805Z" fill="#16C784"/>
</g>
<defs>
<clipPath id="clip0_2_324">
<rect width="10" height="10" fill="white"/>
</clipPath>
</defs>
</svg>

        <p class="greenText market__text-change-up market__text-global">${item[
          "percent_change_24h"
        ].toFixed(2)}%</p>          
        `;
        }
        let volume = numChange(item["volume_24h"].toFixed());
        let card = `
        <div class="main__box_height">
                      <div class="main__boxFlex">
                          <div class="main__number">
                              <p class="main__text-number main__text-global">${x}</p>
                          </div>
                          <div class="main__buy">
                          <img src="${img}" alt="icon" class="main__text-buyimage">
                              <p class="main__text-buy main__text-buy-usdt main__text-global">${name} <span>${item["code"]}</span></p>
                          </div>
                          <div class="main__price">
                              <p class="main__text-price main__text-global">${price} <span>USD</span></p>
                          </div>
                          <div class="main__change">
                              ${percent}
                          </div>
                          <div class="main__volume">
                              <p class="main__text-volume main__text-global">${volume} <span>USD</span></p>
                          </div>
                          <div class="main__action">
                              <a href="#" class="main__text_btn"><p class="main__text-action">Exchange</p></a>
                          </div>
                      </div>
                  </div>
        `;
        table.innerHTML += card;
        x++;
      }
    });
}

function btcFunc(ad, addad) {
  fetch(addad, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      return resp.json();
    })
    .then((resBody) => {
      addData = resBody.data;
    })
    .then(() => {    
      for (let item in addData) {
        console.log(addData[item]["symbol"]);
        if (addData[item]["symbol"] === "BTC") {
          document
            .querySelector(".main__blockinfo-value-price")
            .querySelector("span").innerHTML = numChange(
              addData[item]["quote"]["USD"]["price"].toFixed(2)
          );
          let num = "";
          if (addData[item]["quote"]["USD"]["percent_change_24h"] > 0) {
            num = `
              <div>
              <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.9348 4.77754L6.40916 0.858263C6.1743 0.654871 5.8257 0.65487 5.59084 0.858263L1.06525 4.77754C0.627807 5.15638 0.895724 5.875 1.4744 5.875H10.5256C11.1043 5.875 11.3722 5.15637 10.9348 4.77754Z" fill="white" stroke="white" stroke-width="0.75"/>
              </svg>

              <p>${(
                numChange(
                  addData[item]["quote"]["USD"]["volume_change_24h"].toFixed(2)
                ) + ""
              ).replace("-", "")} USD</p>
              <p class="last-percent">${numChange(
                addData[item]["quote"]["USD"]["percent_change_24h"].toFixed(2)
              )}%</p>
              </div>
            `;
          } else {
            num = `
              <div>
              <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.9348 2.22246L6.40916 6.14174C6.1743 6.34513 5.8257 6.34513 5.59084 6.14174L1.06525 2.22246C0.627807 1.84362 0.895724 1.125 1.4744 1.125H10.5256C11.1043 1.125 11.3722 1.84363 10.9348 2.22246Z" fill="white" stroke="white" stroke-width="0.75"/>
</svg>

              <p>${(
                numChange(
                  addData[item]["quote"]["USD"]["volume_change_24h"].toFixed(2)
                ) + ""
              ).replace("-", "")} USD</p>
              <p class="last-percent">${numChange(
                addData[item]["quote"]["USD"]["percent_change_24h"].toFixed(2)
              )}%</p>
              </div>
            `;
          }
          document.querySelector(".main__blockinfo-value-last").innerHTML = num;
          document
            .querySelector(".main__blockinfo-value-cap")
            .querySelector("span").innerHTML = numChange(
              addData[item]["quote"]["USD"]["market_cap"].toFixed(2)
          );
          document
            .querySelector(".main__blockinfo-value-supply")
            .querySelector("span").innerHTML = numChange(
              addData[item]["total_supply"].toFixed(0)
          );
        }
      }
    });


  fetch(ad, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      return resp.json();
    })
    .then((resBody) => {
      mainData = resBody;
    })
    .then(() => {
      let x = 1;
      for (let i = 0; i < mainData.length; i++) {
        if (mainData[i]["code"] != "BTC") {
          let table = document
            .querySelector(".table__box")
            .querySelector(".table__box_info");

          img = mainData[i]["icon"];

          let name = mainData[i]["slug"].replace(
            mainData[i]["slug"][0],
            mainData[i]["slug"][0].toUpperCase()
          );
          let price = mainData[i]["price"].toFixed(6);
          let percent = "";
          if (mainData[i]["percent_change_24h"] < 0) {
            percent = `
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_2_329)">
          <path d="M0.185592 3.25195L4.56056 7.62688C4.68414 7.7506 4.8306 7.81241 4.99998 7.81241C5.16936 7.81241 5.31579 7.7506 5.43951 7.62688L9.81448 3.25195C9.93819 3.12823 10 2.98177 10 2.81253C10 2.64329 9.93819 2.49672 9.81448 2.37311C9.69062 2.24939 9.54419 2.18755 9.37495 2.18755L0.625048 2.18755C0.455771 2.18755 0.309241 2.24939 0.185592 2.37311C0.0620122 2.49669 -3.47842e-05 2.64325 -3.47694e-05 2.81253C-3.47546e-05 2.98181 0.0620123 3.12823 0.185592 3.25195Z" fill="#FF4B32"/>
          </g>
          <defs>
          <clipPath id="clip0_2_329">
          <rect width="10" height="10" fill="white" transform="translate(10 10) rotate(180)"/>
          </clipPath>
          </defs>
          </svg>
          <p class="redText market__text-change-up market__text-global">${(
            mainData[i]["percent_change_24h"].toFixed(2) + ""
          ).replace("-", "")}%</p>          
          `;
          } else {
            percent = `
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2_324)">
<path d="M9.81441 6.74805L5.43944 2.37312C5.31586 2.2494 5.1694 2.18759 5.00002 2.18759C4.83064 2.18759 4.68421 2.2494 4.56049 2.37312L0.185524 6.74805C0.0618071 6.87177 0 7.01823 0 7.18747C0 7.35671 0.0618071 7.50328 0.185524 7.62689C0.309378 7.75061 0.455806 7.81245 0.625049 7.81245H9.37495C9.54423 7.81245 9.69076 7.75061 9.81441 7.62689C9.93799 7.50331 10 7.35675 10 7.18747C10 7.0182 9.93799 6.87177 9.81441 6.74805Z" fill="#16C784"/>
</g>
<defs>
<clipPath id="clip0_2_324">
<rect width="10" height="10" fill="white"/>
</clipPath>
</defs>
</svg>

          <p class="greenText market__text-change-up market__text-global">${mainData[
            i
          ]["percent_change_24h"].toFixed(2)}%</p>          
          `;
          }
          let card = `
      <div class="table__box_height">
      <div class="table__boxFlex">
          <div class="table__number">
              <p class="table__text-number table__text-global">${x}</p>
          </div>
          <div class="table__buy">
              <img src="${img}" alt="icon" class="table__text-buyimage">
              <p class="table__text-buy table__text-buy-btc table__text-global">${mainData[i]["name"]} <span class="table__buy-span">${mainData[i]["code"]}</span><span class="table__buy-span-price">${mainData[i]["code"]}/BTC</span></p>
          </div>
          <div class="table__price">
              <p class="table__text-price table__text-global">${mainData[i]["code"]}/BTC</p>
          </div>
          <div class="table__volume">
              <p class="table__text-volume-title">Last price</p>
              <p class="table__text-volume table__text-global">${price} <span>BTC</span></p>
          </div>
          <div class="table__change">
               <p class="table__change-title">Change (24H)</p>
              <p class="table__text-change table__text-change-up table__text-global">${percent}</p>
          </div>
          
          <div class="table__action">
              <a href="index.html" class="table__text_btn"><p class="table__text-action">Exchange</p></a>
          </div>
          <div class="table__mobile_btn">
                <a href="index.html" class="table__mobile-btn">Exchange now</a>
          </div>
      </div>
  </div>
        `;
          table.innerHTML += card;
          x++;
        }
      }
    });
}

function ethFunc(ad, addad) {
  fetch(addad, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      return resp.json();
    })
    .then((resBody) => {
      addData = resBody.data;
    })
    .then(() => {    
      for (let item in addData) {
        console.log(addData[item]["symbol"]);
        if (addData[item]["symbol"] === "ETH") {
          document
            .querySelector(".main__blockinfo-value-price")
            .querySelector("span").innerHTML = numChange(
              addData[item]["quote"]["USD"]["price"].toFixed(2)
          );
          let num = "";
          if (addData[item]["quote"]["USD"]["percent_change_24h"] > 0) {
            num = `
              <div>
              <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.9348 4.77754L6.40916 0.858263C6.1743 0.654871 5.8257 0.65487 5.59084 0.858263L1.06525 4.77754C0.627807 5.15638 0.895724 5.875 1.4744 5.875H10.5256C11.1043 5.875 11.3722 5.15637 10.9348 4.77754Z" fill="white" stroke="white" stroke-width="0.75"/>
              </svg>

              <p>${(
                numChange(
                  addData[item]["quote"]["USD"]["volume_change_24h"].toFixed(2)
                ) + ""
              ).replace("-", "")} USD</p>
              <p class="last-percent">${numChange(
                addData[item]["quote"]["USD"]["percent_change_24h"].toFixed(2)
              )}%</p>
              </div>
            `;
          } else {
            num = `
              <div>
              <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.9348 2.22246L6.40916 6.14174C6.1743 6.34513 5.8257 6.34513 5.59084 6.14174L1.06525 2.22246C0.627807 1.84362 0.895724 1.125 1.4744 1.125H10.5256C11.1043 1.125 11.3722 1.84363 10.9348 2.22246Z" fill="white" stroke="white" stroke-width="0.75"/>
</svg>

              <p>${(
                numChange(
                  addData[item]["quote"]["USD"]["volume_change_24h"].toFixed(2)
                ) + ""
              ).replace("-", "")} USD</p>
              <p class="last-percent">${numChange(
                addData[item]["quote"]["USD"]["percent_change_24h"].toFixed(2)
              )}%</p>
              </div>
            `;
          }
          document.querySelector(".main__blockinfo-value-last").innerHTML = num;
          document
            .querySelector(".main__blockinfo-value-cap")
            .querySelector("span").innerHTML = numChange(
              addData[item]["quote"]["USD"]["market_cap"].toFixed(2)
          );
          document
            .querySelector(".main__blockinfo-value-supply")
            .querySelector("span").innerHTML = numChange(
              addData[item]["total_supply"].toFixed(0)
          );
        }
      }
    });


  fetch(ad, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      return resp.json();
    })
    .then((resBody) => {
      mainData = resBody;
    })
    .then(() => {
      let x = 1;
      for (let i = 0; i < mainData.length; i++) {
        if (mainData[i]["code"] != "ETH") {
          let table = document
            .querySelector(".table__box")
            .querySelector(".table__box_info");
          img = mainData[i]["icon"];

          let name = mainData[i]["slug"].replace(
            mainData[i]["slug"][0],
            mainData[i]["slug"][0].toUpperCase()
          );
          let price = mainData[i]["price"].toFixed(6);
          let percent = "";
          if (mainData[i]["percent_change_24h"] < 0) {
            percent = `
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_2_329)">
        <path d="M0.185592 3.25195L4.56056 7.62688C4.68414 7.7506 4.8306 7.81241 4.99998 7.81241C5.16936 7.81241 5.31579 7.7506 5.43951 7.62688L9.81448 3.25195C9.93819 3.12823 10 2.98177 10 2.81253C10 2.64329 9.93819 2.49672 9.81448 2.37311C9.69062 2.24939 9.54419 2.18755 9.37495 2.18755L0.625048 2.18755C0.455771 2.18755 0.309241 2.24939 0.185592 2.37311C0.0620122 2.49669 -3.47842e-05 2.64325 -3.47694e-05 2.81253C-3.47546e-05 2.98181 0.0620123 3.12823 0.185592 3.25195Z" fill="#FF4B32"/>
        </g>
        <defs>
        <clipPath id="clip0_2_329">
        <rect width="10" height="10" fill="white" transform="translate(10 10) rotate(180)"/>
        </clipPath>
        </defs>
        </svg>
        <p class="redText market__text-change-up market__text-global">${(
          mainData[i]["percent_change_24h"].toFixed(2) + ""
        ).replace("-", "")}%</p>          
        `;
          } else {
            percent = `
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_2_324)">
    <path d="M9.81441 6.74805L5.43944 2.37312C5.31586 2.2494 5.1694 2.18759 5.00002 2.18759C4.83064 2.18759 4.68421 2.2494 4.56049 2.37312L0.185524 6.74805C0.0618071 6.87177 0 7.01823 0 7.18747C0 7.35671 0.0618071 7.50328 0.185524 7.62689C0.309378 7.75061 0.455806 7.81245 0.625049 7.81245H9.37495C9.54423 7.81245 9.69076 7.75061 9.81441 7.62689C9.93799 7.50331 10 7.35675 10 7.18747C10 7.0182 9.93799 6.87177 9.81441 6.74805Z" fill="#16C784"/>
    </g>
    <defs>
    <clipPath id="clip0_2_324">
    <rect width="10" height="10" fill="white"/>
    </clipPath>
    </defs>
    </svg>
    
        <p class="greenText market__text-change-up market__text-global">${mainData[
          i
        ]["percent_change_24h"].toFixed(2)}%</p>          
        `;
          }
          let card = `
      <div class="table__box_height">
      <div class="table__boxFlex">
          <div class="table__number">
              <p class="table__text-number table__text-global">${x}</p>
          </div>
          <div class="table__buy">
              <img src="${img}" alt="icon" class="table__text-buyimage">
              <p class="table__text-buy table__text-buy-btc table__text-global">${mainData[i]["name"]} <span>${mainData[i]["code"]}</span></p>
          </div>
          <div class="table__price">
              <p class="table__text-price table__text-global">${mainData[i]["code"]}/ETH</p>
          </div>
          <div class="table__volume">
              <p class="table__text-volume-title">Last price</p>
              <p class="table__text-volume table__text-global">${price} <span>ETH</span></p>
          </div>
          <div class="table__change">
               <p class="table__change-title">Change (24H)</p>
              <p class="table__text-change table__text-change-up table__text-global">${percent}</p>
          </div>
          
          <div class="table__action">
              <a href="index.html" class="table__text_btn"><p class="table__text-action">Exchange</p></a>
          </div>
          <div class="table__mobile_btn">
                <a href="index.html" class="table__mobile-btn">Exchange now</a>
          </div>
      </div>
    </div>
        `;
          table.innerHTML += card;
          x++;
        }
      }
    });
}

function ltcFunc(ad, addad) {
  fetch(addad, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      return resp.json();
    })
    .then((resBody) => {
      addData = resBody.data;
      console.log(addData);
    })
    
    .then(() => {    
      for (let item in addData) {
        console.log(addData[item]["symbol"]);
        if (addData[item]["symbol"] === "LTC") {
          document
            .querySelector(".main__blockinfo-value-price")
            .querySelector("span").innerHTML = numChange(
              addData[item]["quote"]["USD"]["price"].toFixed(2)
          );
          let num = "";
          if (addData[item]["quote"]["USD"]["percent_change_24h"] > 0) {
            num = `
              <div>
              <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.9348 4.77754L6.40916 0.858263C6.1743 0.654871 5.8257 0.65487 5.59084 0.858263L1.06525 4.77754C0.627807 5.15638 0.895724 5.875 1.4744 5.875H10.5256C11.1043 5.875 11.3722 5.15637 10.9348 4.77754Z" fill="white" stroke="white" stroke-width="0.75"/>
              </svg>

              <p>${(
                numChange(
                  addData[item]["quote"]["USD"]["volume_change_24h"].toFixed(2)
                ) + ""
              ).replace("-", "")} USD</p>
              <p class="last-percent">${numChange(
                addData[item]["quote"]["USD"]["percent_change_24h"].toFixed(2)
              )}%</p>
              </div>
            `;
          } else {
            num = `
              <div>
              <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.9348 2.22246L6.40916 6.14174C6.1743 6.34513 5.8257 6.34513 5.59084 6.14174L1.06525 2.22246C0.627807 1.84362 0.895724 1.125 1.4744 1.125H10.5256C11.1043 1.125 11.3722 1.84363 10.9348 2.22246Z" fill="white" stroke="white" stroke-width="0.75"/>
</svg>

              <p>${(
                numChange(
                  addData[item]["quote"]["USD"]["volume_change_24h"].toFixed(2)
                ) + ""
              ).replace("-", "")} USD</p>
              <p class="last-percent">${numChange(
                addData[item]["quote"]["USD"]["percent_change_24h"].toFixed(2)
              )}%</p>
              </div>
            `;
          }
          document.querySelector(".main__blockinfo-value-last").innerHTML = num;
          document
            .querySelector(".main__blockinfo-value-cap")
            .querySelector("span").innerHTML = numChange(
              addData[item]["quote"]["USD"]["market_cap"].toFixed(2)
          );
          document
            .querySelector(".main__blockinfo-value-supply")
            .querySelector("span").innerHTML = numChange(
              addData[item]["total_supply"].toFixed(0)
          );
        }
      }
    });

  fetch(ad, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      return resp.json();
    })
    .then((resBody) => {
      mainData = resBody;
    })
    .then(() => {
      let x = 1;
      for (let i = 0; i < mainData.length; i++) {
        if (mainData[i]["code"] != "LTC") {
          let table = document
            .querySelector(".table__box")
            .querySelector(".table__box_info");
          img = mainData[i]["icon"];

          let name = mainData[i]["slug"].replace(
            mainData[i]["slug"][0],
            mainData[i]["slug"][0].toUpperCase()
          );
          let price = mainData[i]["price"].toFixed(6);
          let percent = "";
          if (mainData[i]["percent_change_24h"] < 0) {
            percent = `
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_2_329)">
    <path d="M0.185592 3.25195L4.56056 7.62688C4.68414 7.7506 4.8306 7.81241 4.99998 7.81241C5.16936 7.81241 5.31579 7.7506 5.43951 7.62688L9.81448 3.25195C9.93819 3.12823 10 2.98177 10 2.81253C10 2.64329 9.93819 2.49672 9.81448 2.37311C9.69062 2.24939 9.54419 2.18755 9.37495 2.18755L0.625048 2.18755C0.455771 2.18755 0.309241 2.24939 0.185592 2.37311C0.0620122 2.49669 -3.47842e-05 2.64325 -3.47694e-05 2.81253C-3.47546e-05 2.98181 0.0620123 3.12823 0.185592 3.25195Z" fill="#FF4B32"/>
    </g>
    <defs>
    <clipPath id="clip0_2_329">
    <rect width="10" height="10" fill="white" transform="translate(10 10) rotate(180)"/>
    </clipPath>
    </defs>
    </svg>
    <p class="redText market__text-change-up market__text-global">${(
      mainData[i]["percent_change_24h"].toFixed(2) + ""
    ).replace("-", "")}%</p>          
    `;
          } else {
            percent = `
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_2_324)">
    <path d="M9.81441 6.74805L5.43944 2.37312C5.31586 2.2494 5.1694 2.18759 5.00002 2.18759C4.83064 2.18759 4.68421 2.2494 4.56049 2.37312L0.185524 6.74805C0.0618071 6.87177 0 7.01823 0 7.18747C0 7.35671 0.0618071 7.50328 0.185524 7.62689C0.309378 7.75061 0.455806 7.81245 0.625049 7.81245H9.37495C9.54423 7.81245 9.69076 7.75061 9.81441 7.62689C9.93799 7.50331 10 7.35675 10 7.18747C10 7.0182 9.93799 6.87177 9.81441 6.74805Z" fill="#16C784"/>
    </g>
    <defs>
    <clipPath id="clip0_2_324">
    <rect width="10" height="10" fill="white"/>
    </clipPath>
    </defs>
    </svg>
    
    <p class="greenText market__text-change-up market__text-global">${mainData[
      i
    ]["percent_change_24h"].toFixed(2)}%</p>          
    `;
          }
          let card = `
      <div class="table__box_height">
      <div class="table__boxFlex">
          <div class="table__number">
              <p class="table__text-number table__text-global">${x}</p>
          </div>
          <div class="table__buy">
              <img src="${img}" alt="icon" class="table__text-buyimage">
              <p class="table__text-buy table__text-buy-btc table__text-global">${mainData[i]["name"]} <span>${mainData[i]["code"]}</span></p>
          </div>
          <div class="table__price">
              <p class="table__text-price table__text-global">${mainData[i]["code"]}/LTC</p>
          </div>
          <div class="table__volume">
              <p class="table__text-volume-title">Last price</p>
              <p class="table__text-volume table__text-global">${price} <span>LTC</span></p>
          </div>
          <div class="table__change">
              <p class="table__change-title">Change (24H)</p>
              <p class="table__text-change table__text-change-up table__text-global">${percent}</p>
          </div>
          
          <div class="table__action">
              <a href="index.html" class="table__text_btn"><p class="table__text-action">Exchange</p></a>
          </div>
          <div class="table__mobile_btn">
                <a href="index.html" class="table__mobile-btn">Exchange now</a>
          </div>
      </div>
    </div>
        `;
          table.innerHTML += card;
          x++;
        }
      }
    });
}

/*===========================================================*/

//=======ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 500));
}

function numChange(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/*================ФУНКЦИИ ДЛЯ МОБИЛЬНОЙ ВЕРСИИ СТРАНИЦ ОСНОВНЫХ ВАЛЮТ===================*/
let indexStrings = 2;
function tableAdaptive() {
  let table = document.querySelector(".table__box_info");
  let strings = table.querySelectorAll(".table__box_height");
  setInterval(() => {
    strings = table.querySelectorAll(".table__box_height");

    if (strings.length > indexStrings) {
      for (let i = 0; i < indexStrings + 1; i++) {
        strings[i].style.display = "block";
      }
    }
  });

  document.querySelector(".table-mobile-btn").onclick = () => {
    indexStrings += 3;
  };
}

if (window.screen.width <= 768) {
  tableAdaptive();
}
/*======================================================================================*/
