import { Component, OnInit, HostBinding } from '@angular/core';

import { GamesService } from 'src/app/services/games.service';
import { Game } from 'src/app/models/Game';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit{

  @HostBinding('class') classes = 'row';

  games: any = [];
  default_image = 'http://localhost:4200/assets/img/no-image.jpg';

  constructor(private gamesService: GamesService){}

  ngOnInit(){
    this.getGames();
  }

  getGames(){
    this.gamesService.getGames().subscribe(
      res => {
        this.games = res;
        console.log(this.games);
      },
      err => console.error(err)
    )
  }

  deleteGame(id: string){
    this.gamesService.deleteGame(id).subscribe(
      res=>{
        console.log(res);
        this.getGames();
      },
      err => console.error(err)
    )
  }

}
