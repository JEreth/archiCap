import { Component, OnInit } from '@angular/core';
import {ConfigurationPersistence, ConfigurationService} from '../../shared/configuration.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {MatSnackBar} from '@angular/material';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  public downloadJsonHref: SafeUrl = '';
  public uploadFile: any;
  public uploading = false;
  public loading = false;
  public predefinedConfiguration = '';

  constructor(private configurationService: ConfigurationService,
              private snackBar: MatSnackBar,
              private http: HttpClient,
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

  uploadFileChanged(e) {
    this.uploadFile = e.target.files[0];
  }

  upload() {
    this.uploading = true;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      try {
        const input = JSON.parse(fileReader.result.toString());
        if (this.configurationService.validate(input)) {
          // schema looks good so go on and delete old config if it exists
          this.configurationService.importFromPersistence(<ConfigurationPersistence> input).subscribe( () => {
            this.snackBar.open('Configuration has been imported.');
            this.uploading = false;
          });
        } else {
          // error
          this.snackBar.open('The uploaded configuration is not valid.');
          this.uploading = false;
        }
      } catch (e) {
        this.snackBar.open('There has been an error. Please try again.');
        this.uploading = false;
      }
    };
    fileReader.readAsText(this.uploadFile);
  }

  reset() {
    this.configurationService.reset().subscribe( () => {
      this.snackBar.open('Configuration has been reset.');
    });
  }

  loadConfiguration() {
    this.loading = true;
    const url = 'assets/configurations/' + this.predefinedConfiguration + '.json';
    this.http.get(url)
      .subscribe(
        data => {
          this.configurationService.importFromPersistence(<ConfigurationPersistence> data).subscribe( () => {
            this.snackBar.open('Configuration has been loaded.');
            this.loading = false;
          });
        },
        () => {
          this.snackBar.open('There has been an error. Please try again.');
          this.loading = false;
        });
  }

}
