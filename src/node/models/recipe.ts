import * as mongoose from 'mongoose';

interface IRecipeModel extends mongoose.Document {
    name: string,
    instructions: string,
    uploadDate: Date,
    uploaderId: number
}

let recipeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    instructions: {type: String, required: true},
    uploadDate: {type: Date, default: Date.now },
    uploaderId: {type : mongoose.Schema.Types.ObjectId, ref : 'User', required: true}
});

export let Recipe = mongoose.model<IRecipeModel>("Recipe", recipeSchema);