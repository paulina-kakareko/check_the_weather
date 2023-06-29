




document.addEventListener("DOMContentLoaded", function() {

    function showIcon(icon) {
        document.querySelectorAll('#temp-icon').forEach(function(div) {
                div.style.display = 'none';
        });
        document.querySelector(`.${icon}`).style.display = 'block'
    };

    document.querySelector('#submit').disabled = true;
    document.querySelector('#station').onkeyup = function () {
        if (document.querySelector('#station').value.length > 0) {
            document.querySelector('#submit').disabled = false;
        }    else {
            document.querySelector('#submit').disabled = true;
        }
    }
    document.querySelector('form').onsubmit = function() {
        let city = document.querySelector('#station').value.toLowerCase();
        fetch(`https://danepubliczne.imgw.pl/api/data/synop/station/${city}`)
.then(response => response.json()).
then(data => {
    const stacja = data.stacja;
    const temperatura = data.temperatura;
    const temp = parseInt(temperatura)
    const cisnienie = data.cisnienie;
    if (stacja !== undefined) {
        document.querySelector('#info').innerHTML = `Aktualnie w stacji ${stacja} jest ${temperatura} stopni Celcjusza i ciśnienie wynosi ${cisnienie} hPa`; 
            if (temp > 20) {
                showIcon("high-temp")
         } else if ( 0 < temp <= 20) {
             showIcon('mid-temp')
         } else {
             showIcon('low-temp')
         }
        
    } else {
        document.querySelector('#info').innerHTML = "Brak stacji"; 
        document.querySelector('#temp-icon').style.display = 'none'
    }
})
.catch(error => {
    console.log('Error', error)
})
        return false;
    };

})







