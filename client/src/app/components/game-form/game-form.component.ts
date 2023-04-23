import { Component, OnInit, HostBinding } from '@angular/core';

import { GamesService } from 'src/app/services/games.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Game } from 'src/app/models/Game';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  game: Game = {
    id_game: 0,
    title: '',
    description: '',
    image: '',
    created_at: new Date()
  }

  edit: boolean = false;

  constructor(private gameService: GamesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const param = this.activatedRoute.snapshot.params

    if (param['id']) {
      this.gameService.getGame(param['id'])
        .subscribe(
          res => {
            console.log(res);
            this.game = res;
            this.edit = true;
          },
          err => console.log(err)
        )
    }

  }

  updateGame() {
    delete this.game.created_at;
    const id_: any = this.game.id_game;
    this.gameService.updateGame(id_, this.game)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/games']);
        },
        err => console.error(err)
      )
  }

  saveNewGame() {
    delete this.game.created_at;
    delete this.game.id_game;
    this.gameService.saveGame(this.game)
      .subscribe(
        res=>{
          this.router.navigate(['/games']);
        },
        err=> console.error(err)
      )
    this.router.navigate(['/games']);
  }

}
