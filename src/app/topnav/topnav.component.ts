import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {
  @Output() sideMenuToogled = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onSideMenuToogled(){
    this.sideMenuToogled.emit();
  }

}
