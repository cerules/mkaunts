import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  public router: Router;

  public configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'login'], name: 'login',      moduleId: 'login',      nav: true, title: 'Login' },
      { route: ['recipes'], name: 'recipes',      moduleId: 'recipes',      nav: true, title: 'Recipes' }
    ]);

    this.router = router;
  }
}
