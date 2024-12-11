import { Component, OnInit } from '@angular/core';
import { InvitationService } from '../invitation.service';
import { Invitation } from "../invitation.model";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  name: string = '';
  successMessage: string = '';
  invitationLink: string = '';
  invitations: Invitation[] = [];

  // Example values for the new properties
  fixedDate: string = 'Some time in January';
  venue: string = 'Gorkhe Niwas';
  phoneNumber: string = 'You know it';

  constructor(private invitationService: InvitationService) {}

  ngOnInit() {
    this.invitationService.getAllInvitations().subscribe((invitations) => {
      // No need to handle id here, it's already included in the Invitation object
      this.invitations = invitations;
    });
  }

  addInvitation() {
    const invitation: Omit<Invitation, 'id'> = {
      name: this.name,
      imageSrc: 'assets/images/shanta.JPG',
      thumbnailSrc: 'assets/images/holiday.JPEG',
      fixedDate: this.fixedDate,
      venue: this.venue,
      phoneNumber: this.phoneNumber,
      invitationLink: '' // This will be set after adding to the database
    };

    this.invitationService.addInvitation(invitation).then(({ id, link }) => {
      this.successMessage = 'Invitation successfully added!';
      this.invitationLink = link;
      // Create the full invitation object with the returned id and link
      const fullInvitation: Invitation = {
        ...invitation,
        id: id,
        invitationLink: link
      };
      this.invitations.push(fullInvitation);
      this.name = '';
    }).catch(error => {
      console.error('Error adding invitation:', error);
      this.successMessage = 'Error adding invitation. Please try again.';
    });
  }
}
