import { Component } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  resultado: number = null;
  n1: number = null;
  n2: number = null;
  operacion: number = null;
  error: boolean;
  changeOperacion() {
    this.mostrar();
  }

  mostrar() {
    if (this.operacion == null) {
      console.error("seleccione operacion");
    } else {
      if (this.n1 != null && this.n2 != null) {
        this.error = false;
      } else {
        this.resultado = null;
        this.error = true;
        return;
      }

      if (this.operacion == 1) {
        this.resultado = this.n1 + this.n2;
      } else if (this.operacion == 2) {
        this.resultado = this.n1 - this.n2;
      } else if (this.operacion == 3) {
        this.resultado = this.n1 * this.n2;
      } else if (this.operacion == 4) {
        this.resultado = this.n1 / this.n2;
      }
    }
  }
}
