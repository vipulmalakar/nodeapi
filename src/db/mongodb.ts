import mongoose from "mongoose";

export default () => {
    mongoose.connect("mongodb+srv://codewithreact1:EL7qFZ9Vn4xiTCB0@cluster0.rauek8p.mongodb.net/todo-app?retryWrites=true&w=majority")
        .then(() => {
            console.log("Connected to Monogodb")
        }).catch(err => {
            console.log(err);
        })
}