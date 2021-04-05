import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Makeup } from '../shared/makeup';
import { MakeupStoreService } from '../shared/makeup-store.service';
import { formatDate } from '@angular/common';

export interface DialogData {
  title: string;
}

@Component({
  selector: 'ae-makeup-details',
  templateUrl: './makeup-details.component.html',
  styleUrls: ['./makeup-details.component.css']
})
export class MakeupDetailsComponent implements OnInit {
  makeup: Makeup | undefined;
  editMode: boolean = false;
  submitLabel: string = 'Update';

  constructor(private ms: MakeupStoreService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.getMakeupItem(id);
      }
    });
  }

  get openedDisplayString(): string {
    return this.makeup?.opened ? formatDate(this.makeup.opened, 'MM-dd-yyyy', 'en') : '';
  }

  getMakeupItem(id: number): void {
    this.ms.getSingle(id).subscribe(
      (response: Makeup) => this.makeup = response,
      error => console.log(error)
      );
  }

  getDurabilityString(): string {
    return this.makeup?.durability ? `${this.makeup?.durability} months` : '';
  }

  toggleEditMode(toggle: boolean) {
    this.editMode = toggle;
  }

  update(makeup: Makeup): void {
    this.makeup = makeup;
    this.openDialog({ title: 'Confirm Update'}, () => {
      if (this.makeup) {
        this.ms.update(this.makeup.id, this.makeup);
        this.router.navigateByUrl('/makeup');
      }
    });
  }

  deleteOne(makeup: Makeup): void {
    console.log(makeup);
    this.makeup = makeup;
    this.openDialog({ title: 'Confirm Deletion'}, () => {
      if (this.makeup) {
        this.ms.deleteOne(this.makeup.id);
        this.router.navigateByUrl('/makeup');
      }
    });
  }

  openDialog(data: DialogData, callback: Function): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '250px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        callback();
      }
    });
  }

}

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'confirm-dialog.html',
})
export class ConfirmDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

}
