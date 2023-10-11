import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Company } from 'src/models/company.class';
import { DialogAddCompanyComponent } from '../dialog-add-company/dialog-add-company.component';
import { Firestore, getFirestore, collection, query, onSnapshot, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {

  firestore: Firestore = inject(Firestore);

  company = new Company();
  companies!: Observable<Company[]>;
  allCompanies: Company[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    const firestore = getFirestore();

    const q = query(collection(firestore, 'companies'));

    // Änderungen in Echtzeit abonnieren
    this.companies = collectionData(q, { idField: 'id' }) as Observable<Company[]>;

    onSnapshot(q, (querySnapshot) => {
      // console.log('Received changes from DB ', querySnapshot);
    
      this.allCompanies = [];
    
      querySnapshot.forEach((doc) => {
        const companyData = doc.data();
        const companyWithId = new Company({ id: doc.id, ...companyData });
        this.allCompanies.push(companyWithId);
      });
    
      // console.log('All companies:', this.allCompanies);
    });
  }


  openDialog() {
    this.dialog.open(DialogAddCompanyComponent);
  }

}
