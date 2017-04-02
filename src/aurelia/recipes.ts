import { DataService } from './services/dataService';
import { UserService } from './services/userService';
import { autoinject } from 'aurelia-framework';
import { IRecipe } from './../shared/models/IRecipe';

@autoinject
export class Recipes {

    recipes: IRecipe[] = [];
    selectedRecipe: IRecipe;

    constructor(private dataService: DataService, private userService: UserService) {

    }

    activate() {
        return this.getAllRecipes();
    }

    hasRecipePermission(recipe) {
        return recipe.uploaderId == this.userService.user._id;
    }

    getAllRecipes() {
        return this.dataService.getRecipes()
            .then((recipes) => this.recipes = recipes);
    }

    selectRecipe(recipe: IRecipe) {
        this.selectedRecipe = recipe;
    }

    createRecipe() {
        this.selectedRecipe._id = null;
        this.dataService.createRecipe(this.selectedRecipe)
            .then(() => this.getAllRecipes());
    }

    updateRecipe() {
        this.dataService.updateRecipe(this.selectedRecipe)
            .then(() => this.getAllRecipes());
    }

    deleteRecipe(recipeId: string) {
        this.dataService.deleteRecipe(recipeId)
            .then(() => this.getAllRecipes());
    }
}