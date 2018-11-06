import {Component, EventEmitter, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import { PolicyService } from '../../services/policy.service';
import { isNullOrUndefined } from 'util';

/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./dailog.component.css']
})
export class DialogComponent {
  constructor(public dialog: MatDialog, private policyService: PolicyService) {}

  @Output() agree: EventEmitter <boolean> = new EventEmitter<boolean>();

  openDialog() {
    const dialogRef = this.dialog.open(DialogTanplateComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      console.log('just assigned: ' + result);
      this.agree.emit(result);
    });
  }
}

@Component({
  selector: 'app-dialog-tamplate',
  templateUrl: 'dialogTamplate.component.html',
})
export class DialogTanplateComponent {}
