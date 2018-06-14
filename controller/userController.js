"use strict";
var Product = require('../Models/Product'),
    Chat = require('../Models/Chat'),
    Account = require('../Models/Account'),
    About = require('../Models/About'),
    passport = require('passport'),
    Product_Type = require('../Models/Product_Type'),
    auth = require('../middeware/auth'),
    nodemailer = require('nodemailer'),
    multer = require('multer'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt-nodejs'),
    mongoose = require('mongoose');


module.exports = (app) => {

var _base64,_base64d = [];
var _base64e,_base64em;
var count = 0;
// //Set luu
var storage = multer.diskStorage({
  filename: (req, file, cb) => {
		let imgArr = file.fieldname + "-" + Date.now() + file.originalname;
		cb(null, imgArr);
		}
});

//Init Upload
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 6 * 1024 * 1024,
    files: 6,
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
});

function checkFileType(file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return cb(new Error('Vui lòng chỉ chọn hình ảnh!'), false);
  }
  cb(null, true);
}

var cloudinary = require('cloudinary');
  cloudinary.config({
    cloud_name: 'dyc9q65wr',
    api_key: '828212854621378',
    api_secret: 'qmvBSzxpl1nOg_inFPawJC5YJho'
  });

  app.get('/', (req,res,next) => {
  	Product.find({ Enable: true }, (err, docs) => {
  		Product_Type.find((err, types) => {
  			let mao = docs.map( (imgEdit) => {
  				let	propImg = 'Img_Product',
  						position = imgEdit.Img_Product.indexOf(',');
  				if(imgEdit.Img_Product.length !== position) {
  					imgEdit[propImg] = imgEdit.Img_Product.split(",", 1);
  				}
  				else {
  					imgEdit[propImg] = imgEdit.Img_Product;
  				}
  				return imgEdit;
  			});
  			res.render('Page/home', {
  				title: 'Chợ tốt Văn Lang',
  				products: docs,
  				type: types,
  				one_type_id: types[Object.keys(types)[0]]._id
  			 });
  		});
  	}).limit(12).sort({Create_at: -1});
  });

  app.get('/thong-tin-ca-nhan', isLogin, function(req,res,next) {
  	res.render('Page/profile', { title: 'Thông tin cá nhân', account: req.user });
  });

  app.get('/cho-duyet', isLogin, isNotPay, function(req,res,next) {
  	res.render('Page/cho-duyet', { title: 'Chờ duyệt', user: req.user });
  });

  app.get('/gui-mail/:id&:sl', function(req,res,next) {
    let mes = req.flash('success'),
        loi = req.flash('error');
  	Product.findById({ _id: req.params.id }, function(err, poro){
  		if(err) throw err;
  		Account.findById({ _id: poro.Seller }, function(err, roto) {
  			if(err) throw err;
        Product_Type.findOne((err, types) => {
          if(err) throw err;
  				let	mulporo,
  						propImg = poro.Img_Product,
  						position = poro.Img_Product.indexOf(',');
  				if(propImg.length !== position) {
  					mulporo = propImg.split(",");
  				}
  				else {
  					mulporo = propImg.split(",", 1);
  				}
    			res.render("Page/gui-mail", {
    				title: 'Gửi liên hệ sản phẩm',
    				tedieu: 'Gửi liên hệ cho người bán'+ " " + roto.User.Username,
    				poro: poro,
            csrfToken: req.csrfToken(),
            Url_clound: poro.Url_clound,
    				roto: roto,
            mes: mes,
            loi: loi,
            uid: types._id,
            sl: req.params.sl,
    				mulporo: mulporo
    			});
    		});
  		});
  	});
  });

  app.post('/gui-mail/:id&:sl&:kho', function(req,res,next) {
  	let query = { _id: req.params.id };
    req.checkBody('tieude','Tiêu đề không được trống (Tối thiểu 1 ký tự, tối đa 120 ký tự).').trim().notEmpty();
    req.checkBody('ten','Họ và tên không được trống').trim().notEmpty();
    req.checkBody('sdt','Số diện thoại không được trống').trim().notEmpty();
    req.checkBody('sdt','Số diện thoại phải là số').isNumeric();
    req.checkBody('sdt','Số diện thoại không đúng định dạng.').isLength({min: 9}).matches(/[0-9]{9,16}/);
    req.checkBody('email','Email không được để trống').trim().notEmpty();
    req.checkBody('email','Email không đúng định dạng').isEmail();
    req.checkBody('soluong','Số lượng không được để trống (Tối thiểu 1, tối đa giá là 9 tỉ)').trim().notEmpty();
    req.checkBody('soluong','Số lượng phải là số').isNumeric();
    req.checkBody('noidung','Nội dung không được để trống').trim().notEmpty();
    req.checkBody('noidung','Nội dung tối đa giá là 3000 ký tự').isLength({min: 1, max: 3000});
    if(req.params.kho < req.body.soluong) {
      req.flash('error', "Số lượng không được lớn hơn số lượng kho");
      return res.redirect('/gui-mail/'+`${req.params.id}&1`);
    }
    if(req.body.soluong < 0) {
      req.flash('error', "Số lượng phải lớn hơn 0");
      return res.redirect('/gui-mail/'+`${req.params.id}&1`);
    }
    var errors = req.validationErrors();
    if(errors) {
      var messages = [];
      errors.forEach((error) => {
        messages.push(error.msg);
      });
      req.flash('error', messages);
      return res.redirect('/gui-mail/'+`${req.params.id}&${req.body.soluong}`);
    }
  	Product.findById(query, function(err, lolo) {
  		Account.findById({ _id: lolo.Seller }, function(err, roto) {
  			if(err) throw err;
        Product_Type.findOne((err, types) => {
          if(err) throw err;
  				let	mulporo,
  						propImg = lolo.Img_Product,
  						position = lolo.Img_Product.indexOf(',');
  				if(propImg.length !== position) {
  					mulporo = propImg.split(",");
  				}
  				else {
  					mulporo = propImg.split(",", 1);
  				}

  				let mail =	`<div style="width: 60%; padding: 15px; margin: 0 auto; border: 10px solid #262626;">
            <h2 style="color: #01a185"><span><img src="https://chototvanlang.herokuapp.com/images/favicon.png" width="20px" height="20px"></span><span style="color: #f3c500">Chợ tốt</span> Văn Lang</h2>
            <div class="mail-header" style="background: #01a185; color: white; padding: 30px 0; text-align: center;">
              <h3>Chi tiết liên hệ</h3>
            </div>
            <div style="padding: 0 10px;">
              <h3>Thông tin người mua</h3>
              <ul style="list-style-type: persian;">
                <li>Họ tên: ${req.body.ten}</li>
                <li>Email: ${req.body.email}</li>
                <li>Số điện thoại: ${req.body.sdt}</li>
                <li>Số lượng: ${req.body.soluong} ${req.params.sl}</li>
              </ul>
            </div>
            <br>
            <div class="mail-body" style="padding: 0 10px;">
              <h3>Thông tin sản phẩm</h3>
              <ul style="list-style-type: persian;">
                <li>Tên sản phẩm: ${ lolo.Product_Name}</li>
                <li>Giá: ${lolo.Price} VNĐ</li>
                <li>Số lượng: ${lolo.Quantity - req.body.soluong} ${req.params.sl} còn lại</li>
                <li>Brand: ${lolo.Brand}</li>
                <li>Status: ${lolo.Status}</li>
              </ul>
              <br/>
              <br>
              <hr>
              <div style="clear: both;"></div>
              <div style="float: left; width: 60%;">
                <h3>Chợ tốt Văn Lang</h3>
                <ul style="list-style-type: persian;">
                  <li>Địa chỉ: LẦU 7 VĂN PHÒNG KHOA CNTT Đại học Văn Lang</li>
                  <li>Số điện thoại: 0 561 111 235</li>
                  <li>Mọi thắc mắc vui lòng liên hệ: <a href="mailto:w.a.f-group@gmail.com">chototvanlang@gmail.com</a></li>
                  <p> © 2018 Chợ tốt Văn Lang. All Rights Reserved</p>
                </ul>
              </div>
              <div style="float: right; width: 38%; text-align: center">
                <img src="https://chototvanlang.herokuapp.com/images/favicon.png" width="50%">
              </div>
              <div style="clear: both;"></div>
              <hr style="padding: 0;margin: 0;">
            </div>
             </div>`;

  		// create reusable transporter object using the default SMTP transport
  		 let transporter = nodemailer.createTransport({
  				 service: 'Gmail',
  				 auth: {
  						 user: 'chototvlu@gmail.com',
  						 pass: 'chototvlu2018'
  				 },
  				 tls: {
  					 rejectUnauthorized: false
  				 }
  		 });

  		 // setup email data with unicode symbols
  			let mailOptions = {
  					from: "Chợ tốt Văn Lang 👻"+`${roto.email}`, // sender address
  					to: `${roto.email}`, // list of receivers
  					subject: `${req.body.tieude}`+' ✔', // Subject line
  					text: 'Test', // plain text body
  					html: mail // html body
  			};

  			// send mail with defined transport object
  			transporter.sendMail(mailOptions, (error, info) => {
  					if (error) {
  							return new Error(error);
  					}
  					('Message sent: %s', info.messageId);
  					('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            req.flash('success', "Liên hệ của bạn đã được gửi cho người bán.");
            return res.redirect('/gui-mail/'+`${req.params.id}&${req.params.sl}`);
  			  });
  			});
  		});
  	});
  });

  app.get('/kenh-nguoi-ban', isLogin, isPay, function(req, res, next) {
  	Product.find({$and: [{ Seller: req.user._id }, { Enable: true }] },function(err, docs) {
  		if (err) throw err
  		Product_Type.find(function(err, types) {
  			if (err) throw err
  			Product.find({$and: [{ Seller: req.user._id }, { Enable: false }] },function(err, docsD) {
  				if (err) throw err
  				docs.map(function(imgEdit) {
  					let	propImg = 'Img_Product',
  							position = imgEdit.Img_Product.indexOf(',');
  					if(imgEdit.Img_Product.length !== position) {
  						imgEdit[propImg] = imgEdit.Img_Product.split(",", 1);
  					}
  					else {
  						imgEdit[propImg] = imgEdit.Img_Product;
  					}
  					return imgEdit;
  				});
  				docsD.map(function(imgEdit) {
  					let	propImg = 'Img_Product',
  							position = imgEdit.Img_Product.indexOf(',');
  					if(imgEdit.Img_Product.length !== position) {
  						imgEdit[propImg] = imgEdit.Img_Product.split(",", 1);
  					}
  					else {
  						imgEdit[propImg] = imgEdit.Img_Product;
  					}
  					return imgEdit;
  				});
  				res.render('Page/kenh-nguoi-ban', {
  					title: 'Kênh người bán',
  					products: docs ,
  					productsD: docsD ,
  					type: types
  				});
  			});
  		});
  	}).sort({Create_at: -1});
  });


    app.get('/them-san-pham', isLogin, isPay, (req,res,next) => {
    	Product.find(function(err, docs) {
        if (err) throw err
    		Product_Type.find(function(err, types) {
          if (err) throw err
    			res.render('Page/Product/Add', {
    				title: 'Thêm sản phẩm',
    				chuto: 'Kênh người bán',
            csrfToken: req.csrfToken(),
    				products: docs ,
    				type: types,
            mesa: req.flash('error'),
            first_type_id: types[Object.keys(types)[0]]._id
    			});
    		});
    	});
    });

  app.post("/them-san-pham", isLogin, isPay, upload.array('productImgAdd', 6), (req, res, next) => {
      let cloundImg = [];
      let cloundsecure_url;
      let countF = 0;
      req.checkBody('Product_Name','Tên sản phẩm không được trống (Tối thiểu 1 ký tự, tối đa 120 ký tự).').trim().notEmpty();
      req.checkBody('Product_Name','Tối thiểu 1 ký tự, tối đa 120 ký tự.').isLength({ min: 1, max: 120 });
      req.checkBody('Description','Chi tiết sản phẩm không được trống').trim().notEmpty();
      req.checkBody('Description','Chi tiết sản phẩm tối thiểu là 1 ký tự và nhiều nhất là 3000 ký tự').isLength({ min: 1, max: 3000 });
      req.checkBody('Product_Type','Loại sản phẩm không được trống').trim().notEmpty();
      req.checkBody('Price','Giá không được để trống (Tối thiểu 1, tối đa giá là 9 tỉ)').trim().notEmpty();
      req.checkBody('Price','Giá phải là số').isNumeric();
      req.checkBody('Price','Giá (Tối thiểu 1, tối đa giá là 9 tỉ)').isLength({min: 1});
      req.checkBody('Quantity','Số lượng kho không được để trống (Tối thiểu 1, tối đa giá là 9 tỉ)').trim().notEmpty();
      req.checkBody('Quantity','Số lượng kho phải là số').isNumeric();
      req.checkBody('Quantity','Số lượng kho (Tối thiểu 1, tối đa giá là 9 tỉ)').isLength({min: 1});
      var errors = req.validationErrors();
      if(errors) {
        var messages = [];
        errors.forEach((error) => {
          messages.push(error.msg);
        });
        req.flash('error', messages);
        return res.redirect('/them-san-pham');
      }
      if(typeof _base64 === "undefined") {
        req.flash("error","Không có ảnh nào. Vui lòng chọn ít nhất 1 ảnh có định dạng ( .JPG |.JPEG |.PNG |.GIF )");
        return res.redirect('/them-san-pham');
      }
      _base64.forEach(iBase64 => {
        cloudinary.v2.uploader.upload(iBase64, {width: 512}, (err, resault) => {
          try {
            let stringImg = resault.secure_url,
                strnameImg = stringImg.indexOf(resault.public_id);
                cloundsecure_url = stringImg.slice(0,strnameImg);
                cloundImg.push(stringImg.slice(strnameImg));
                countF++;
          } catch (e) {
            throw new Error(e.message);
          }
          if(countF === _base64.length) {
            if (_base64.length == 0) {
              Product.find(function(err, docs) {
                Product_Type.find(function(err, types) {
                  res.render('Page/Product/Add', {
                    title: 'Thêm sản phẩm',
                    msg: "Vui lòng thêm ảnh để hoàn thiện sản phẩm!",
                    chuto: 'Kênh người bán',
                    products: docs,
                    type: types
                  });
                });
              });
            } else {
              var sanpham = new Product();
              sanpham.Product_Name = req.body.Product_Name;
              sanpham.Description = req.body.Description;
              sanpham.Seller = req.user._id;
              sanpham.Price = req.body.Price;
              sanpham.Quantity = req.body.Quantity;
              sanpham.Brand = (req.body.Brand) ? (req.body.Brand) : "No Brand";
              sanpham.Product_Type = req.body.Product_Type;
              sanpham.Img_Product = `${cloundImg.toString()}`;
              sanpham.Url_clound = cloundsecure_url;
              sanpham.save(function(err) {
                if(err) {
                  return new Error(err);
                } else {
                  cloundImg.splice(0,cloundImg.length);
                  _base64.splice(0,_base64.length);
                  return res.redirect('/');
                }
              });
            }
          }
        });
      });
    });

  app.get('/update-san-pham/:id', isLogin, isPay, (req,res,next) => {
  	Product.findById(req.params.id, function(err, docs) {
  		Product_Type.find(function(err, types) {
  			res.render('Page/Product/Edit', {
  				title: 'Chỉnh sửa sản phẩm',
  				chuto: 'Kênh người bán',
  				products: docs ,
          csrfToken: req.csrfToken(),
  				Url_clound: docs.Url_clound ,
          mesa: req.flash('error'),
  				id: docs.Product_Type,
  				type: types
  			});
  		});
  	});
  });

  app.post('/update-san-pham/:id', isLogin, isPay, upload.array('productImgEdit', 6), (req, res) => {
    let countE = 0;
    req.checkBody('Product_Name','Tên sản phẩm không được trống (Tối thiểu 1 ký tự, tối đa 120 ký tự).').trim().notEmpty();
    req.checkBody('Product_Name','Tối thiểu 1 ký tự, tối đa 120 ký tự.').isLength({ min: 1, max: 120 });
    req.checkBody('Description','Chi tiết sản phẩm không được trống').trim().notEmpty();
    req.checkBody('Description','Chi tiết sản phẩm tối thiểu là 1 ký tự và nhiều nhất là 3000 ký tự').isLength({ min: 1, max: 3000 });
    req.checkBody('Product_Type','Loại sản phẩm không được trống').trim().notEmpty();
    req.checkBody('Price','Giá không được để trống (Tối thiểu 1, tối đa giá là 9 tỉ)').trim().notEmpty();
    req.checkBody('Price','Giá phải là số').isNumeric();
    req.checkBody('Price','Giá (Tối thiểu 1, tối đa giá là 9 tỉ)').isLength({min: 1, max: 9999999999});
    req.checkBody('Quantity','Số lượng kho không được để trống (Tối thiểu 1, tối đa giá là 9 tỉ)').trim().notEmpty();
    req.checkBody('Quantity','Số lượng kho phải là số').isNumeric();
    req.checkBody('Quantity','Số lượng kho (Tối thiểu 1, tối đa giá là 9 tỉ)').isLength({min: 1, max: 9999999999});
    var errors = req.validationErrors();
    if(errors) {
      var messages = [];
      errors.forEach((error) => {
        messages.push(error.msg);
      });
      req.flash('error', messages);
      return res.redirect('/update-san-pham/'+`${req.params.id}`);
    }
    if((_base64em == undefined) && (_base64e.length == 0)) {
      req.flash("error","Không có ảnh nào. Vui lòng chọn ít nhất 1 ảnh có định dạng ( .JPG |.JPEG |.PNG |.GIF )");
      return res.redirect('/update-san-pham/'+`${req.params.id}`);
    }
    if((_base64em == undefined) || (_base64em.length == 0)) {
      let editSanpham = {};
      editSanpham.Product_Name = req.body.Product_Name;
      editSanpham.Description = req.body.Description;
      editSanpham.Price = req.body.Price;
      editSanpham.Quantity = req.body.Quantity;
      editSanpham.Brand = (req.body.Brand) ? (req.body.Brand) : "No Brand";
      editSanpham.Product_Type = req.body.Product_Type;
      editSanpham.update_at = new Date().toLocaleDateString();
      editSanpham.Img_Product = `${_base64e.toString()}`;
      let sp_id = { _id: req.params.id };
      Product.update(sp_id, editSanpham, (err) => {
        if(err) {
          throw new Error(err);
        } else {
          _base64e.splice(0,_base64e.length);
          return res.redirect('/kenh-nguoi-ban');
        }
      });
    } else {
      for (let desi in _base64d) {
        cloudinary.v2.uploader.destroy(_base64d[desi], (error, result) => {if(error) throw new Error(error + "");});
      }
      for (let i in _base64em) {
        cloudinary.v2.uploader.upload(_base64em[i], {width: 512}, (err, resault) => {
          try {
            let stringImg = resault.secure_url,
                strnameImg = stringImg.indexOf(resault.public_id);
                _base64e.push(stringImg.slice(strnameImg));
                countE++;
          } catch (e) {
            throw new Error(e.message);
          }
          if(countE == _base64em.length) {
            let editSanpham = {};
            editSanpham.Product_Name = req.body.Product_Name;
            editSanpham.Description = req.body.Description;
            editSanpham.Price = req.body.Price;
            editSanpham.Quantity = req.body.Quantity;
            editSanpham.Brand = (req.body.Brand) ? (req.body.Brand) : "No Brand";
            editSanpham.Product_Type = req.body.Product_Type;
            editSanpham.update_at = new Date().toLocaleDateString();
            editSanpham.Img_Product = `${_base64e.toString()}`;
            let sp_id = { _id: req.params.id };
            Product.update(sp_id, editSanpham, (err) => {
              if(err) {
                throw new Error(err);
              } else {
                _base64e.splice(0,_base64e.length);
                _base64em.splice(0,_base64em.length);
                _base64d.splice(0,_base64d.length);
                return res.redirect('/kenh-nguoi-ban');
              }
            });
          }
        });
      }
    }
  });

  app.get('/dang-xuat', isLogin, function(req,res,next) {
  	req.logout();
  	return res.redirect('/');
  });

  app.get('/lay-mat-khau', function(req,res,next) {
    var messages = req.flash('error');
    res.render('Page/getPass', {
      title: 'Lấy lại mật khẩu',
      messages: messages,
      csrfToken: req.csrfToken(),
      success: req.flash('Success'),
      hasErrors: messages.length > 0 });
  });

  app.post('/lay-mat-khau', (req, res, next) => {
    let email = req.body.email;
    req.checkBody('email','Email không đúng').trim().notEmpty().isEmail();
    Account.findOne({ email: email }, (err, account) => {
        if (err) { return done(err); }
        if (!account) {
            req.flash('error','Rất tiếc! Tài khoản không tồn tại');
            return res.redirect('/lay-mat-khau');
        }
        try {
          const emailToken = jwt.sign({account}, 'secretkey', {expiresIn: '15m'});
            const url = `https://chototvanlang.herokuapp.com/doi-mat-khau/${emailToken}`;
            let laymk =
        		`	<div style="width: 60%; padding: 15px; margin: 0 auto; border: 10px solid #262626;">
          		<h2 style="color: #01a185"><span><img src="https://chototvanlang.herokuapp.com/images/favicon.png" width="20px" height="20px"></span><span style="color: #f3c500">Chợ tốt</span> Văn Lang</h2>
          		<div class="mail-header" style="background: #01a185; color: white; padding: 30px 0; text-align: center;">
          			<h3>Yêu cầu đặt lại mật khẩu cho Tài khoản Chợ tốt Văn Lang của bạn</h3>
          		</div>
          		<div>
          			<p>	Bạn nhận được thông báo này vì ${account.email} được liệt kê là email khôi phục mật khẩu cho tài khoản Chợ tốt Văn Lang ${req.body.email}. Nếu ${req.body.email} không phải là tài khoản Chợ tốt Văn Lang của bạn, hãy xoá chúng và xin lỗi vì đã làm phiền bạn.</p>
          		</div>
          		<hr>
          		<div class="mail-body" style="padding: 0 10px;">
          			<p>Xin chào ${account.User.Username}!</p>
          			<p>Chúng tôi vừa nhận được một yêu cầu khôi phục tài khoản Chợ tốt Văn Lang ${account.email}.</p>
          			<p>Để thực hiện yêu cầu này, hãy nhấp vào <a href="` +  `${url}` + `" style="color: #01a185;">
                liên kết này</a> để thực hiện yêu cầu
                </p>
                <p style="color: red;">Liên kết chỉ tồn tại 15 phút</p>
          			<p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
          			<br/>
          			<br>
          			<br>
          			<div>Trân trọng,</div>
          			<div>Admin</div>
          			<div>Hỗ trợ tài khoản</div>
          			<p> © 2018 Chợ tốt Văn Lang. All Rights Reserved</p>
          			<hr style="padding: 0;margin: 0;">
          		</div>
    	         </div>`;

        	let transporter_mk = nodemailer.createTransport({
        		 service: 'Gmail',
        		 auth: {
        				 user: 'chototvlu@gmail.com',
        				 pass: 'chototvlu2018'
        		 },
        		 tls: {
        			 rejectUnauthorized: false
        		 }
        	});


        	let mailOptions_mk = {
        			from: "Chợ tốt Văn Lang 👻"+ ` ${account.email}`, // sender address
        			to: `${req.body.email}`, // list of receivers
        			subject: 'Yêu cầu khôi phục tài khoản Chợ tốt Văn Lang', // Subject line
        			text: 'Test', // plain text body
        			html: laymk // html body
        	};

        	// send mail with defined transport object
        	transporter_mk.sendMail(mailOptions_mk, (error, info_user) => {
        			if (error) {
        					return new Error(error);
        			}
        			('Message sent: %s', info_user.messageId);
        			('Preview URL: %s', nodemailer.getTestMessageUrl(info_user));

              req.flash('Success','thành công');
              return res.redirect('/lay-mat-khau');
        	});
        } catch (e) {
          throw new Error(e + "");
        }
    });
});

  app.get('/doi-mat-khau/:token', (req,res,next) => {
    try {
      let mes = req.flash('errors');
      jwt.verify(req.params.token, 'secretkey', function(err, user) {
        if(err) {throw new Error(err + "");}
          res.render('Page/resetmk', {
            title: 'Đổi mật khẩu',
            Token: req.params.token,
            csrfToken: req.csrfToken(),
            user: user.account,
            messages: mes,
            success: req.flash('Success'),
            hasErrors: mes.length > 0
          });
          return;
      });
    } catch (e) {
      req.flash('e', 'Phiên làm việc đã hết hạn. Vui lòng gửi yêu cầu mới');
      return res.redirect('/het-han');
    }
  });

  app.post('/doi-mat-khau/:token', function(req,res,next) {
    try {
      jwt.verify(req.params.token, 'secretkey', function(err, user) {
        let newPassword = req.body.newPassword,
            query = {_id: user.account._id};
        req.check('newPassword','Password không khớp').notEmpty().isLength({min: 6, max: 25}).equals(req.body.confirmNewpassword);
        let loi = req.validationErrors();
        if(loi) {
          let mes = [];
          loi.forEach((errors) => {
            mes.push(errors.msg);
          });
          req.flash('errors', mes);
          return res.redirect('/doi-mat-khau/'+req.params.token);
        }
        let updatePass = {};
        updatePass.password = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10), null);
        Account.update(query, updatePass, (err) => {
          if(err) {throw new Error(err);}
          req.flash('mk', 'Đổi mật khẩu thành công');
          return res.redirect('/dang-nhap');
        });
      });
    } catch (e) {
      throw new Error(e + "");
    }
  });

  app.get('/dang-ky', function(req,res,next) {
  	var messages = req.flash('error');
  	res.render('Page/Register', {
  		title: 'Đăng ký',
  		messages: messages,
      csrfToken: req.csrfToken(),
  		hasErrors: messages.length > 0 });
  });

  app.post('/dang-ky', passport.authenticate('dang-ky', {
    failureRedirect: '/dang-ky',
  	failureFlash: true
  }),function(req, res, next){
  	  if(req.session.oldUrl) {
  			let currentUrl = req.session.oldUrl;
  			req.session.oldUrl = null;
  			return res.redirect(currentUrl);
  		} else {
  			return res.redirect('/cho-duyet');
  		}
  });

  app.get('/dang-nhap', function(req,res,next) {
    var messages = req.flash('error');
    res.render('Page/Login', {
      title: 'Đăng nhập',
      user: req.account,
      csrfToken: req.csrfToken(),
      messages: messages,
      mk: req.flash('mk'),
      hasErrors: messages.length > 0 });
  });

  app.post('/dang-nhap', passport.authenticate('dang-nhap', {
    failureRedirect: '/dang-nhap',
    failureFlash: true
  }), function(req, res, next) {
    // let user = req.user;
    // const token = jwt.sign({user},'secret', {expiresIn: '3h'});
		if(req.session.oldUrl) {
			let currentUrl = req.session.oldUrl;
			req.session.oldUrl = null;
      if(currentUrl == "/admin/dang-nhap") {
        return res.redirect('/');
      } else {
        return res.redirect(currentUrl);
      }
		} else {
			return res.redirect('/');
		}
  });

  app.get('/danh-muc/:id', function(req,res,next) {
  	if(!req.params.id) { throw new Error('Không có'); }
  	Product_Type.find(function(err, types) {
  		if (err) return next(err + "");
  			Product.find({ Enable: true },function(err, docs) {
  				if (err) return next(err + "");
  				let mao = docs.map(function(imgEdit) {
  					let	propImg = 'Img_Product',
  							position = imgEdit.Img_Product.indexOf(',');
  					if(imgEdit.Img_Product.length !== position) {
  						imgEdit[propImg] = imgEdit.Img_Product.split(",", 1);
  					}
  					else {
  						imgEdit[propImg] = imgEdit.Img_Product;
  					}
  					return imgEdit;
  				});
  				res.render('Page/danh-muc', {
  					title: 'Danh mục',
  					header: 'Chợ tốt Văn Lang',
  					subHeader: 'Lựa chọn sản phẩm mà bạn muốn',
  					type: types,
  					type_id: req.params.id,
  					products: docs });
  			}).sort({Create_at: -1});
  	});
  });

  app.get('/chi-tiet-san-pham/:id', (req,res,next) => {
  	Product.findById(req.params.id, (err, product) => {
  		try {
  			Account.findById(product.Seller ,(err, nguoidung) => {
  				if(err) { throw new Error('Lỗi Seller'); }
  				else {
  					Product.find({$and: [{ Seller: nguoidung._id}, { Enable: true }]}, function(err, PoS) {
  						if(err) { throw new Error('Lỗi Seller_id'); }
  						Product_Type.findById(product.Product_Type ,(err,types) => {
  						  Product_Type.findOne((err,Onetypes) => {
                let all_Img = product.Img_Product.split(",");
                PoS.map(function(imgEdit) {
        					let	propImg = 'Img_Product',
        							position = imgEdit.Img_Product.indexOf(',');
        					if(imgEdit.Img_Product.length !== position) {
        						imgEdit[propImg] = imgEdit.Img_Product.split(",", 1);
        					}
        					else {
        						imgEdit[propImg] = imgEdit.Img_Product;
        					}
        					return imgEdit;
        				});
  							res.render('Page/chi-tiet-san-pham', {
  								title: 'Chi tiết sản phẩm',
  								product: product,
                  Url_clound: product.Url_clound,
  								seller: nguoidung,
  								pos: PoS,
  								all_Img: all_Img,
  								one_typeid: types,
                  all_typeid: Onetypes._id
  							});
  						});
  					});
  					});
  				}
  			});
  		} catch (e) {
  			 e.message;
  		}
  	});
  });

  app.get('/gioi-thieu',function(req,res,next) {
    About.findOne((err,about) => {
      let Img_Member = about.Img_Member.split(',');
      res.render('Page/About', {
        title: 'Chợ tốt Văn Lang',
        Title_about: about.Title,
        Description: about.Description,
        Img_Company: about.Img_Company,
        Img_Member: Img_Member,
      });
    });
  });

  app.get('/lien-he',function(req,res,next) {
  	res.render('Page/Contact', {
      title: 'Liên hệ với chúng tôi',
      csrfToken: req.csrfToken(),
      mes: req.flash('success'),
      loi: req.flash('error')
    });
  });

  app.post('/lien-he',function(req,res,next) {
    req.checkBody('title','Tiêu đề không được trống (Tối thiểu 1 ký tự, tối đa 120 ký tự).').trim().notEmpty();
    req.checkBody('name','Họ và tên không được trống').trim().notEmpty();
    req.checkBody('phone','Số diện thoại không được trống').trim().notEmpty();
    req.checkBody('phone','Số diện thoại phải là số').isNumeric();
    req.checkBody('phone','Số diện thoại không đúng định dạng.').isLength({min: 9}).matches(/[0-9]{9,16}/);
    req.checkBody('email','Email không được để trống').trim().notEmpty();
    req.checkBody('email','Email không đúng định dạng').isEmail();
    req.checkBody('content','Nội dung không được để trống').trim().notEmpty();
    var errors = req.validationErrors();
    if(errors) {
      var messages = [];
      errors.forEach((error) => {
        messages.push(error.msg);
      });
      req.flash('error', messages);
      return res.redirect('/lien-he');
    }
		let mail_company =
		`<div style="width: 60%; padding: 15px; margin: 0 auto; border: 10px solid #262626;">
          <h2 style="color: #01a185"><span><img src="https://chototvanlang.herokuapp.com/images/favicon.png" width="20px" height="20px"></span><span style="color: #f3c500">Chợ tốt</span> Văn Lang</h2>
          <div class="mail-header" style="background: #01a185; color: white; padding: 30px 0; text-align: center;">
            <h3>Yêu cầu hỗ trợ</h3>
          </div>
          <div style="padding: 0 10px;">
            <h3>Thông tin người mua</h3>
            <ul style="list-style-type: persian;">
                <li>Họ tên: ${req.body.name}</li>
                <li>Email: ${req.body.email}</li>
                <li>Số điện thoại: ${req.body.phone}</li>
            </ul>
            <h3>Nội dung</h3>
            <p>${req.body.content}</p>
          </div>
          <br>
          <div class="mail-body" style="padding: 0 10px;">
            <br/>
            <br>
            <hr>
            <div style="clear: both;"></div>
            <div style="float: left; width: 60%;">
              <h3>Chợ tốt Văn Lang</h3>
              <ul style="list-style-type: persian;">
                <li>Địa chỉ: LẦU 7 VĂN PHÒNG KHOA CNTT Đại học Văn Lang</li>
                <li>Số điện thoại: 0 561 111 235</li>
                <li>Mọi thắc mắc vui lòng liên hệ: <a href="mailto:w.a.f-group@gmail.com">chototvanlang@gmail.com</a></li>
                <p> © 2018 Chợ tốt Văn Lang. All Rights Reserved</p>
              </ul>
            </div>
            <div style="float: right; width: 38%; text-align: center">
              <img src="https://chototvanlang.herokuapp.com/images/favicon.png" width="50%">
            </div>
            <div style="clear: both;"></div>
            <hr style="padding: 0;margin: 0;">
          </div>
           </div>`;

  	let transporter_company = nodemailer.createTransport({
  		 service: 'Gmail',
  		 auth: {
  				 user: 'chototvlu@gmail.com',
  				 pass: 'chototvlu2018'
  		 },
  		 tls: {
  			 rejectUnauthorized: false
  		 }
  	});

  	let mailOptions_company = {
  			from: "Chợ tốt Văn Lang 👻" + `${req.body.email}`, // sender address
  			to: 'nnam1472@gmail.com', // list of receivers
  			subject: `${req.body.title}`+' ✔', // Subject line
  			text: 'Test', // plain text body
  			html: mail_company // html body
  	};

  	// send mail with defined transport object
  	transporter_company.sendMail(mailOptions_company, (error, info_user) => {
  			if (error) {
  					return new Error(error);
  			}
  			('Message sent: %s', info_user.messageId);
  			('Preview URL: %s', nodemailer.getTestMessageUrl(info_user));

        req.flash('success', "Liên hệ của bạn đã được gửi cho chúng tôi.");
        return res.redirect('/lien-he');
  	});
  });

  app.get('/het-han',(req,res,next) => {
    res.render('het-han', {
        title: 'Hết hạn',
        message: req.flash('e').toString()
    });
  });

  function isLogin(req, res, next) {
  	if(req.isAuthenticated()) {
  		return next();
  	}
  	req.session.oldUrl = req.originalUrl;
  	return res.redirect('/dang-nhap');
  }

  function isPay(req, res, next){
  	if(req.user.User.Status === true) {
  		return next();
  	}
  	return res.redirect('/cho-duyet');
  }

  function isNotPay(req, res, next){
  	if(req.user.User.Status === false) {
  		return next();
  	}
  	req.flash("Success", "Bạn đã trả phí")
  	res.redirect('/kenh-nguoi-ban');
  }

  function verifyToken(req, res, next) {
    const tokenHeader = req.headers['authorization'];
    if(typeof tokenHeader !== 'undefined') {
      const tokenAuth = tokenHeader.split(" ")[1];
      req.token = tokenAuth;
      next();
    } else {
      res.sendStatus(403);
    }
  }

  // handler
  app.use((req, res, next) => {
  	let err = new Error("Không tìm thấy hoặc có thể trang đang được phát. Vui lòng quay lại sau...");
  	err.status = 404;
  	next(err + "");
  });


  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            title: 'Lỗi',
            message: err.message,
            error: err
        });
    });
  }
