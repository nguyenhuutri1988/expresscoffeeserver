var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');
const { Pool } = require('pg')

//MySQL connection
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'network'`1a
// });


var connectionString =
    'postgres://lbrsclmcfwkqcn:f6c3900d0dda5a04eeea472dc8bdf6433e3bfa41e29a6f369e02009fb55ea39b@ec2-52-3-130-181.compute-1.amazonaws.com:5432/d1egjuesjikjrp'

app.use(cors());


//app.use(function(req, res, next) {
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  next();
//});

// connection.connect(function (err) {
//     if (err) throw err
//     console.log('You are now connected...')
// })

const pool = new Pool({ connectionString,ssl: {
    rejectUnauthorized: false
  } })

module.exports = { pool }

//Body-parser configuration
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

//Create node.js Server
// var server = app.listen(3000, "127.0.0.1", function () {

//     var host = server.address().address
//     var port = server.address().port

//     console.log("Example app listening at http://%s:%s", host, port)

// });

var server = app.listen(process.env.PORT || 3001);


//authen
app.post('/authen/', function (req, res) {
    var postData = req.body;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

    pool.query('select quyenhan from nguoidung where dienthoai = ($1) and matkhau = ($2)', postData, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

//input user
app.post('/user/', function (req, res) {
    var postData = req.body;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

    pool.query('INSERT INTO nguoidung VALUES ($1, $2, $3, $4)', postData, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

//get all user
app.get('/getalluser/', function (req, res) {
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
    console.log(req);
    pool.query('select dienthoai, hoten, quyenhan from nguoidung', function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

//update user role
app.put('/updaterole/', function (req, res) {
    var postData = req.body;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

    pool.query('UPDATE user SET role=($1) where phone=($2)', postData, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});


//create order
app.post('/createorder/', function (req, res) {
    var postData = req.body;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

    pool.query('INSERT INTO user VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)', postData, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

//get all order
app.get('/getallorder/', function (req, res) {
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
    console.log(req);
    pool.query('select madonhang, tennguoigui, diachinguoigui, sdtnguoigui, fbnguoigui, tennguoinhan, sdtnguoinhan, diachinguoinhan, phuongthucthanhtoan, thuho, tennhanvien, trongluong, giatien, phuthu, tongtien, dathanhtoan, ngaythang from donhang', function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

//get all order
app.post('/getorder/', function (req, res) {
    var postData = req.body;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
    console.log(req);
    pool.query('select madonhang, tennguoigui, diachinguoigui, sdtnguoigui, fbnguoigui, tennguoinhan, sdtnguoinhan, diachinguoinhan, phuongthucthanhtoan, thuho, tennhanvien, trongluong, giatien, phuthu, tongtien, dathanhtoan, ngaythang from donhang where madonhang = $1', postData, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

//rest api to authen
// app.get('/admin', function (req, res) {
    
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
//     console.log(req);
// 	pool.query('select username,password from admin', function (error, results, fields) {
//         if (error) throw error;
//         res.end(JSON.stringify(results.rows));
//     });
// });

// //rest api to authen
// app.get('/detail/', function (req, res) {
    
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
//     console.log(req);
// 	pool.query('select * from mobilephone ORDER BY no, summary, price', function (error, results, fields) {
//         if (error) throw error;
//         res.end(JSON.stringify(results.rows));
//     });
// });


// app.get('/detail/:id', function (req, res) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

//     pool.query('select * FROM mobilephone WHERE id = $1', [req.params.id], function (error, results) {
//         if (error) throw error;
//         res.end(JSON.stringify(results.rows));
//     });
// });

// app.post('/device/', function (req, res) {
//     var postData = req.body;
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

//     pool.query('INSERT INTO mobilephone VALUES ($1, $2, $3, $4, $5,$6, $7, $8, $9, $10, $11, DEFAULT,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23)', postData, function (error, results, fields) {
//         if (error) throw error;
//         res.end(JSON.stringify(results.rows));
//     });
// });

// app.delete('/device/:id', function (req, res) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

//     pool.query('DELETE FROM mobilephone WHERE id = $1', [req.params.id], function (error, results) {
//         if (error) throw error;
//         res.end(JSON.stringify(results.rows));
//     });
// });

// app.put('/updateDevice/', function (req, res) {
//     var postData = req.body;
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

//     pool.query('UPDATE mobilephone SET category=($1),summary=($2),details=($3),price=($4),image1=($5),image2=($6),video=($7),image3=($8),image4=($9),image5=($10),image6=($11),name=($12),remarks=($13),guarantee=($14),email=($15),active=($16),image7=($17),image8=($18),image9=($19),image10=($20),no=($21),giamoi=($22) where id=($23)', postData, function (error, results, fields) {
//         if (error) throw error;
//         res.end(JSON.stringify(results.rows));
//     });
// });

// app.put('/updateDeviceStatus/', function (req, res) {
//     var postData = req.body;
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

//     pool.query('UPDATE mobilephone SET active=($1) where id=($2)', postData, function (error, results, fields) {
//         if (error) throw error;
//         res.end(JSON.stringify(results.rows));
//     });
// });

// app.put('/updateDeviceNew/', function (req, res) {
//     var postData = req.body;
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

//     pool.query('UPDATE mobilephone SET new=($1) where id=($2)', postData, function (error, results, fields) {
//         if (error) throw error;
//         res.end(JSON.stringify(results.rows));
//     });
// });

// //rest api to authen
// app.get('/detailLess/', function (req, res) {
    
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
//     console.log(req);
// 	pool.query('select id, category, name, image1, price, active, summary, new, giamoi from mobilephone ORDER BY summary ', function (error, results, fields) {
//         if (error) throw error;
//         res.end(JSON.stringify(results.rows));
//     });
// });

// app.get('/ipad/', function (req, res) {
    
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
//     console.log(req);
// 	pool.query("select id, category, name, image1, price, active, summary, new, giamoi from mobilephone where category = 'ipad_new' ORDER BY no,  price ", function (error, results, fields) {
//         if (error) throw error;
//         res.end(JSON.stringify(results.rows));
//     });
// });

// app.get('/applewatch/', function (req, res) {
    
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
//     console.log(req);
// 	pool.query("select id, category, name, image1, price, active, summary, new, giamoi from mobilephone  where category = 'apple_watch_new' ORDER BY no,  price ", function (error, results, fields) {
//         if (error) throw error;
//         res.end(JSON.stringify(results.rows));
//     });
// });

// app.get('/macbook/', function (req, res) {
    
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
//     console.log(req);
// 	pool.query("select id, category, name, image1, price, active, summary, new, giamoi from mobilephone where category = 'macbook_new' ORDER BY no, price ", function (error, results, fields) {
//         if (error) throw error;
//         res.end(JSON.stringify(results.rows));
//     });
// });

// app.get('/macbookpro/', function (req, res) {
    
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
//     console.log(req);
// 	pool.query("select id, category, name, image1, price, active, summary, new, giamoi from mobilephone where category = 'macbookpro' ORDER BY no, price ", function (error, results, fields) {
//         if (error) throw error;
//         res.end(JSON.stringify(results.rows));
//     });
// });

// app.get('/airpod/', function (req, res) {
    
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
//     console.log(req);
// 	pool.query("select id, category, name, image1, price, active, summary, new, giamoi from mobilephone where category = 'air_pods_new' ORDER BY no,  price", function (error, results, fields) {
//         if (error) throw error;
//         res.end(JSON.stringify(results.rows));
//     });
// });

// app.get('/simdata/', function (req, res) {
    
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
//     console.log(req);
// 	pool.query("select id, category, name, image1, price, active, summary, new, giamoi from mobilephone where category = 'sim_data_wifi_new' ORDER BY no, price", function (error, results, fields) {
//         if (error) throw error;
//         res.end(JSON.stringify(results.rows));
//     });
// });

// app.get('/dienthoaicu/', function (req, res) {
    
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
//     console.log(req);
// 	pool.query("select id, category, name, image1, price, active, summary, new, giamoi  from mobilephone where category = 'dienthoaicu' ORDER BY no, price", function (error, results, fields) {
//         if (error) throw error;
//         res.end(JSON.stringify(results.rows));
//     });
// });

// app.get('/iphone/', function (req, res) {
    
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
//     console.log(req);
// 	pool.query("select id, category, name, image1, price, active, summary, new, giamoi  from mobilephone where category = 'iphone_new' ORDER BY no, price", function (error, results, fields) {
//         if (error) throw error;
//         res.end(JSON.stringify(results.rows));
//     });
// });

// app.get('/android/', function (req, res) {
    
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
//     console.log(req);
// 	pool.query("select id, category, name, image1, price, active, summary, new, giamoi  from mobilephone where category = 'android' ORDER BY no, price", function (error, results, fields) {
//         if (error) throw error;
//         res.end(JSON.stringify(results.rows));
//     });
// });

// app.get('/phukien/', function (req, res) {
    
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
//     console.log(req);
// 	pool.query("select id, category, name, image1, price, active, summary, new, giamoi  from mobilephone where category = 'phukien' ORDER BY no, price", function (error, results, fields) {
//         if (error) throw error;
//         res.end(JSON.stringify(results.rows));
//     });
// });

// app.get('/sanphamkhac/', function (req, res) {
    
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
//     console.log(req);
// 	pool.query("select id, category, name, image1, price, active, summary, new, giamoi  from mobilephone where category = 'sanphamkhac' ORDER BY no, price", function (error, results, fields) {
//         if (error) throw error;
//         res.end(JSON.stringify(results.rows));
//     });
// });

