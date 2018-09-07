import { Component, OnInit } from "@angular/core";
import { AlertController, NavController } from "@ionic/angular";
import { LocalDatabaseService } from "../../services/local-database.service";

@Component({
  selector: "app-create",
  templateUrl: "./create.page.html",
  styleUrls: ["./create.page.scss"]
})
export class CreatePage implements OnInit {
  title: string;
  description: string;
  date: any;
  priority: string;

  constructor(
    private localDB: LocalDatabaseService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    // De esta forma se especifica la fecha en el componente datetime
    // cuando hagan la edició, donde '1522613700000'
    // son los milisegundos que se recuperan de la tabla
    //this.date = new Date(1522613700000).toISOString();
  }

  private formatDate(): number {
    let year = this.date.year.value;
    let month = this.date.month.value - 1;
    let day = this.date.day.value;
    let hour = this.date.hour.value;
    let minute = this.date.minute.value;
    let dateISO = new Date(year, month, day, hour, minute).toISOString();
    return new Date(dateISO).getTime();
  }

  guardar() {
    if (
      this.title != null &&
      this.description != null &&
      this.date != null &&
      this.priority != null
    ) {
      this.localDB
        .addData(this.title, this.description, this.formatDate(), this.priority)
        .then(res => {
          if (res) {
            this.navCtrl.goBack();
          }
        })
        .catch(e => {
          this.presentAlert(e);
        });
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
