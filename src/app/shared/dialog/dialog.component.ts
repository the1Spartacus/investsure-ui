import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';

/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./dailog.component.css']
})
export class DialogComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogTanplateComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'app-dialog-tamplate',
  templateUrl: 'dialogTamplate.component.html',
})
export class DialogTanplateComponent {}
