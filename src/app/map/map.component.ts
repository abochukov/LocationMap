import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as leaflet from 'leaflet';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  private map;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getStatus();
    this.dataService.getPopulationDensity().subscribe(population => {
      console.log(population)
    });
  }

  ngAfterViewInit() {
    this.initMap();
  }

  private initMap() {
    this.map = leaflet.map('map', {
      center: [43.1010, 30.5050],
      zoom: 3,
    });

    const tiles = leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',

    });
    
    const ch = leaflet.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
      {id: 'MapID', tileSize: 512, zoomOffset: -1, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});
      
    const germany   = leaflet.tileLayer(
      'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', 
      {id: 'MapID', tileSize: 512, zoomOffset: -1, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});

    const baseMaps = {
      "Mapnik": ch,
      "Germany": germany
    };

    
    tiles.addTo(this.map);
    leaflet.control.layers(baseMaps).addTo(this.map);  
    
    const search = leaflet.layerGroup().addTo(this.map);
    this.map.addControl( new leaflet.Control.Search({layer: search}) );
  }

}
