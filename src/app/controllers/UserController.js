class UserController {

    // get page /user/create
    create(req, res) {
        res.render('user');
    }
    // GET /user/create/id
    show(req, res) {
        console.log(req.params.id);
        res.send('show id: ' + req.params.id);
    }

    index(req, res) {
        res.render('user');
    }
}

export default new UserController();