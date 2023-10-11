import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collectionData, collection, doc, setDoc, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { Company } from 'src/models/company.class';

@Component({
  selector: 'app-dialog-add-company',
  templateUrl: './dialog-add-company.component.html',
  styleUrls: ['./dialog-add-company.component.scss']
})
export class DialogAddCompanyComponent implements OnInit {

  firestore: Firestore = inject(Firestore);

  company = new Company();
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogAddCompanyComponent>) { }
  ngOnInit(): void {

  }

  saveCompany() {
    this.loading = true;
    // console.log('Current company is ', this.company);

    const companyJson = this.company.toJSON();

    const companiesCollection = collection(this.firestore, 'companies');

    addDoc(companiesCollection, companyJson)
      .then((result) => {
        // console.log('Adding company finished', result);

        setTimeout(() => {
          this.company = new Company();
          this.loading = false;
        }, 200);

        this.dialogRef.close();
      })
      .catch((error) => {
        // console.error('Error adding user', error);
      });
  }

}
