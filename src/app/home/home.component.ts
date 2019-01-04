import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {

  ngOnInit(): void {
    console.log('home')
  }

  ngOnDestroy(): void {
  }
}
