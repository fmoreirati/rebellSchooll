import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.page.html',
  styleUrls: ['./user-add.page.scss'],
})

export class UserAddPage implements OnInit {

  user: User = new User();

  constructor(
    private storage: Storage,
    public alertController: AlertController,
    private userService: UserServiceService
  ) { }

  ngOnInit() {
  }

  buscaCEP() {
    this.userService.pegaCEP(this.user.cep).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.error(error)
      }
    )
  }

  salvar() {
    try {
      this.storage.set('nome', this.user.nome);
      this.storage.set('email', this.user.email);
      this.storage.set('senha', this.user.senha);
      console.log('Dados Salvos...', this.user);
      this.presentAlert();
    } catch (error) {
      console.error("Erro ao salvar.", error);
    }

  }


  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      //subHeader: 'Subtitle',
      message: 'Usuário cadastrado.',
      buttons: ['OK']
    });

    await alert.present();
  }


}
