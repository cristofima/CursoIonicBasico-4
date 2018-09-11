import { NgModule } from "@angular/core";
import { LowerPipe } from "./lower.pipe";
import { SeparatorMilesPipe } from "./separator-miles.pipe";
@NgModule({
  declarations: [LowerPipe, SeparatorMilesPipe],
  imports: [],
  exports: [LowerPipe, SeparatorMilesPipe]
})
export class PipesModule {}
