let dataPrint = document.getElementById("country-print");
let covidAlldata = document.getElementById("covid-allData");

const covidApi = async () => {
    const covidFetch = await fetch("https://api.rootnet.in/covid19-in/stats/latest");
    const allData = await covidFetch.json();
    const regionalData = allData.data.regional;
    console.log("All regional data:", regionalData);

    regionalData.forEach((data) => {
        const locationName = data.loc;
        dataPrint.innerHTML += `
                <div class="col-lg-4">
                    <div class="allData-print border-bottom border-2 shadow py-3 px-2 rounded-3" 
                         style="cursor: pointer;" 
                         data-bs-target="#data-Print" 
                         data-bs-toggle="modal" 
                         onclick="covidData('${locationName}')">
                        <p class="text-center m-0 text-uppercase fw-bold text-etalic text-primary">${locationName}</p>
                    </div>
                </div>`;
    });
};

const covidData = async (name) => {
    console.log("State name:", name);
    const stateFetch = await fetch(`https://api.rootnet.in/covid19-in/stats/${name}`);
    const stateData = await stateFetch.json();

    const covidData = stateData.data.regional.find(region => region.loc === name);

    if (covidData) {
        covidAlldata.innerHTML = `<tr>
                                <td>${covidData.loc}</td>
                                <td>${covidData.confirmedCasesIndian}</td>
                                <td>${covidData.discharged}</td>
                                <td>${covidData.deaths}</td>
                                <td>${covidData.totalConfirmed}</td>
                            </tr>
            `;
    }
}

covidApi();