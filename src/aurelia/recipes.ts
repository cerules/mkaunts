import {DataService} from './services/dataService';
import {autoinject} from 'aurelia-framework';

@autoinject
export class Recipes {

    recipes: any[] = [];

    constructor(private dataService: DataService) {

    }

    activate() {
        return this.dataService.getRecipes()
            .then((recipes) => this.recipes = recipes);
    }
}