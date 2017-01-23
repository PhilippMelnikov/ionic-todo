import { Component } from '@angular/core';
import { ViewController, NavParams, Events, ModalController, NavController } from 'ionic-angular';
import { EditItemPage } from '../edit-item-page/edit-item-page';
 
@Component({
  selector: 'page-item-detail-page',
  templateUrl: 'item-detail-page.html'

})
export class ItemDetailPage {
  item = {
    id: "",
    title: "",
    description: "",
    dateTime: "",
    done: false,
    priority: 'usual'
  };
  onEdit = false;

 
  constructor(public navParams: NavParams, public view: ViewController, public events: Events, public modalCtrl: ModalController, public navCtrl: NavController){
 
  }
 
  ionViewDidLoad() {
    this.onEdit = false;
    this.item.id = this.navParams.get('item').id;
    this.item.title = this.navParams.get('item').title;
    this.item.description = this.navParams.get('item').description;
    this.item.dateTime = this.navParams.get('item').dateTime;
    this.item.done = this.navParams.get('item').done;
    this.item.priority = this.navParams.get('item').priority;

  }

  deleteItem() {
 
    this.events.publish('deleteItem', this.item.id);
    this.close();
  }

  triggerEdit(item) {
    this.events.publish('editItem', item);
  }

  editItem() {
    let addModal = this.modalCtrl.create(EditItemPage, {item: this.item});

      addModal.onDidDismiss((item) => {
 
          if(item){
            if(item.title){
              this.item.title = item.title;
              this.item.description = item.description;
              this.item.dateTime = item.dateTime;
              this.item.priority = item.priority;
              this.triggerEdit(this.item);
              this.close();
            }
          }
 
    });
 
    addModal.present();

  }

  markDone() {
    this.events.publish('markDone', this.item.id);
    this.close()
  }

 close(){
    this.view.dismiss();
  }
}