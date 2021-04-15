const express = require('express')
const mongoose = require('mongoose')
const app = express();
var bodyParser = require('body-parser')
const user = require('./user')
const profile = require('./profile')

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/courses', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('connected to MongoDB');
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/user', (req, res) => {
    console.log(req.body)
    user.create(req.body).then(
        dt => {
            // res.json({data: dt})
            createprofile(dt._id, req.body.age)
        }
    ).catch(err => {
        console.log(err)
    })
})

function createprofile(userid, age) {
    const body = {
        age: age,
        use_id: userid
    }
    console.log(body)
    profile.create(body).then(dt => {
        console.log(dt)
        return dt
    }).catch(err => {
        console.log(err)
    })
}

//Agregate
app.get('/user', (req, res) => {
    user.aggregate([
        {
            $lookup: {
                from: "profiles", // collection to join
                localField: "_id",//field from the input documents
                foreignField: "use_id",//field from the documents of the "from" collection
                as: "profiles"// output array field
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                profiles: 1
            }
        }
    ]).exec((err, resp) => {
        if (err) {
            res.send(err)
        }
        if (resp) {
            res.send({
                data: resp
            })
        }
    })
})

app.listen(4000, () => console.log('Server running on port 4000'));