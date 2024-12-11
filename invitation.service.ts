import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Invitation } from "./invitation.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  private baseUrl = 'https://new-year-invitation-b28a7.web.app';

  constructor(private firestore: AngularFirestore) { }

  // Modified addInvitation to return the generated document ID
  addInvitation(invitation: Omit<Invitation, 'id'>): Promise<{ id: string, link: string }> {
    return this.firestore.collection('invitations').add(invitation).then(docRef => {
      const shareableLink = `${this.baseUrl}/invitation/${docRef.id}`;
      return { id: docRef.id, link: shareableLink };
    });
  }

  // In InvitationService
  getInvitation(id: string): Observable<Invitation> {
    return this.firestore.collection<Invitation>('invitations').doc(id).snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as Omit<Invitation, 'id'>;
        return { id: a.payload.id, ...data, invitationLink: `/invitation/${a.payload.id}` };
      })
    );
  }

  // In InvitationService
  getAllInvitations(): Observable<Invitation[]> {
    return this.firestore.collection<Invitation>('invitations').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Omit<Invitation, 'id'>;
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }
}
