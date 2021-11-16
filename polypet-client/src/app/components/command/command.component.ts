import { Component, OnInit } from '@angular/core';
import { CommandService } from 'src/app/services/command.service';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent implements OnInit {

  constructor(private commandService:CommandService) { }

  allClientCommandID:Promise<string[]>|undefined

  ngOnInit(): void {
    this.allClientCommandID = this.getAllCommandID();
  }

  async getAllCommandID():Promise<string[]>{
    return this.commandService.getAllCommandID().catch((err)=>{
      console.error(err);
      return []
    })
  }

}
