import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number

  user: User = new User()
  idUser: number = environment.id

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService
  ) { }

  ngOnInit(){

    if(environment.token == ''){
     this.router.navigate(['/entrar'])
    }
    this.getAllTemas()
    this.findAllPostagem()
  }

  findUserById(){
    this.authService.getByIdUser(this.idUser).subscribe((resp) => {
      this.user = resp;
    })
  }

  findAllPostagem(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp;
    })
  }

  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp;
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp;
    })
  }

  publicar(){
    this.postagem.tema = new Tema()
    this.postagem.tema.id = this.idTema
    this.postagem.usuario = new User()
    this.postagem.usuario.id = this.idUser

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp;
      alert('Postagem realizada com sucesso!');
      this.postagem = new Postagem();
      this.findAllPostagem();
    })
  }

  printar(){
    console.log(this.postagem.texto)
    console.log(environment.token)
  }
  
  
}
