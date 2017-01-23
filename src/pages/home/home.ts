import { Component } from '@angular/core';
import { NavController, ModalController, Events } from 'ionic-angular';
import { AddItemPage } from '../add-item-page/add-item-page';
import { ItemDetailPage } from '../item-detail-page/item-detail-page';
import { Data } from '../../providers/data';
import * as moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	public items = [];
  public viewList = [];
  public maxId = 0;
  public priority="all";

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public dataService: Data, public events: Events) {
    
    this.dataService.getData().then((todos) => {
 
      if(todos){
        this.items = JSON.parse(todos);
        let maxId = this.maxId;  
        this.items.forEach(function (item) {
          item.chosen = false;
          if(item.id > maxId)
          {
             maxId = item.id; 
          }
        });
        this.viewList = this.items;
        this.maxId = maxId;
        console.log("itemList", this.items);
      }
 
    });

    this.events.subscribe('deleteItem', id => { 
    this.deleteItem(id);
    });

    this.events.subscribe('editItem', item => {
    console.log("edit Item"); 
    this.editItem(item);
    });

    this.events.subscribe('markDone', id => {
    this.markDone(id);
    });

  }

  ionViewDidLoad () {

  }
  addItem () {

      let addModal = this.modalCtrl.create(AddItemPage);

      addModal.onDidDismiss((item) => {
 
          if(item){
            if(item.title){
              this.maxId += 1; 
              item.id = this.maxId;
              this.saveItem(item);
            }
          }
 
    });
 
    addModal.present();
  }

  saveItem(item){
    this.items.push(item);
    // this.viewList.push(item);
    this.dataService.save(this.items);
  }
 
 viewItem(item){
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

deleteItem(id) {
   for (let i = 0; i < this.items.length; i++)
   {
     if(this.items[i].id == id)
       {this.items.splice(i, 1);}
   }
   for(let j = 0; j < this.viewList.length; j++)
   {
     if(this.viewList[j].id == id)
       {this.viewList.splice(j, 1);}
   }
   this.dataService.save(this.items);
 }

 editItem(item){
   for (let i = 0; i < this.items.length; i++)
   {
     if(this.items[i].id == item.id)
       {
          this.items[i] = item; 
       }
   }

   for(let j = 0; j < this.viewList.length; j++)
   {
     if(this.viewList[j].id == item.id)
       {
         this.viewList[j] = item;
       }
   }
   this.sortByPriority();
   this.dataService.save(this.items);

 }

 markDone(id) {

   for (let i = 0; i < this.items.length; i++)
   {
     if(this.items[i].id == id)
       {this.items[i].done = true;}
   }

   for(let j = 0; j < this.viewList.length; j++)
   {
     if(this.viewList[j].id == id)
       {
         this.viewList[j].done = true;
       }
   }

   this.dataService.save(this.items);

 }

 sortByPriority(){
   let priority = this.priority;
   if(priority == "all"){
     this.viewList = this.items;
   }
   else{
     let list = this.items;
     this.viewList = list.filter(function(item){
     return item.priority == priority;
   });
   }
 }

 hasExpired(item) {
   let now = moment();
   if(moment(item.dateTime,'(DD.MM.YYYY) HH:mm').isBefore(now))
   {
     console.log(now);
     return true;
   }
   return false;
 }

  }
