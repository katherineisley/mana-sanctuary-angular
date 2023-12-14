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
      const display = $('.burger-menu').css('display');
      $('.burger-menu').css('display', display === 'none' ? 'flex' : 'none');
      $(this).toggleClass('active');
    });

    $('.main-menu_mobile .menu-item, .main-menu_mobile .home').click(function () {
      $('.burger-menu').hide();
    });
  }
}
