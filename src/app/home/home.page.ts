import { Component } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  socket:any
  public myUserId: string;
  chats = [];
  chat_input:string;

  constructor() {
    if(this.myUserId==null){
      this.myUserId=Date.now().toString();
    }
    this.socket=io('http://localhost:3000');
    this.Receive();

  }

  send(msg) {
    
    if(msg!='') {
     // Assign user typed message along with generated user id
     let saltedMsg = this.myUserId + "#" + msg; 
     // Push the message through socket

     this.socket.emit('message', saltedMsg);
    }
    this.chat_input='';
  }

  Receive(){
    // Socket receiving method 
    this.socket.on('message', (msg) => {

      // separate the salted message with "#" tag 
      let saletdMsgArr = msg.split('#');
      var item= {};
      // check the sender id and change the style class
      if(saletdMsgArr[0] == this.myUserId){
         item = { "styleClass":"chat-message right", "msgStr":saletdMsgArr[1] };
      }
      else{
         item= { "styleClass":"chat-message left", "msgStr":saletdMsgArr[1] };
      }
      // push the bind object to array
      // Final chats array will iterate in the view  
      this.chats.push(item);
    });
 }


}
