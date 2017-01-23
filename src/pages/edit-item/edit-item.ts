import { Component } from '@angular/core';
import { ViewController, NavParams, Events, ModalController, NavController } from 'ionic-angular';

/*
  Generated class for the EditItem page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-item',
  templateUrl: 'edit-item.html'
})
export class EditItemPage {

  constructor(public navParams: NavParams, public view: ViewController, public events: Events, public modalCtrl: ModalController, public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditItemPage');
  }

  close(){

  }
}
