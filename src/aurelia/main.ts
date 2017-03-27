import 'bootstrap';
import {Aurelia} from 'aurelia-framework';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .feature('custom-elements');

  aurelia.start().then(() => aurelia.setRoot('shell'));
}
