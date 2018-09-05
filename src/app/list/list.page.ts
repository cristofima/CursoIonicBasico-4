import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { LoadingController, AlertController } from "@ionic/angular";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms";

@Component({
  selector: "app-list",
  templateUrl: "./list.page.html",
  styleUrls: ["./list.page.scss"]
})
export class ListPage implements OnInit {
  ciudades: any[] = [];
  nombreControl: AbstractControl;
  habitantesControl: AbstractControl;

  ciudadesForm: FormGroup;

  constructor(
    private storage: Storage,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private formBuilder: FormBuilder
  ) {}

  async ngOnInit() {
    this.initForm();
    let loading = await this.presentLoading();
    await loading.present();
    this.storage.get("listado").then(res => {
      if (res != null) {
        this.ciudades = res;
      }
      loading.dismiss();
    });
  }

  private initForm() {
    this.ciudadesForm = this.formBuilder.group({
      nombre: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ])
      ],
      habitantes: [
        "",
        Validators.compose([
          Validators.required,
          Validators.min(100),
          Validators.max(5000000)
        ])
      ]
    });
    this.nombreControl = this.ciudadesForm.controls["nombre"];
    this.habitantesControl = this.ciudadesForm.controls["habitantes"];
  }

  guardar() {
    if (
      this.nombreControl.value != null &&
      this.habitantesControl.value != null
    ) {
      this.ciudades.push({
        nombre: this.nombreControl.value,
        habitantes: this.habitantesControl.value
      });
      this.storage.set("listado", this.ciudades);
      this.presentAlert("Valores insertados");
      this.ciudadesForm.get("nombre").setValue(null);
      this.habitantesControl.setValue(null);
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

  private async presentLoading() {
    const loading = await this.loadingController.create({
      message: "Cargando"
    });
    return loading;
  }

  async confirmDelete(ciudad, index: number) {
    const alert = await this.alertController.create({
      header: "Confirmar",
      message: "Está seguro de eliminar la ciudad " + ciudad.nombre,
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: blah => {}
        },
        {
          text: "Aceptar",
          role: "OK",
          handler: blah => {
            this.ciudades.splice(index, 1);
            this.storage.set("listado", this.ciudades);
            this.presentAlert("Ciudad eliminada");
          }
        }
      ]
    });
    await alert.present();
  }
}
