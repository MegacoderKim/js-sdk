import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
// import * as $ from "jquery";
import {Observable} from "rxjs/Observable";
import {SnackbarService} from "../../shared/snackbar/snackbar.service";
import {InvitationListComponent} from "../invitation-list/invitation-list.component";
import {HttpClient} from "@angular/common/http";
// import style from "../../../assets/intTelInput.css";
// import '../../../../node_modules/intl-tel-input/build/js/'
// require("!style-loader!css-loader!../../../assets/intTelInput.css");
// require("!style-loader!css-loader!../../../../node_modules/intl-tel-input/build/css/intTelInput.css");
// var int = require('intl-tel-input');
// console.log(int, "int");
@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.less']
})
export class InviteComponent implements OnInit, AfterViewInit {
  invite: FormGroup = new FormGroup({
    phone: new FormControl('', Validators.required)
  });
  done: boolean;
  loading: boolean;
  countries: any[];
  country;
  @ViewChild(InvitationListComponent) invitationList: InvitationListComponent;
  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    // this.countries = $.fn.intlTelInput.getCountryData();
    // this.country = this.countries[0]
  }

  ngAfterViewInit() {
    // var countryData = $.fn.intlTelInput.getCountryData();
    // let addressDropdown = $("#address-country");
    // let telInput = $("#phone");
    // $.each(countryData, function(i, country) {
    //   addressDropdown.append($("<option></option>").attr("value", country.iso2).text(country.name));
    // });
    // let opt = {
    //   // allowDropdown: true,
    //   // utilsScript: '../../../assets/utils.js',
    //   initialCountry: "auto",
    //   geoIpLookup: function(callback) {
    //     $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
    //       var countryCode = (resp && resp.country) ? resp.country : "";
    //       callback(countryCode);
    //     });
    //   },
    //   customPlaceholder: function(selectedCountryPlaceholder, selectedCountryData) {
    //     return "e.g. " + selectedCountryPlaceholder;
    //   }
    // };
    // $.fn.intlTelInput.loadUtils('https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.1.0/js/utils.js');
    // $("#phone").intlTelInput(opt);
    // var initialCountry = telInput.intlTelInput("getSelectedCountryData").iso2;
    // addressDropdown.val(initialCountry);
    // addressDropdown.change(function() {
    //   $("#phone").intlTelInput("setCountry", $(this).val());
    // });
  }

  changeCountry(country) {
    this.country = country;
    // $("#phone").intlTelInput("setCountry", country.iso2);
  }

  submit() {
    // var value = $("#phone").intlTelInput("getNumber");
    // var valid = $("#phone").intlTelInput("isValidNumber");
    // var error = $("#phone").intlTelInput("getValidationError");
    // var countryData = $("#phone").intlTelInput("getSelectedCountryData");
    // console.log(valid, error, value, countryData);
    // if(!countryData) {
    //   this.snackbarService.displayErrorToast("Please select a country");
    //   return false;
    // }
    // if(valid) {
    //   this.loading = true;
    //   this.http.post('app/user_invites/', {phone: value}).catch(() => Observable.of(null)).subscribe((data) => {
    //     this.loading = false;
    //     if(data) {
    //       this.snackbarService.displaySuccessToast("Invitation sent succesfully");
    //       this.invitationList.getInvites();
    //     } else {
    //       this.snackbarService.displayErrorToast("Something went wrong. Please try again")
    //     }
    //
    //     console.log(data);
    //
    //   })
    // } else {
    //   this.snackbarService.displayErrorToast("Enter valid number")
    // }
  }

}
