window.onload =  async () => {
    const endpoint = await fetch("../ListOfAccounts.json")
    const blob = await endpoint.json()
    console.log(blob)
}