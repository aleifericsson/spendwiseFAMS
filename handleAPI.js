//import unirest from 'unirest';

const authJWT = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJuYmYiOjE2OTYwMzIwMDAsImFwaV9zdWIiOiI1NTZjYjA3ZjNhOTVlYzg4NDljYTdmYzliZGNlN2FjYTk3MDEwYTgxMGJlNTNjYzc0MDNmODlkN2Q3ZWU3NWI0MTcxNzIwMDAwMDAwMCIsInBsYyI6IjVkY2VjNzRhZTk3NzAxMGUwM2FkNjQ5NSIsImV4cCI6MTcxNzIwMDAwMCwiZGV2ZWxvcGVyX2lkIjoiNTU2Y2IwN2YzYTk1ZWM4ODQ5Y2E3ZmM5YmRjZTdhY2E5NzAxMGE4MTBiZTUzY2M3NDAzZjg5ZDdkN2VlNzViNCJ9.FS7lGZctznMMY-MgTppnvmkgUDNsiAJAsKkJBpuH51FUgm-hUra_tOyJINDCShc3QMI4fOW3jzh_a5logr4tuQTorsTUGCsVsIWQYCvpIhHRenFpl0R8fB0Se-UpEA6WaVVsVvVoJqk6Lh6JFK7c_n-GE82qkUBtZrCD1_EOw30bqbCOo7rGyp5qwVeJiZIXmCpvXi1hjdGnNUliVN-CdzAL8UuaGTox9IZkKO2au8hlFafYhXtbh6CG_zw50IgW-O23VmPGw1qSLqmgYAHX7IljciKnfJUD26dTTO1jN4AL1Rphrdm6o2AuMsxR2tYWAUHXKtoc_5V4e95nWt9Ypw";
const accountID =  "00428702";



const res = async () =>{
    const myHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authJWT}`,
        'version': '1.0',
    }

    const response = await fetch(`https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts/${accountID}`, {
        method:"GET",
        mode: "no-cors",
        headers:myHeaders
    });
    let raw_data = await response.json()
    console.log(raw_data);
    return(raw_data);
}
/*
var req = unirest(
    'GET',
    `https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts/${accountID}`
)
    .headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authJWT}`,
        'version': '1.0',
    })
    .end(function (res) {
        if (res.error) throw new Error(res.error);
        console.log(res.raw_body);
    });
*/

const text = document.querySelector(".text");
text.innerHTML = res();