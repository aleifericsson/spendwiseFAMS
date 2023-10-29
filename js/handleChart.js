const chart_but = document.querySelector(".make-chart");

document.addEventListener("DOMContentLoaded", async () => {

    const num = Math.floor(Math.random()*250);
    const endpoint1 = await fetch("../ListOfAccounts.json");
    let account_data = await endpoint1.json();
    const cur_acc = account_data.Accounts[num];

    const welc = document.querySelector(".welcome");
    welc.innerHTML = `Welcome, ${cur_acc.firstname} ${cur_acc.lastname}`;
  /*
    const endpoint = await fetch("http://localhost:3000/api/transactions/41558210",{mode:"no-cors", method:"GET", headers:{"Content-Type":"application/json"}});
    console.log(endpoint);
    let raw_data = await endpoint.json();
    console.log(raw_data);
    */

    const num2 = Math.floor(Math.random()*225);
    console.log(num2);
    const endpoint2 = await fetch("../ListOfTransactions.json");
    let raw_raw_data = await endpoint2.json();

    /*
    let raw_data = raw_raw_data.Transactions.filter(transaction => {
      console.log(transaction.accountUUID);
      console.log(87008339);
      return transaction.accountUUID === 87008339;
    })
    */

    let raw_data = raw_raw_data.Transactions.slice(25*num2,25*(num2+1));
    let data={cat_names:[],cat_count:[],tot_spent:0,tot_earned:0,net:0};
    console.log(raw_data);
    raw_data.forEach(transaction =>{
      if (transaction.amount <= 0)
      {
        data.tot_earned-= transaction.amount;
      } else{
        data.tot_spent += transaction.amount;
        if (data.cat_names.includes(transaction.merchant.category)){
          const index = data.cat_names.indexOf(transaction.merchant.category);
          data.cat_count[index] += 1;
        } else{
          data.cat_names.push(transaction.merchant.category);
          data.cat_count.push(1);
        }
      }
      
    });
    data.net = (data.tot_spent-data.tot_earned).toFixed(2);
    data.tot_earned = data.tot_earned.toFixed(2);
    data.tot_spent = data.tot_spent.toFixed(2);
    if (data.net <0){
      document.querySelector(".net").style.color = "green";
      data.net = data.net*-1;
    }
    else if (data.net >0){
      document.querySelector(".net").style.color = "red";
    }

    document.querySelector(".earnt").innerHTML=`Total Earned: £${data.tot_earned}`;
    document.querySelector(".spent").innerHTML=`Total Spent: £${data.tot_spent}`
    document.querySelector(".net").innerHTML=`Net Expenditures: £${data.net}`


    console.log(data);

    build_chart(data);

    build_map(raw_data);

  });

  function build_chart(data){
    const var_list = [...document.querySelectorAll(".variable")];
    const bar_list = [...document.querySelectorAll(".bard")]
    let temp_num = 0;
    let highest_count = 0;
    if (data.cat_names.length>5){
      temp_num=5;
    }else{
      temp_num = data.cat_names.length
    }
    for(let i=0; i<temp_num; i++){
      var_list[i].innerHTML=data.cat_names[i];
      if (data.cat_count[i]>=highest_count){
        highest_count=data.cat_count[i];
      }
    }
    for(let i=0; i<temp_num; i++){
      const num = (data.cat_count[i]/highest_count)*400;
      bar_list[i].style.width=`${num}px`;
    }
  }

  function build_map(raw_data){
    const map = document.querySelector(".map");
    raw_data.forEach(transaction => {
      const pin_div = document.createElement("div");
      pin_div.classList.add("pin");
      pin_div.innerHTML = `<?xml version="1.0" encoding="utf-8"?>
      <!-- Generator: Adobe Illustrator 14.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 43363)  -->
      <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
      <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="25px" width="15px" fill="#F0C808" stroke="#242424" 
        style="
        stroke-opacity: 1;
        stroke-width:2;
        stroke-miterlimit: 3.97446823;
        stroke-dasharray: none;"
          viewBox="0 0 56.068 100" enable-background="new 0 0 56.068 100" xml:space="preserve">
      <path d="M28.034,0C12.552,0,0,12.552,0,28.034S28.034,100,28.034,100s28.034-56.483,28.034-71.966S43.517,0,28.034,0z
        M28.034,40.477c-6.871,0-12.442-5.572-12.442-12.442c0-6.872,5.571-12.442,12.442-12.442c6.872,0,12.442,5.57,12.442,12.442
        C40.477,34.905,34.906,40.477,28.034,40.477z"/>
      </svg>
      `;
      const lon = transaction.longitude;
      const lat = transaction.latitude;
      const blc_lon = -9.1;
      const blc_lat = 46.74154;
      const trc_lon = 3.203219 ;
      const trc_lat = 63.59491;
      let nlon = (lon-blc_lon)/(trc_lon-blc_lon);
      let nlat = (trc_lat-lat)/(trc_lat-blc_lat);
      nlon = nlon*100;
      nlat = nlat*100;
      pin_div.setAttribute("style", `position:absolute;top:${nlat}%;left:${nlon}%;transform:translate(-50%,-90%);`);
    map.appendChild(pin_div); 
  })
  }

  /*
  bottom left corner: 48.574154, -8.915824
  top right corner: 61.969491, 3.103219

  test point: 55.011995, -5.122980
  */