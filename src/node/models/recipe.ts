import * as mongoose from 'mongoose';
import {IRecipe} from './../../shared/models/IRecipe';

interface IRecipeModel extends IRecipe, mongoose.Document {
}

let recipeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    instructions: {type: String, required: true},
    uploadDate: {type: Date, default: Date.now },
    uploader: {type : mongoose.Schema.Types.ObjectId, ref : 'User', required: true}
});

export let Recipe = mongoose.model<IRecipeModel>("Recipe", recipeSchema);