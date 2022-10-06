import { Component, OnInit } from '@angular/core';
import { faStar,
  faMarker,
  faAt,
  faUser,
  faFlag,
  faMapMarked,
  faUserGraduate,
  faDollarSign} from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  faStar = faStar;
  constructor() { }

  ngOnInit(): void {
  }

}
