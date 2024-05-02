const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-updater");
const mongooseDelete = require("mongoose-delete");

const Course = new Schema(
  {
    name: { type: String, required: true},
    description: { type: String },
    image: { type: String },
    videoId: { type: String}, 
    level: { type: String },
    slug: { type: String, slug: "name", unique: true },
    // unique: true để đảm bảo không bị trùng slug khi tạo mới dữ liệu trong database
  },
  {
    timestamps: true, // để làm gì? để tự tạo ra 2 trường createdAt và updatedAt
  }
);

// Add plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});
//Tại sao phải sử dụng mongoose-delete?
// Để thực hiện chức năng soft delete, tức là khi xóa một bản ghi thì nó không xóa thật sự mà chỉ đánh dấu là đã xóa.
// Tại sao phải sử dụng plugin mongoose-delete?
// Vì plugin này đã viết sẵn chức năng soft delete, chỉ cần cài đặt và sử dụng là được.

// overrideMethods: "all" để ghi đè tất cả các phương thức của mongoose
// deletedAt: true để tạo thêm trường deletedAt trong database

module.exports = mongoose.model("Course", Course);

// hàm này là để chuyển object từ database về dạng object của javascript
// Path: src/util/mongoose.js
// module.exports = {
//   multipleMongooseToObject: function (mongooses) {
//     return mongooses.map((mongoose) => mongoose.toObject());
//   },
//   mongooseToObject: function (mongoose) {
//     return mongoose ? mongoose.toObject() : mongoose;
//   },
// };
