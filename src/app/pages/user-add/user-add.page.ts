import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { UserServiceService } from '../../services/user-service.service';
import { ToastController } from '@ionic/angular';

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
    private userService: UserServiceService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
  }

  buscaCEP() {
      this.userService.pegaCEP(this.user.cep).subscribe(
        res => {
          console.log(res);
          if (res.erro) {
            this.presentToast("CEP não localizado!");
          } else {
            //this.user = res;
            //this.user.cep = res.cep;
            this.user.logradouro = res.logradouro;
            this.user.localidade = res.localidade;
            this.user.bairro = res.bairro;
            this.user.uf = res.uf;
          }
        },
        error => {
          console.error(error)
        }
      )
    }
  

  salvar() {
    try {
      this.userService.add(this.user).then(
        res =>{
          console.log('Dados Salvos firebase...', this.user);
        },
        erro =>{
          console.log('Erro...',erro);
        }
      )
      ;
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

  async presentToast(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000
    });
    toast.present();
  }

}
