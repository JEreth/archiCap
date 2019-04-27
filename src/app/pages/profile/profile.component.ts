import { Component, OnInit } from '@angular/core';
import {Capability} from '../../capabilities/shared/capability';
import {CapabilityService} from '../../capabilities/shared/capability.service';
import {SystemService} from '../../systems/shared/system.service';
import {ProfilePersistence, ProfileService} from '../../shared/profile.service';
import {System} from '../../systems/shared/system';
import {MatSnackBar} from '@angular/material';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public selectedSystems: number[];
  public selectedCapabilities: number[];
  public capabilities: Capability[] = [];
  public systems: System[] = [];

  public downloadJsonHref: SafeUrl;
  public uploadFile: any;
  public uploading = false;

  constructor(private capabilityService: CapabilityService,
              private systemService: SystemService,
              private snackBar: MatSnackBar,
              private sanitizer: DomSanitizer,
              private profile: ProfileService) {

    this.capabilityService.getAllAsArray().subscribe( capabilities => {
      this.capabilities = capabilities;
    });

    this.systemService.getAllAsArray().subscribe( systems => {
      this.systems = systems;
    });

    this.profile.init().subscribe( () => {
      this.selectedSystems = this.profile.selectedSystems;
      this.selectedCapabilities = this.profile.selectedCapabilities;
      this.generateDownload();
    });
  }

  ngOnInit() {
  }

  save() {
    this.profile.selectedSystems = this.selectedSystems;
    this.profile.selectedCapabilities = this.selectedCapabilities;
    this.profile.persist().subscribe( () => {
      this.snackBar.open('Profile was saved');
      this.generateDownload();
    });
  }

  generateDownload() {
    const url = 'data:text/json;charset=UTF-8,' + encodeURIComponent(this.profile.exportToJson());
    this.downloadJsonHref = this.sanitizer.bypassSecurityTrustUrl(url);
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
        if (this.profile.validate(input)) {
          // schema looks good so go on and delete old config if it exists
          this.profile.importFromPersistence(<ProfilePersistence> input).subscribe( () => {
            this.snackBar.open('Profile has been imported.');
            this.uploading = false;
            this.selectedSystems = this.profile.selectedSystems;
            this.selectedCapabilities = this.profile.selectedCapabilities;
          });
        } else {
          // error
          this.snackBar.open('The uploaded profile is not valid.');
          this.uploading = false;
        }
      } catch (e) {
        this.snackBar.open('There has been an error. Please try again.');
        this.uploading = false;
      }
    };
    fileReader.readAsText(this.uploadFile);
  }

}
