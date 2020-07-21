import {Component, OnInit} from '@angular/core';
import {CapabilityService} from '../../capabilities/shared/capability.service';
import {SystemService} from '../../systems/shared/system.service';
import {Profile, ProfileService} from '../../shared/profile.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {Configuration, ConfigurationService} from '../../shared/configuration.service';
import {Product} from '../../products/shared/product';
import {MatDialog} from '@angular/material/dialog';
import {ProductInfoComponent} from '../../products/product-info/product-info.component';
import {CapabilityInfoComponent} from "../../capabilities/capability-info/capability-info.component";
import {Capability} from "../../capabilities/shared/capability";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public configuration: Configuration;
  public profile: Profile;

  public downloadJsonHref: SafeUrl;
  public uploadFile: any;
  public uploading = false;

  constructor(private configurationService: ConfigurationService,
              private capabilityService: CapabilityService,
              private systemService: SystemService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private sanitizer: DomSanitizer,
              private profileService: ProfileService) {
  }

  async ngOnInit() {
    this.profile = await this.profileService.get();
    this.configuration = await this.configurationService.get();
    await this.generateDownload();
  }

  async save() {
    await this.profileService.persist();
    this.snackBar.open('Profile was saved');
    await this.generateDownload();
  }

  async generateDownload() {
    const url = 'data:text/json;charset=UTF-8,' + encodeURIComponent(await this.profileService.export());
    this.downloadJsonHref = this.sanitizer.bypassSecurityTrustUrl(url);
  }

  uploadFileChanged(e) {
    this.uploadFile = e.target.files[0];
  }

  async upload() {
    this.uploading = true;
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      try {
        const input = JSON.parse(fileReader.result.toString());
        if (this.profileService.validate(input)) {
          // schema looks good so go on and delete old config if it exists
          await this.profileService.import(<Profile>input);
          this.snackBar.open('Profile has been imported.');
          this.uploading = false;
          this.profile = await this.profileService.get();
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

  showProductInfo(event, product: Product) {
    event.stopPropagation();
    this.dialog.open(ProductInfoComponent, {
      data: {product},
    });
  }

  showCapabilityInfo(event, capability: Capability) {
    event.stopPropagation();
    this.dialog.open(CapabilityInfoComponent, {
      data: {capability},
    });
  }

}
