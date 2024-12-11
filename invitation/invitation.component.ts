import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ActivatedRoute} from "@angular/router";
import {InvitationService} from "../invitation.service";
import {Invitation} from "../invitation.model";

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit {
  name: string = '';
  fixedDate: string = '19 January 2025';
  venue: string = 'Gorkhe Niwas \n';
  phoneNumber: string = 'You know it';
  imageSrc: string = 'assets/images/holiday.JPEG';
  thumbnailSrc: string = 'assets/images/thumbnail.jpg';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private invitationService: InvitationService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Get dynamic route parameter
    if (id) {
      this.invitationService.getInvitation(id).subscribe(
        (invitation: Invitation) => {
          if (invitation) {
            this.name = invitation.name; // Only name is dynamically updated
          }
        },
        error => {
          this.errorMessage = error.message; // Set error message on failure
        }
      );
    }
  }
}


