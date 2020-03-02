require('../src/db/mongoose');
const Task = require('../src/models/task');

// 5e4ea8b932875751b4f00d07



const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})
    return count
}

deleteTaskAndCount('5e4ea41b76daf24c0415fff3').then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
})