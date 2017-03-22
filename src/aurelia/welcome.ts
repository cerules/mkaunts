 import {computedFrom} from 'aurelia-framework';

export class Welcome {
  public heading = 'Welcome to the Aurelia Navigation App!';
  public firstName = 'John';
  public lastName = 'Doe';
  private previousValue = this.fullName;

  @computedFrom('firstName', 'lastName')
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  public submit() {
    this.previousValue = this.fullName;
    alert(`Welcome, ${this.fullName}!`);
  }

  public canDeactivate() {
    if (this.fullName !== this.previousValue) {
      return confirm('Are you sure you want to leave?');
    }
  }
}

export class UpperValueConverter {
  public toView(value) {
    return value && value.toUpperCase();
  }
}
