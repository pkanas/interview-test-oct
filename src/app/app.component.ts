import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ang-test-oct';
constructor(
  private router: Router,
  private translate: TranslateService) {
  this.translate.setDefaultLang('en');
}
  goTo(type:string) {
    this.router.navigate(['/', type]);
  }

  changeLanguage(lang: any) {
    this.translate.use(lang.target.value);
  }
  
}
