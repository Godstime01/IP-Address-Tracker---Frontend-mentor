const form = document.getElementById("form");
    const input = document.querySelector(".ip_address");
    const btn = document.querySelector(".btn");
    const items = document.querySelectorAll(".item")
    var url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_nN4XWM56D9DNDONEfux3Xgchvx2dD`;


    function callGeoLocationApi(url) {
      fetch(url)
        .then(res => res.json())
        .then(data => {
          document.querySelector(".loading").style.display = "None";


          let { ip, location: { city, country, timezone, lat, lng }, as, isp } = data
          items[0].lastElementChild.innerText = ip;
          items[1].lastElementChild.innerText = `${city}, ${country}`
          items[2].lastElementChild.innerText = timezone;
          items[3].lastElementChild.innerText = isp;

         mapLocation(lat, lng);
        })
        .catch(err => console.log("error"))
    }

    function mapLocation(lat, lng){
      var myIcon = L.icon({
        iconUrl: '/images/icon-location.svg',
        iconSize: [20, 40],
        iconAnchor: [22, 94],
      });

      map.setView([lat, lng], 17)

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 13,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
    
    var marker = L.marker([lat, lng], { icon: myIcon }).addTo(map);
    }

    // Map

    var map = L.map('map').setView([51.505, -0.09], 13);

    

    const validateInput = (value) => {
      if (/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(value)) {
        return true
      }
      return false
    }



    form.addEventListener("submit", e => {
      e.preventDefault()

      if (input.value.trim() == "") {
        alert("Invalid address")
        return
      } else {
        // const valid = validateInput(input.value);
        // console.log(valid)
        // if (valid){
        console.log("submitted")
        callGeoLocationApi(`https://geo.ipify.org/api/v2/country,city?apiKey=at_nN4XWM56D9DNDONEfux3Xgchvx2dD&ipAddress=${input.value}`)
        // }
      }
    })
    
    callGeoLocationApi(`https://geo.ipify.org/api/v2/country,city?apiKey=at_nN4XWM56D9DNDONEfux3Xgchvx2dD`)
