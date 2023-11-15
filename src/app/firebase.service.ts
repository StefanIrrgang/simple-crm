// firebase.service.ts
import { Injectable } from '@angular/core';
import { Firestore, collection, onSnapshot, QuerySnapshot, DocumentData, DocumentReference, addDoc, updateDoc, deleteDoc, getDocs, doc, setDoc, collectionData, query } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firestore: Firestore;

  constructor(firestore: Firestore) {
    this.firestore = firestore;
  }

  getRef(ColID: string) {
    return collection(this.firestore, ColID);
  }

  getSingelDocRef(ColID: string, DocID: string) {
    return doc(collection(this.firestore, ColID), DocID);
  }

  subList(ColID: string): Observable<any[]> {
    const dataSubject = new Subject<any[]>();

    const unsubscribe = onSnapshot(collection(this.firestore, ColID), (querySnapshot: QuerySnapshot<DocumentData>) => {
      const list: any[] = [];
      querySnapshot.forEach((doc) => {
        list.push(doc.data());
      });
      dataSubject.next(list);
    });

    // Unsubscribe-Funktion zurückgeben
    return new Observable((observer) => {
      observer.next([]); // Initialen leeren Zustand senden
      const subscription = dataSubject.subscribe(observer);
      
      return () => {
        // Unsubscribe-Funktion
        unsubscribe();
        subscription.unsubscribe();
      };
    });
  }

  // async addElementFDB(ColID: string, item: {}) {
  //   const docRef = doc(this.getRef(ColID));
  
  //   await setDoc(docRef, item)
  //     .catch((err) => {
  //       console.error(err);
  //     })
  //     .then(() => {
  //       console.log('Document written with ID: ', docRef.id);
  //     });
  // }

  async addElementFDB(ColID: string, item: {}): Promise<string> {
    const docRef = doc(this.getRef(ColID));
    
    try {
      await setDoc(docRef, item);
      console.log('Document written with ID: ', docRef.id);
      return docRef.id;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  

  async updateElementFDB(ColID: string, DocID: string, item: {}): Promise<void> {
    await updateDoc(this.getSingelDocRef(ColID, DocID), item);
  }

  async deleteElementFDB(ColID: string, DocID: string): Promise<void> {
    await deleteDoc(this.getSingelDocRef(ColID, DocID)).catch((err) => {
      console.error(err);
      throw err;
    });
  }

  async getSubColDocs(ColID: string, DocID: string, SubColID: string): Promise<void> {
    const querySnapshot = await getDocs(
      collection(this.firestore, ColID, DocID, SubColID)
    );
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
    });
  }

  getUsersWithSum(): Observable<any[]> {
    const q = query(collection(this.firestore, 'users'));

    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }

  updateUserSum(userId: string, newSum: number): Promise<void> {
    const userRef = doc(this.firestore, 'users', userId);

    return updateDoc(userRef, { summe: newSum });
  }
}
