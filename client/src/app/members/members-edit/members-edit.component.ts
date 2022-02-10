import { ToastrService } from 'ngx-toastr';
import { MemberService } from './../../services/member.service';
import { Member } from './../../models/member';
import { AccountService } from './../../services/account.service';
import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/User';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-members-edit',
  templateUrl: './members-edit.component.html',
  styleUrls: ['./members-edit.component.scss']
})
export class MembersEditComponent implements OnInit {
  member: Member;
  user: User;
  @ViewChild("editForm") editForm: NgForm;
  @HostListener('window:beforeunload', ['$event']) unloadWindow($event: any) {
    if(this.editForm.dirty) {
      $event.returnValue = true
    }

  }

  constructor(private accountService: AccountService, private memberService: MemberService, private toastr: ToastrService) {
    this.accountService.currentUser$.subscribe(user => {
      this.user = user

    })
  }

  ngOnInit(): void {
    this.loadMember()
  }

  loadMember() {
    this.memberService.getMemberByUserName(this.user.userName).subscribe(member => {
      this.member = member
      console.log(member);
    })
  }

  updateMember() {
    this.memberService.updateMember(this.member).subscribe(() => {
      this.toastr.success("Profile Updated Successfully")
      this.editForm.reset(this.member)
    })
  }

}
