import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TabsPage } from "./tabs.page";
import { HomePage } from "../home/home.page";
import { ListPage } from "../list/list.page";
import { ListActivitiesPage } from "../crud/list-activities/list-activities.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "",
        redirectTo: "/tabs/(home:home)",
        pathMatch: "full"
      },
      {
        path: "home",
        outlet: "home",
        component: HomePage
      },
      {
        path: "list",
        outlet: "list",
        component: ListPage
      },
      {
        path: "activities",
        outlet: "activities",
        component: ListActivitiesPage
      }
    ]
  },
  {
    path: "",
    redirectTo: "/tabs/(home:home)",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
