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
  private status;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService
    .getStatus();
  
  }

  ngAfterViewInit() {
    this.initMap();
  }

  private initMap() {
    this.map = leaflet.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3,
    });

    const tiles = leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

}
