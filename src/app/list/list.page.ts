import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { LoadingController, AlertController } from "@ionic/angular";

@Component({
  selector: "app-list",
  templateUrl: "./list.page.html",
  styleUrls: ["./list.page.scss"]
})
export class ListPage implements OnInit {
  ciudades: any[] = [];
  nombre: string = null;
  habitantes: number = null;

  constructor(
    private storage: Storage,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.storage.get("listado").then(res => {
      if (res != null) {
        this.ciudades = res;
      }
    });
  }

  guardar() {
    if (this.nombre != null && this.habitantes != null) {
      this.ciudades.push({
        nombre: this.nombre,
        habitantes: this.habitantes
      });
      this.storage.set("listado", this.ciudades);
      this.nombre = null;
      this.habitantes = null;
      this.presentAlert("Valores insertados");
    } else {
      this.presentAlert("Inserte ambos valores");
    }
  }

  async presentAlert(texto: string) {
    const alert = await this.alertController.create({
      header: "Alerta",
      message: texto,
      buttons: ["OK"]
    });
    await alert.present();
  }
}
