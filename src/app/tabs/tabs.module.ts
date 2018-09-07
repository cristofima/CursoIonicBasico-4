import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { TabsPageRoutingModule } from "./tabs.router.module";

import { TabsPage } from "./tabs.page";
import { ListActivitiesPageModule } from "../crud/list-activities/list-activities.module";
import { ListPageModule } from "../list/list.module";
import { HomePageModule } from "../home/home.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    HomePageModule,
    ListPageModule,
    ListActivitiesPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
