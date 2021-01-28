import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.page.html',
  styleUrls: ['./user-add.page.scss'],
})
export class UserAddPage implements OnInit {

  user : User = new User();

  constructor() { }

  ngOnInit() {
  }

  salvar(){
    console.log('Dados Salvos...', this.user);
  }

}
