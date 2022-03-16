import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.page.html',
  styleUrls: ['./topics.page.scss'],
})
export class TopicsPage implements OnInit {

  topics = [1,2,3,4,5,6];

  constructor() { }

  ngOnInit() {
  }

}
