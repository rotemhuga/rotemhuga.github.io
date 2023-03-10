
let map;

function initMap(lat, lng) {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat , lng },
    zoom: 12,
  });

  const marker = new google.maps.Marker({
    position: {lat, lng},
    map: map,
    icon: {
      url:"./assets/Vector.png", 
    scaledSize: new google.maps.Size(35, 40)
  }

  });
}
window.initMap = initMap;

let link = `https://geo.ipify.org/api/v2/country,city?apiKey=at_hwwLTW1MgBZT8cbHb9GaRVo7IAtn9&ipAddress=`
//Deafult Local IP function 
  const functionDefault = (link) => {
    fetch(link) 
        .then((response) => {
            if (response.ok) {
            return response.json();
            } else {
            throw new Error(response.statusText);
            }
        })
        .then((data) => { 
            console.log(data)
            const addContentJs = document.getElementById("addContent")
            addContentJs.innerHTML = data.ip;
            const locationContentJs = document.getElementById("locationContent")
            datapostalCode = (data.location.postalCode === "" ? "No Postal Code" : data.location.postalCode )
            locationContentJs.innerHTML = `<div class="content"> <p> ${data.location.region}, ${data.location.country} </p> <p> ${datapostalCode} </p> </div>`;
            const timeContentJs = document.getElementById("timeContent")
            timeContentJs.textContent = "UTC" + " " + data.location.timezone;
            const ispContentJs = document.getElementById("ispContent")
            ispContentJs.textContent = data.isp;
            const downContainerJs = document.getElementById("downContainer")
            initMap (data.location.lat, data.location.lng);

        })
        .catch((error) => {
            document.getElementById("output").innerHTML = error.message;
            document.getElementById("output").classList.add("error");
        });
 }   

 functionDefault(link)

 // function with User IP
const buttonSubmit = (event) => {
    event.preventDefault()
    let valueIp = event.srcElement[0].value;
    function ValidateIPaddress(ipaddress) {
    //checking if the user enter a valid addrees
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(valueIp))
    {
      linkValue = `https://geo.ipify.org/api/v2/country,city?apiKey=at_hwwLTW1MgBZT8cbHb9GaRVo7IAtn9&ipAddress=${valueIp}`
      functionDefault(linkValue)
    } else {
      alert("You have entered an invalid IP address!")
    }
  }
  ValidateIPaddress(valueIp)
}



