import {Component, Inject, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  validators = [this.starts];

  public errorMessages = {
     'is_valid_email': 'Ingresa un correo válido',
                        
  };

  emails_items:any[];
  
  constructor(
    public dialogRef: MatDialogRef<SendEmailComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) {
    this.emails_items = this.data.emails
    console.log(this.emails_items);
  }

  ngOnInit(): void {
  }

  starts(control:FormControl):any{
    let emailRegex = 
      /^(?:[^><()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
      
    if (
      !emailRegex.test(control.value)
    ) {
      return {
         'is_valid_email': true
      };
    }
    return null;
  }

  onActionClick(confirm:boolean):void{
    let emails = "";
    if( confirm ){
    for (const key in this.emails_items) {
      let value = "";
       value = ( typeof this.emails_items[key] === 'object' )
       ? this.emails_items[key].display
       : this.emails_items[key];
       emails += `${value};`;
    }
    }
    let data = {
      emails
    }
    console.log(emails);
     this.dialogRef.close(
      {
        confirm,
        data
      }
    );
  }




}
