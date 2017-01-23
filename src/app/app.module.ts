import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddItemPage } from '../pages/add-item-page/add-item-page';
import { ItemDetailPage } from '../pages/item-detail-page/item-detail-page';
import { EditItemPage } from '../pages/edit-item-page/edit-item-page';
import { Storage } from '@ionic/storage';
import { Data } from '../providers/data';
 
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddItemPage,
    ItemDetailPage,
    EditItemPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddItemPage,
    ItemDetailPage,
    EditItemPage
  ],
  providers: [Storage, Data]
})
export class AppModule {}
