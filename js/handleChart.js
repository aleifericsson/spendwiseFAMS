const chart_but = document.querySelector(".make-chart");

document.addEventListener("DOMContentLoaded", async () => {
  /*
    const endpoint = await fetch("http://localhost:3000/api/transactions/41558210",{mode:"no-cors", method:"GET", headers:{"Content-Type":"application/json"}});
    console.log(endpoint);
    let raw_data = await endpoint.json();
    console.log(raw_data);
    */

    const endpoint = await fetch("../mock_transactions.json");
    console.log(endpoint);
    let raw_data = await endpoint.json();
    console.log(raw_data);
    let data={cat_names:[],cat_count:[],tot_spent:0,tot_earned:0};
    raw_data.Transactions.forEach(transaction =>{
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

    console.log(data);

    build_chart(data);

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
    console.log(highest_count);
    for(let i=0; i<temp_num; i++){
      const num = (data.cat_count[i]/highest_count)*400;
      console.log(`${num}px`);
      bar_list[i].style.width=`${num}px`;
    }
  }