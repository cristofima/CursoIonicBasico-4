import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";

@Injectable({
  providedIn: "root"
})
export class LocalDatabaseService {
  private database: SQLiteObject;

  constructor(private sqlite: SQLite, private platform: Platform) {
    this.platform.ready().then(() => {
      this.initDB();
    });
  }

  private initDB() {
    this.sqlite
      .create({
        name: "data.db",
        location: "default"
      })
      .then((db: SQLiteObject) => {
        this.database = db;
        this.database
          .executeSql("create table danceMoves(name VARCHAR(32))", [])
          .then(() => console.log("Executed SQL"))
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }
}
