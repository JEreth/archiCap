import {Component, OnInit} from '@angular/core';
import {ConfigurationService} from '../../shared/configuration.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {MatSnackBar} from '@angular/material/snack-bar';
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
  }

  async ngOnInit() {
    await this.generateDownload();
  }

  async generateDownload() {
    this.downloadJsonHref = this.sanitizer.bypassSecurityTrustUrl('data:text/json;charset=UTF-8,' +
      encodeURIComponent(await this.configurationService.export()));
  }

  uploadFileChanged(e) {
    this.uploadFile = e.target.files[0];
  }

  upload() {
    this.uploading = true;
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      try {
        const input = JSON.parse(fileReader.result.toString());
        if (this.configurationService.validate(input)) {
          // schema looks good so go on and delete old config if it exists
          await this.configurationService.import(input);
          this.snackBar.open('Configuration has been imported.');
          this.uploading = false;
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

  async reset() {
    if (confirm('Are you sure?')) {
      await this.configurationService.reset();
      this.snackBar.open('Configuration has been reset.');
    }
  }

  loadConfiguration() {
    this.loading = true;
    const url = 'assets/configurations/' + this.predefinedConfiguration + '.json';
    this.http.get(url)
      .subscribe(
        async data => {
          try {
            await this.configurationService.import(data);
            this.snackBar.open('Configuration has been loaded.');
            this.loading = false;
          } catch (e) {
            console.log(e);
            this.snackBar.open('There has been an error.');
            this.loading = false;
          }
        },
        () => {
          this.snackBar.open('There has been an error. Please try again.');
          this.loading = false;
        });
  }

}
