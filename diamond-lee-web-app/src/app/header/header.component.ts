import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Diamond Lee';
  subTitle = 'Sr. Consultant and Software Developer'

  constructor() { }

  ngOnInit(): void {
  }
}
