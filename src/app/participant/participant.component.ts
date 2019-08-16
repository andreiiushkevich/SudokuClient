import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IdentityService} from '../identity.service';
import {WinnerService} from '../winner.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ngbd-modal-content',
  template: `
      <div class="modal-header">
          <h4 class="modal-title">Game over!</h4>
          <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
              <span aria-hidden="true">&times;</span>
          </button>
      </div>
      <div class="modal-body">
          <p>{{winner}}!</p>
      </div>
      <div class="modal-footer">
          <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
      </div>
  `
})
export class NgbdModalContent {
  @Input() winner;
  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit, OnDestroy {

  constructor(private identityService: IdentityService, private winnerService: WinnerService, private modalService: NgbModal) { }
  editable = true;
  name: string;
  subscription: Subscription;

  ngOnInit(): void {
     this.subscription = this.winnerService.someOneWin().subscribe(winner => {
      const modalRef = this.modalService.open(NgbdModalContent);
      const id = this.identityService.getId();
      if (id === winner.Id) {
        modalRef.componentInstance.winner = 'You Win!';
      } else {
        modalRef.componentInstance.winner = `${winner.Name} Win!`;
      }
    });
    this.editable = !this.identityService.check();
    this.name = this.identityService.getUser();
  }

  onClick() {
    if (this.editable) {
      this.identityService.setUser(this.name);
    } else {
      this.identityService.removeUser();
    }
    this.editable = !this.editable;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
