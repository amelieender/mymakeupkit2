import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Makeup } from '../shared/makeup';
import { MakeupStoreService } from '../shared/makeup-store.service';

@Component({
  selector: 'ae-makeup-create',
  templateUrl: './makeup-create.component.html',
  styleUrls: ['./makeup-create.component.css']
})
export class MakeupCreateComponent implements OnInit {
  makeup!: Makeup;
  createMode: boolean = false;
  submitLabel: string = 'Create';

  constructor(private ms: MakeupStoreService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ms.create(this.makeup);
        this.router.navigateByUrl('/makeup');
      }
    });
  }

  create(makeup: Makeup): void {
    console.log(makeup);
    this.makeup = makeup;
    this.openDialog();
    // this.ms.create(this.makeup);
  }
}

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'confirm-dialog.html',
})
export class ConfirmDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialog>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

}