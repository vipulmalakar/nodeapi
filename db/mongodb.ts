import mongoose from "mongoose";

export default () => {
    mongoose.connect("")
        .then(() => {
            console.log("Connected to Monogodb")
        }).catch(err => {
            console.log(err);
        })
}