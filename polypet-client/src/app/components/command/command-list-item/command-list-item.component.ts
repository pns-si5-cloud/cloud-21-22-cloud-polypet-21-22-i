import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-command-list-item',
  templateUrl: './command-list-item.component.html',
  styleUrls: ['./command-list-item.component.scss']
})
export class CommandListItemComponent implements OnInit {

  @Input()
  public commandID!:string;

  constructor() { }

  ngOnInit(): void {
  }

}