module.exports.respond = (io) => {
    let roomsCurrent = [];
    let user_Sale = [];
    let user_Online = [];
    let usid;
    io.on('connection', socket => {
      count++;
      io.sockets.emit("online", count);
      socket.on("disconnect", data => {
        count--;
        io.sockets.emit("online", count);
      });

      socket.on('hide', data => {
        let query_id = { _id: data.Id };
        let porot = {};
            porot.Enable = data.Stuta;
        Product.update(query_id, porot, (err) => {if(err) throw new Error(err + "");});
      });

      socket.on('show', data => {
          let query_id = { _id: data.Parameter };
          let porot = {};
              porot.Enable = data.Stuta;
          Product.update(query_id, porot, (err) => {if(err) throw new Error(err + "");});
      });

      socket.on('change', data => {
        _base64.splice(0,_base64.length);
        _base64 = data;
      });

      socket.on('changeEdit', data => {
        _base64em.splice(0,_base64em.length);
        _base64em = data;
      });

      socket.on('add', data => {
        let checkBase64, quantityImg = data.length;
        if(quantityImg < 7) {
          for (let i in data) {
            checkBase64 = (data[i].substring(data[i].indexOf("/"), data[i].indexOf(";"))).split("/")[1];
            if (/(jpe?g|png|gif)$/i.test(checkBase64)) {
              _base64 = data;
            } else {
              socket.emit('allD', 'Không có ảnh nào.Vui lòng chọn ảnh có định dạng&nbsp;<i class="text-primary">( .JPG |.JPEG |.PNG |.GIF )</i>.');
            }
          }
        }
      });
      socket.on('delete', data => {
        _base64.splice(0,_base64.length);
        _base64 = data;
        if(data.length == 0) {
          _base64.splice(0,_base64.length);
        }
      });

      socket.on('edit', data => {_base64e = data;});
      socket.on('them', data => {
          if(data.length < 7) {
            if(_base64em !== undefined) {
              let sumBa = _base64e.length + _base64em.length;
              if (sumBa < 7) {
                _base64em.splice(0,_base64em.length);
                _base64em = data;
              } else {
                _base64em.splice(0,_base64em.length);
                _base64e.splice(0,_base64e.length);
              }
            } else {
              _base64em = data;
            }
          }
      });
      socket.on('xoa', data => {
        _base64e.splice(0,_base64e.length);
        _base64d.splice(0,_base64d.length);
        let valDestroy = data.Destroy;
        for (let i in valDestroy) {
          _base64d.push(valDestroy[i].slice(0, valDestroy[i].indexOf('.')));
        }
        _base64e = data._arrImg;
        if(data._arrImg.length == 0) {
          _base64e.splice(0,_base64e.length);
        }
      });
      socket.on('xoam', data => {
        if(_base64em !== undefined) {
          _base64em.splice(0,_base64em.length);
          _base64em = data;
          if(data.length == 0) {
            _base64em.splice(0,_base64em.length);
          }
        }
      });
      socket.on('deleteAll', data => {
        _base64d.splice(0,_base64d.length);
        _base64e.splice(0,_base64e.length);
        for (let i in data) {
          _base64d.push(data[i].slice(0, data[i].indexOf('.')));
        }
      });

    });
  };
};
