import { Component, OnInit } from '@angular/core';
import {ConfigurationService} from '../../shared/configuration.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  public downloadJsonHref: SafeUrl;

  constructor(private configurationService: ConfigurationService,
              private snackBar: MatSnackBar,
              private sanitizer: DomSanitizer) {
    this.generateDownload();
  }

  ngOnInit() {
  }

  generateDownload() {
    this.configurationService.exportToJson().subscribe( json => {
      this.downloadJsonHref = this.sanitizer.bypassSecurityTrustUrl('data:text/json;charset=UTF-8,' + encodeURIComponent(json));
    });
  }

  upload() {
    // first reset and then somehow read the file and create structure (maybe validate first?)
    this.configurationService.reset().subscribe( () => {

    });
  }

  reset() {
    this.configurationService.reset().subscribe( () => {
      this.snackBar.open('Configuration has been reset.');
    });
  }

}
