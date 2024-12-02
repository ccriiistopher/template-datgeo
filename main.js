import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [-8246936.494308056, -1119428.8251098266],
    zoom: 7,
    maxZoom: 50,
    minZoom: 5,
  })
});
