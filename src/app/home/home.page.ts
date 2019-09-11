import { Component, OnInit } from '@angular/core';
import { concat } from 'lodash';
import { StarWarService } from '../services/star-war.service';
import { People } from '../models/people';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  peoples: People[] = []
  hasNext: boolean = false
  page: number = 1

  private infiniteScrollComponent: any;

  constructor(
    private starWarService: StarWarService
  ) {}

  ngOnInit(){
    this.starWarService.getPeople().subscribe(result => {
      this.hasNext = result.hasNext
      this.peoples =  concat(this.peoples, result.results)
      this.notifyScrollComplete()
    })
    this.starWarService.loadPeople({page: this.page})
  }

  load(event){
    this.page ++;
    this.starWarService.loadPeople({page: this.page})
    this.infiniteScrollComponent = event.target
  }

  notifyScrollComplete(){
    if (this.infiniteScrollComponent) {
      this.infiniteScrollComponent.complete()
    }
  }
}
