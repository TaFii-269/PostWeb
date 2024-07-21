class TaskController {
    index(req, res) {
        res.render('task');
    }

    show(req, res) {
        res.render('task-detail');
    }
}

export default new TaskController();