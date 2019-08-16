import {Component, OnInit} from '@angular/core';
import {IdentityService} from './identity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private authenticated: boolean;
  constructor(private identityService: IdentityService) {}

  ngOnInit(): void {
    this.authenticated = this.identityService.check();
    this.identityService.changed.subscribe(auth => {
      this.authenticated = auth;
    });
  }
}
