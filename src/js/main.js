// App static files
import '../css/main.scss';
import '../css/header.scss';
import '../css/instructions.scss';
import '../css/form.scss';
import '../css/sign-up.scss';
import geoIcon from '../static/geo.svg'
import validateCoordinates from './validateCoordinates'

// HTTP requests related libraries
import * as axios from 'axios'
import "core-js";
import "regenerator-runtime";

// Map & co
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';

import * as tooltip from 'tooltip'

window.onload = function () {

  // tooltip plugin
  tooltip()

  if (document.querySelector('#map')) {
    const map = L.map('map', {
      center: [45.4408, 12.3155],
      zoom: 2
    });

    map.on('popupopen', function (e) {
      map.setView(e.target._popup._latlng, e.target._zoom);
    });

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
      })
      .addTo(map);

    const queryAlerts = async () => {
      try {
        const res = await axios.get('/query-alerts');
        const alerts = res.data

        alerts.forEach(async e => {
          const popUpContent =
            `<div class="popup">
            <img class="popup-image" src="../${e.path}"}>
            <p> username: ${e.username} </p>
            <p> Title: ${e.title} </p>
            <p> Date: ${e.createdAt} </p>
           </div>`
          const marker = L.marker(e.coordinates.split(", "))
          const popup = L.popup({
            closeOnClick: true,
            keepInView: true
          }).setContent(popUpContent)
          marker.bindPopup(popup)
          marker.addTo(map)
        })
      } catch (err) {
        console.error(err);
      }
    };

    map.on('click', function (e) {
      //since the map wraps the coordinates would go out of bounds and they need to be wrapped
      const coordinates = `${e.latlng.wrap().lat}, ${e.latlng.wrap().lng}`
      document
        .querySelector("#coordinates")
        .value = coordinates
    });

    queryAlerts()

    const geo = document.querySelector("#geo");
    geo.src = geoIcon
    geo.addEventListener("click", () => {
      navigator.geolocation.getCurrentPosition((pos) => {
        document
          .querySelector("#coordinates")
          .value = `${pos.coords.longitude}, ${pos.coords.latitude}`
      })
    });
  }

  if (document.querySelector("#coordinates")) {
    document.querySelector("#coordinates").addEventListener("change", function (e) {
      validateCoordinates.validateCoordinates(`${e.latlng.wrap().lat}, ${e.latlng.wrap().lng}`) ?
        e.target.setCustomValidity('') :
        e.target.setCustomValidity('Invalid coordinates.')
    })
  }

}