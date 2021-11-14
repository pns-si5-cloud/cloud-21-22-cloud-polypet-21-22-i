import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-command-list',
  templateUrl: './command-list.component.html',
  styleUrls: ['./command-list.component.scss']
})
export class CommandListComponent implements OnInit {

  @Input()
  commandList!:string[]|null

  constructor() { }

  ngOnInit(): void {
  }

}
