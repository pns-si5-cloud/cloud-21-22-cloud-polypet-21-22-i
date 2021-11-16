import { Component, OnInit } from '@angular/core';
import { CommandService } from 'src/app/services/command.service';

@Component({
  selector: 'app-panel-partner',
  templateUrl: './panel-partner.component.html',
  styleUrls: ['./panel-partner.component.scss']
})
export class PanelPartnerComponent implements OnInit {

  constructor(private commandService:CommandService) { }

  allCommandID:Promise<string[]>|undefined

  ngOnInit(): void {
    this.allCommandID = this.getAllCommandID();
  }

  async getAllCommandID():Promise<string[]>{
    return this.commandService.getAllCommandID().catch((err)=>{
      console.error(err);
      return []
    })
  }

}
