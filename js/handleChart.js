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

    build_chart();

  });

  function build_chart(){
    document.querySelector(".cat-chart");
  }