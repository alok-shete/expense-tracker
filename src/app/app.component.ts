import { Component, HostListener, ElementRef } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ExpenseTracker';
  isShow: boolean;
  topPosToStartShowing = 100;
  status: boolean = true;
  isConnected = true;
  constructor(private ConnectionService: ConnectionService) {
    this.ConnectionService.monitor().subscribe((isConnected) => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = true;
      } else {
        this.status = false;
      }
      //alert(this.status);
    });
  }
  @HostListener('window:scroll')
  checkScroll() {
    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  // TODO: Cross browsing
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
