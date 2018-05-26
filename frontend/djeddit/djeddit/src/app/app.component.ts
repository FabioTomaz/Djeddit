import { Component } from '@angular/core';
import fontawesome from '@fortawesome/fontawesome';
import faRegular from '@fortawesome/fontawesome-free-regular/';
import faSolid from '@fortawesome/fontawesome-free-solid/';
import faBrand from '@fortawesome/fontawesome-free-brands/';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Home';
  constructor(){
    fontawesome.library.add(faRegular);
    fontawesome.library.add(faSolid);
    fontawesome.library.add(faBrand);
  }
}
