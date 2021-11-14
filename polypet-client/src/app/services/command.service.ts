import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommandStatus } from '../classes/command-status';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  constructor(private http: HttpClient) { }

  getAllCommandID():Promise<string[]>{
    return firstValueFrom(this.http.get<string[]>(environment.command_url.COMMAND_GET_ALL_COMMAND_ID));
  }

  getCommand(commandID:string):Promise<CommandStatus>{
    return firstValueFrom(this.http.get<CommandStatus>(environment.command_url.COMMAND_GET_COMMAND_STATUS,{params:{commandID}}).pipe(map((data: object)=>CommandStatus.fromJSON(data))));
  }
}
