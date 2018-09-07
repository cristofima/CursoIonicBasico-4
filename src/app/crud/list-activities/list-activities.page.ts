import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-list-activities",
  templateUrl: "./list-activities.page.html",
  styleUrls: ["./list-activities.page.scss"]
})
export class ListActivitiesPage implements OnInit {
  listado: any[] = [];

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    this.listado.push({
      titulo: "Test",
      prioridad: "low",
      fecha: 1528520404812,
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dui risus, sagittis nec metus et, congue iaculis massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. "
    });
    this.listado.push({
      titulo: "Test 2",
      prioridad: "high",
      fecha: 1539117000000,
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dui risus, sagittis nec metus et, congue iaculis massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. "
    });
    this.listado.push({
      titulo: "Test 3",
      prioridad: "half",
      fecha: 1520698500000,
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dui risus, sagittis nec metus et, congue iaculis massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. "
    });
  }

  goCreate() {
    this.navCtrl.navigateForward("/create");
  }
}
