import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { LocalDatabaseService } from "../../services/local-database.service";

@Component({
  selector: "app-list-activities",
  templateUrl: "./list-activities.page.html",
  styleUrls: ["./list-activities.page.scss"]
})
export class ListActivitiesPage implements OnInit {
  listado: any = [];

  constructor(
    public router: Router,
    private localDB: LocalDatabaseService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.getList();
  }

  doRefresh(event) {
    this.getList(event);
  }

  goCreate() {
    this.router.navigate(["create"]);
  }

  edit(id: number) {
    this.router.navigate(["edit/" + id]);
  }

  private getList(event?) {
    this.localDB
      .getList()
      .then(res => {
        this.listado = res;
        this.stopRefresh(event);
      })
      .catch(e => {
        this.stopRefresh(event);
        this.presentAlert(e);
      });
  }

  private stopRefresh(event) {
    if (event) {
      event.target.complete();
    }
  }

  async presentAlert(texto: string) {
    const alert = await this.alertCtrl.create({
      header: "Alerta",
      message: texto,
      buttons: ["OK"]
    });
    await alert.present();
  }
}
