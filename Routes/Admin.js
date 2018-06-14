"use strict";
const express = require('express'),
      router = express.Router(),
      bodyParser = require("body-parser").urlencoded({
		  extended: false
			}),
      passport = require('passport'),
      Product = require('../Models/Product'),
      User = require('../Models/User'),
      Account = require('../Models/Account'),
      About = require('../Models/About'),
      Product_Type = require('../Models/Product_Type');

  router.get('/thong-ke-ca-nhan/:id', isAdmin, async (req,res,next) => {
      Product.find({ Seller: req.params.id }, async (err,Pro) => {
        if(err) throw err;
        let mrouterty = Pro.map(Protype => Protype.Product_Type);
        let arrJson = await dataMonth(mrouterty);
        res.json({
          arrJson: arrJson
        });
      });
  });


  router.get('/danh-sach-san-pham/:id', isAdmin, async (req,res,next) => {
    Product.find({ Seller: req.params.id },(err,list_Pro) => {
      if(err) throw err;
      Account.findById(req.params.id, (err, userS) => {
        if(err) throw err;
        res.render("Admin/Page/danh-sach-san-pham-admin", {
          title: 'Danh sách sản phẩm của' + userS.User.Username,
          list: list_Pro,
          userN: userS
        });
      });
    });
  });

  router.get('/dashboard', isAdmin, function(req, res, next) {
    let userAccount = [];
    Account.find( { "Admin.isAdmin": false } , function(err, account) {
      if(err) {throw new Error(err)}
      res.render('./Admin/Page/Dashboard', {
        title: 'Dashboard',
        csrfToken: req.csrfToken(),
        account: account
      });
    }).sort({Create_at: -1});
  });


  router.get('/tat-ca-san-pham', isAdmin, function(req, res, next) {
    // Product.find((err, allPro) => {
    //   res.render('Admin/Page/Dashboard', {
    //     title: 'Tất cả sản phẩm của người dùng',
    //     allPro: allPro
    //   });
    // });
    res.send("Hello mọi người");
  });


  router.get('/thong-ke', isAdmin, async (req, res, next) => {
    let thongke = [];
    let data = [];
    let count = {} ;
    let max = 0;
    await Product.find({Enable: true}, async (err,pro) => {
      if(err) {throw new Error(err)}
      for (let i in pro) {
        await Account.findOne({$and: [{ _id: pro[i].Seller }, { "Admin.isAdmin": false }]}, async (err, account) => {
          await thongke.push(account._id);
        });
      }
      thongke.forEach(function(i) { count[i] = (count[i]||0) + 1;});
      for (let i in count) {
        max++;
        await Account.findById(i, async (err,acc) => {
          if(err) {throw new Error(err)}
          let Obh = new Object();
          Obh.name = await acc.User.Username;
          Obh.total = await count[i];
          await data.push(Obh);
        });
        if(max === Object.keys(count).length) {
          res.render('Admin/Page/Statistic', {
            title: 'Thống kê',
            data: await data.sort(compare)
          });
        }
      }
    });
  });


  router.put('/trang-thai-tai-khoan/:id', isAdmin, function(req, res, next){
    let user_id = { _id: req.params.id };
    Account.update(user_id, { "User.Status": req.body.Status }, function(err, result){
      if(err){
        return console.log(err);
      }
      else {
        res.json(result);
      }
    });
  });

  router.get('/dang-nhap', function(req,res,next) {
    var messages = req.flash('error');
    res.render('Admin/Page/login', { title: 'Đăng nhập', csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
  });


  router.post('/dang-nhap', passport.authenticate('dang-nhap', {
    failureRedirect: '/admin/dang-nhap',
    failureFlash: true
  }), function(req, res, next){
    if(req.user.Admin.isAdmin) {
      return res.redirect('/admin/dashboard');
    }
    else {
      return res.redirect('/');
    }
  });

  router.get('/dang-xuat', isAdmin, function(req,res,next) {
  	req.logout();
  	return res.redirect('/admin/dang-nhap');
  });

  function isAdmin(req, res, next) {
  	if(req.isAuthenticated()) {
      if(req.user.Admin.isAdmin) {
        return next();
      }
      return res.redirect('/');
  	}
  	req.session.oldUrl = req.originalUrl;
  	return res.redirect('/admin/dang-nhap');
  }

  // handler
  router.use((req, res, next) => {
    var err = new Error("Không tìm thấy hoặc có thể trang đang được phát. Vui lòng quay lại sau...");
    err.status = 404;
    next(err + "");
  });


  if (router.get('env') === 'development') {
    router.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
  }


  let dataMonth = async (original) => {
    let counts = {};
    let compressed = [];
    original.forEach((element) => {counts[element] = (counts[element] || 0) + 1;});
    for (let element in counts) {
      await prodataMonth(element);
      let ObjectA = new Object();
        ObjectA.label = element;
        ObjectA.y = counts[element];
        compressed.push(ObjectA);
    }
    let op = _aret.map(et => et);
    for (let index in compressed) {
      compressed[index].label = op[index];
    }
    await _aret.splice(0,_aret.length);
    return await compressed;
  };
  let _aret = [];
  let prodataMonth = async (itemName) => {
    await Product_Type.findById(itemName, async (err,resilt) => {
      try {
        await _aret.push(resilt.Title);
      } catch (e) {
        return e.message();
      }
    });
  };
function compare(a,b) {
  if (b.total < a.total)
    return -1;
  if (b.total > a.total)
    return 1;
  return 0;
}

module.exports = router;
