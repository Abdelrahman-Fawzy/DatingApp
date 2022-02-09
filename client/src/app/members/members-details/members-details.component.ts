import { Member } from './../../models/member';
import { MemberService } from './../../services/member.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery-9';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-members-details',
  templateUrl: './members-details.component.html',
  styleUrls: ['./members-details.component.scss']
})
export class MembersDetailsComponent implements OnInit {
  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private memberService: MemberService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember();

    this.galleryOptions = [
      {
          width: '600px',
          height: '400px',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide,
          imageSwipe : true,
          imageInfinityMove : true,
          thumbnailsArrows : true ,
          thumbnailsSwipe : true,
          previewArrows : true,
          previewSwipe : true,
          previewFullscreen : true,
          previewCloseOnClick : true,
          previewCloseOnEsc : true,
          arrowPrevIcon : 'fa fa-arrow-circle-left',
          arrowNextIcon : 'fa fa-arrow-circle-right'
      },
      // max-width 800
      {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
      },
      // max-width 400
      {
          breakpoint: 400,
          preview: false
      }
    ];
  }

  getImages():NgxGalleryImage[] {
    let Images = [];
    for (const photo of this.member.photos) {
      Images.push(
        {
          small: photo?.url,
          medium: photo?.url,
          big: photo?.url
        }
      )
    }
    return Images;
  }

  loadMember() {
    this.memberService.getMemberByUserName(this.router.snapshot.paramMap.get('username')).subscribe(member => {
      this.member = member
      this.galleryImages = this.getImages();
      }
    );
  }
}
