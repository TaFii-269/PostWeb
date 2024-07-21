class Post {
    constructor(_id, title, image, content,date ,author) {
        this._id = _id;
        this.title = title;
        this.image = image;
        this.content = content;
        this.date = date;
        this.author = author;
    }

    // insert a new post
    async save(db) {
        try {
            // const collection = db.collection('posts');
            // const result = await collection.insertOne(this);
            const result = await db.collection('posts').insertOne(
                this
            )
            return result;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    static async findByEmail(db, email) {
        try {
            const result = await db.collection('posts').findOne({email: email});
            return result ? new Post(result._id, result.title, result.image, result.content, result.date, result.author) : null;
        } catch (err) {
            console.error(`Error: ${err}`);
            throw err;
        }
    }

    // get all posts
    static async findAll(db) {
        try {
            const docs = await db.collection('posts').find({}).toArray();
            return docs.map(doc => new Post(doc._id, doc.title,doc.image, doc.content,doc.date, doc.author));
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    // get a post based on id
    static async findById(db, id) {
        try {
            // const collection = db.collection('posts');
            const doc = await db.collection('posts').findOne({ _id: id });
            return doc;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    static async findByAuthor(db, author) {
        try {
            // console.log(author);
            const doc = await db.collection('posts').find({ author: author }).toArray();
            return doc;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    // update a post based on id
    async update(db, id) {
        try {
            // const collection = db.collection('posts');
            const result = await db.collection('posts').updateOne(
                { _id: id },
                { $set: { title: this.title, image:this.image, content: this.content, date:this.date } }
            )
            return result;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    // delete a post based on id
    async del(db, id) {
        try {
            // const collection = db.collection('posts');
            const result = await db.collection('posts').deleteOne({ _id: id });
            return result;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

export default Post;