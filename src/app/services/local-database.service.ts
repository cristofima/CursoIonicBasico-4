import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LocalDatabaseService {
  private database: SQLiteObject;
  /*
    Un BehaviorSubject es un Observable que además 
    tiene la capacidad de emitir eventos
  */
  private dbReady = new BehaviorSubject<boolean>(false);

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
        let script =
          "create table if not exists activities(rowid INTEGER PRIMARY KEY," +
          "title text not null, description text not null, date numeric not null," +
          "priority text not null)";
        this.database
          .executeSql(script, [])
          .then(() => {
            this.dbReady.next(true);
          })
          .catch(e => {
            console.error(e);
          });
      })
      .catch(e => console.error(e));
  }

  private isReady(): Promise<any> {
    return new Promise((resolve, reject) => {
      //if dbReady is true, resolve
      if (this.dbReady.getValue()) {
        resolve();
      }
      //otherwise, wait to resolve until dbReady returns true
      else {
        this.dbReady.subscribe(ready => {
          if (ready) {
            resolve();
          }
        });
      }
    });
  }

  public getList() {
    return this.isReady().then(() => {
      return this.database
        .executeSql("select * from activities order by date", [])
        .then(res => {
          let activities: any[] = [];
          for (var i = 0; i < res.rows.length; i++) {
            activities.push({
              rowid: res.rows.item(i).rowid,
              title: res.rows.item(i).title,
              description: res.rows.item(i).description,
              date: res.rows.item(i).date,
              priority: res.rows.item(i).priority
            });
          }
          return activities;
        })
        .catch(e => {
          return e;
        });
    });
  }

  public addData(
    title: string,
    description: string,
    date: number,
    priority: string
  ) {
    return this.isReady().then(() => {
      return this.database
        .executeSql("insert into activities values(NULL,?,?,?,?)", [
          title,
          description,
          date,
          priority
        ])
        .then(res => {
          if (res.insertId) {
            return true;
          } else {
            return false;
          }
        })
        .catch(e => {
          return e;
        });
    });
  }
}
