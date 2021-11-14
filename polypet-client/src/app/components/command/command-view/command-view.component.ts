import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommandStatus } from 'src/app/classes/command-status';
import { CommandService } from 'src/app/services/command.service';

@Component({
  selector: 'app-command-view',
  templateUrl: './command-view.component.html',
  styleUrls: ['./command-view.component.scss']
})
export class CommandViewComponent implements OnInit {

  command:CommandStatus = new CommandStatus([],"Loading","Loading",0,"Loading",new Date(),null);
  commandID:any;

  constructor(private route: ActivatedRoute,
    private commandService:CommandService) { }

  async ngOnInit() {
    await this.route.params.subscribe(async params => {
      this.commandID = params['id'];
      this.command =  await this.commandService.getCommand(this.commandID);
      console.log(this.command)
   });
  }

}
