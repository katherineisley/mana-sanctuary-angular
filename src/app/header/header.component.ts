import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  ngOnInit() {
    $('.menu-icon').click(function () {
      console.log("clicked");
      $('.burger-menu').toggle();
    });
  }
}
