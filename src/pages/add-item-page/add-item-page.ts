import { Component } from '@angular/core';
import { NavController, ViewController, AlertController } from 'ionic-angular';
import * as moment from 'moment';

/*
  Generated class for the AddItemPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-add-item-page',
  templateUrl: 'add-item-page.html'
})
export class AddItemPage {

  title;
  description;
  date;
  time;
  dateTime;
  priority;

  constructor(public navCtrl: NavController, public view: ViewController, private alertCtrl: AlertController) {}

  ionViewDidLoad() {
  	this.priority = "usual";
    console.log('ionViewDidLoad AddItemPagePage');
  }

  dateAlert() {
	  let alert = this.alertCtrl.create({
	    title: `No, you can't do that!`,
	    subTitle: 'You can create todo item without date and time. But if you want to have date or time, you have to have them both.',
	    buttons: ['OK']
	  });
	  alert.present();
	}

  titleAlert() {
	  let alert = this.alertCtrl.create({
	    title: `No, no, no!`,
	    subTitle: `You can't create todo item without title.`,
	    buttons: ['OK']
	  });
	  alert.present();
	}

  saveItem(){
  	if(!this.date || !this.time)
  	{
  		this.dateTime="";
  	}
  	else
  	{
  		this.dateTime = moment(this.date + " " + this.time, "YYYY-MM-DD HH:mm").format("(DD.MM.YYYY) HH:mm");
  	}
  	
  	if((!this.date && this.time) || (!this.time && this.date))
  	{
  		this.dateAlert();
  	}
  	else
  	{
  		if(!this.title || this.title.trim() == "")
  		{
  			this.titleAlert();
  		}
  		else
  		{
  			console.log('dateTime', this.dateTime);
	  	  	console.log('date', this.date);
	  	  	console.log('Time', this.time);
	  	 
	  	    let newItem = {
	  	      title: this.title,
	  	      description: this.description,
	  	      dateTime: this.dateTime,
	  	      priority: this.priority
	  	    };
	  	 
	  	    this.view.dismiss(newItem);
  		}
  		
  	}
 
  }

  clearDate(){
  	this.date = "";
  }
  clearTime(){
  	this.time = "";
  }
 
  close(){
    this.view.dismiss();
  }

}
