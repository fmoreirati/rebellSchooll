import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class UserServiceService {
  constructor(
    private http: HttpClient,
    private firedb:AngularFirestore
  ) { }

  pegaCEP(cep: string) {
    var local: string = "https://viacep.com.br/ws/" + cep + "/json";
    return this.http.get<User>(local);
  }

  add(usuario:User){
    return this.firedb.collection<User>("usuarios").add(usuario)
  }
}
