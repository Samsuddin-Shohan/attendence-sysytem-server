const {Schema,model}=require('mongoose');

const profileSchema = new Schema({
    name: String
   
   
})

const profiles = model('profiles',profileSchema);

module.exports = profiles;