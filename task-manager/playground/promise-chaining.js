require('../src/db/mongoose');
const User = require('../src/models/user');

// 5e4eb875cb44732964ffc42f

// User.findByIdAndUpdate('5e4eb8ccf2afe94fb4acd2c5', {age: 1}).then((user) => {
//     console.log(user);
//     return User.countDocuments({age: 1})
// }).then((users) => {
//     console.log(users);
// }).catch((e) => {
//    console.log(e); 
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age: age})
    const count = await User.countDocuments({age: age})
    return count
}

updateAgeAndCount('5e4eb8ccf2afe94fb4acd2c5', 2).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
})