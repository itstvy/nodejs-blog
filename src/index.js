const morgan = require("morgan");
const { engine } = require("express-handlebars");
const methodOverride = require("method-override");
const express = require("express");
const cors = require('cors');
const path = require("path");
const app = express();
const port = 4000;

app.use(cors());

const SortMiddleware = require("./app/middlewares/SortMiddleware");

const route = require("./routes");
const db = require("./config/db");

//Connect to DB
db.connect();

//Static file hỗ trợ tải file css, js, img, font, ...
app.use(express.static(path.join(__dirname, "public")));

//Middleware xử lý dữ liệu từ dạng form submit lên server
app.use(
  express.urlencoded({
    extended: true,
  })
);
//Middleware xử lý khi bạn sử dụng code js để submit (ví dụ XML, JSON, Axios)
app.use(express.json());

//
app.use(methodOverride("_method")); //dùng để gửi dữ liệu từ form lên server vì form chỉ hỗ trợ GET và POST
//nên cần dùng methodOverride để gửi dữ liệu từ form lên server bằng PUT, DELETE
//ví dụ: <form action="/courses/{{course._id}}?_method=DELETE" method="POST">
//nếu không có methodOverride thì form chỉ nhận GET và POST

//Custom middleware
app.use(SortMiddleware);

//HTTP logger
// app.use(morgan("combined"));

//Template engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b, // để sử dụng hàm sum trong file store-courses.hbs để đếm số lượng khóa học theo thứ tựs
      sortable: (field, sort) => {

        const sortType = field === sort.column ? sort.type : "default";

        const icons = {
          default: "oi oi-elevator",
          asc: "oi oi-sort-ascending",
          desc: "oi oi-sort-descending",
        };

        const types = {
          default: "desc",
          asc: "desc",
          desc: "asc",

        };

        const icon = icons[sortType];
        const type = types[sortType];

          return `<a href="?_sort&column=${field}&type=${type}">
          <span class="${icon}"></span>
        </a>`;
      },
    }, 
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views")); //là gì? Đây là nơi chứa các file view của ứng dụng


// Routes init - Khởi tạo tuyến đường
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
