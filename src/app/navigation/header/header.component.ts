import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
  @Input() isHandset: boolean = false;
  @Output() sidenavToggle = new EventEmitter<void>();
  @Output() openRegisterDialog = new EventEmitter<void>();


  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  ngAfterViewInit(): void {

  }
}
