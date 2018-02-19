

import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import * as WaveSurfer from 'wavesurfer.js';
import * as WaveformPlaylist from 'waveform-playlist';
import * as EventEmitter from 'event-emitter';
import {AngularFireDatabase} from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable';;
import { UploadService } from './../upload.service';
import 'rxjs/add/operator/map';
class Upload {
  $key: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  createdAt: Date = new Date();

  constructor(file: File) {
    this.file = file;
  }
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home.component.scss'],
  providers: [AngularFireDatabase]
})
export class HomeComponent implements OnInit {
  wavesurfer
  wavesurferPlaylist
  uploadSuccesfull = 0;
  ee
  
  uploads: Observable<Upload[]>;
  showSpinner = true;

  constructor(private upSvc: UploadService) { }

  ngOnInit() {
    this.uploads = this.upSvc.getUploads();
    this.uploads.subscribe(() => this.showSpinner = false);
  }

  

  
  initPlayerSettings() {
    this.wavesurferPlaylist = WaveformPlaylist.init({
      samplesPerPixel: 3000,
      waveHeight: 100,
      container: document.getElementById("playlist"),
      state: 'cursor',
      colors: {
        waveOutlineColor: '#E0EFF1',
        timeColor: 'grey',
        fadeColor: 'black'
      },
      timescale: true,
      controls: {
        show: true, //whether or not to include the track controls
        width: 200 //width of controls in pixels
      },
      seekStyle: 'line',
      zoomLevels: [500, 1000, 3000, 5000]
    },
    EventEmitter()
    
  );
    this.ee = this.wavesurferPlaylist.getEventEmitter();
  }
  onUploadSuccess($event) {
    this.uploadSuccesfull = 1;
    this.initPlayerSettings();
    console.log($event);
    let fileName = $event[0].name;
    let urlFile = "./uploads/" + fileName;
    // this.wavesurfer.load(urlFile);
    this.wavesurferPlaylist.load([
      {
        src: urlFile,
        name: fileName,
      }
    ]).then(function () {
      // can do stuff with the playlist.
    });

  }
  play() {
    this.wavesurferPlaylist.play();

  }
  pause() {
    this.wavesurferPlaylist.pause();
  }
  shift() {
    this.ee.emit("statechange", "shift");
  }
  selectRegion(){
    this.ee.emit("statechange", "select");
  }
  trim(){
    this.ee.emit('trim');
  }
  onUploadError($event) {
    console.log($event);
  }
}
