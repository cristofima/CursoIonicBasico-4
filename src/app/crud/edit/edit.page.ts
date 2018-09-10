import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.page.html",
  styleUrls: ["./edit.page.scss"]
})
export class EditPage implements OnInit {
  id: any;

  constructor(private router: Router, private actRoute: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.actRoute.snapshot.paramMap.get("id");
  }
}
