import { Component, OnInit } from "@angular/core";

import { NavParams, ModalController } from "@ionic/angular";

import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.page.html",
  styleUrls: ["./edit.page.scss"]
})
export class EditPage implements OnInit {
  nombreControl: AbstractControl;
  habitantesControl: AbstractControl;

  ciudadesForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) {}

  ngOnInit() {
    this.initForm();
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

  regresar() {
    this.modalCtrl.dismiss();
  }

  guardar() {}
}
