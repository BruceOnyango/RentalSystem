import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getProperties = (req, res) => {

  db.query("SELECT * FROM property", [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getSumPropertySales = (req, res) => {

  db.query("SELECT SUM(amount) AS total_sales FROM sales", [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getSales = (req, res) => {

  db.query("SELECT * FROM sales LEFT JOIN users ON sales.user_id=users.user_id", [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getSalesUserProperty = (req, res) => {
const user_id=req.query.user_id
const property_id=req.query.propert_id
  db.query("SELECT * FROM sales LEFT JOIN property ON sales.property_id=property.property_id LEFT JOIN users ON sales.user_id=users.user_id WHERE sales.property_id=? AND sales.user_id=?", 
  [user_id,property_id], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getSalesUserPropertyAll = (req, res) => {
  const user_id=req.query.user_id
  const property_id=req.query.propert_id
    db.query("SELECT * FROM sales LEFT JOIN property ON sales.property_id=property.property_id LEFT JOIN users ON sales.user_id=users.user_id", 
    [user_id,property_id], (err, data) => {
      if (err) return res.status(500).send(err);
  
      return res.status(200).json(data);
    });
  };

export const newSale = (req, res) => {
  //CHECK EXISTING USER
const user_id=req.body.user_id
const property_id=req.body.property_id
  const q = "SELECT * FROM sales WHERE user_id = ? AND property_id=?";
  db.query(q, [user_id,property_id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.json("exists");
    db.query(
      "INSERT INTO sales (property_id, user_id, amount, payment_type) VALUES (?,?,?,?)",
      [property_id,user_id,"2000000","Card"],
      (err, result)=>{
        if(err){
          return res.status(500).json(err);
        }
        else {
          return res.status(200).json("Sale has been added.");
        }
      }
    )
  });
};


export const newSaleSeller = (req, res) => {
  //CHECK EXISTING USER
const user_id=req.body.user_id
const property_id=req.body.property_id
  const q = "SELECT * FROM sales WHERE user_id = ? AND property_id=?";
  db.query(q, [user_id,property_id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.json("exists");
    db.query(
      "INSERT INTO sales (property_id, user_id, amount, payment_type,pay_for) VALUES (?,?,?,?,?)",
      [property_id,user_id,"2000000","Card","valuation"],
      (err, result)=>{
        if(err){
          return res.status(500).json(err);
        }
        else {
          return res.status(200).json("Sale has been added.");
        }
      }
    )
  });
};

export const getApprovedProperties = (req, res) => {
  const q = "SELECT * FROM property WHERE valuated = 'Approved' "
  db.query(q,(err,data)=>{
    if(err) res.json(err)
    return res.json(data)
  })
};
export const getApprovedPropertiesAvailable = (req, res) => {
  const q = "SELECT * FROM property WHERE valuated = 'Approved' "// available='yes' "
  db.query(q,(err,data)=>{
    if(err) res.json(err)
    return res.json(data)
  })
};

export const getProperty = (req, res) => {
  const q =
    "SELECT * FROM property LEFT JOIN users ON property.user_id = users.user_id WHERE property_id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const getPropertiesByUser = (req, res) => {
  const user_id=req.body.user_id
  db.query("SELECT * FROM property WHERE user_id = ?",
  [user_id],(err,data)=>{
    if(err) res.json(err)
    return res.json(data)
  })
};

export const pendingPayment = (req, res) => {
  const user_id=req.body.user_id
  db.query("SELECT * FROM property WHERE user_id = ? AND valuated = 'Pending Payment'",
  [user_id],(err,data)=>{
    if(err) res.json(err)
    return res.json(data)
  })
};

export const pendingApproval = (req, res) => {
  const user_id=req.body.user_id
  db.query("SELECT * FROM property WHERE valuated = 'Pending Approval'",
  [user_id],(err,data)=>{
    if(err) res.json(err)
    return res.json(data)
  })
};

export const pendingApprovalOrApproved = (req, res) => {
  const user_id=req.body.user_id
  db.query("SELECT * FROM property ",
  [user_id],(err,data)=>{
    if(err) res.json(err)
    return res.json(data)
  })
};

export const saveProperty = (req, res) => {
  const user_id=req.body.user_id
  const property_id=req.body.property_id
  
  db.query(
    "INSERT INTO saved (property_id,user_id) VALUES (?,?)",
    [property_id, user_id],
    (err, result)=>{
      if(err){
        return res.status(500).json(err);
      }
      else {
        return res.status(200).json("User has been created.");
      }
    }
  )

};

export const saveProcess = (req, res) => {
  const user_id=req.body.user_id
  const property_id=req.body.property_id
  const transfer=req.body.transfer
  const search=req.body.search

    const q = "SELECT * FROM process WHERE user_id = ? AND property_id=?";
  
    db.query(q, [user_id,property_id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.json("exists");
      db.query(
        "INSERT INTO process (property_id,user_id,transfer,search) VALUES (?,?,?,?)",
        [property_id, user_id,transfer,search],
        (err, result)=>{
          if(err){
            return res.status(500).json(err);
          }
          else {
            return res.status(200).json("success");
          }
        }
      )
    })
};



export const getPropertiesSaved = (req, res) => {
  db.query("SELECT * FROM property LEFT JOIN saved ON property.property_id = saved.property_id WHERE saved.user_id = ?",
  [req.params.id],(err,data)=>{
    if(err) res.json(err)
    return res.json(data)
  })
};

export const findifSaved = (req, res) => {
  const user_id=req.body.user_id

  db.query("SELECT * FROM saved WHERE property_id=?",
  [req.params.id],(err,data)=>{
    if(err) res.json(err)
    if (data.length) return res.json("exists");

    return res.json("nothing")
  })
};

export const getProcess = (req, res) => {

  db.query("SELECT * FROM process LEFT JOIN property ON process.property_id = property.property_id",
  (err,data)=>{
    if(err) res.json(err)
    return res.json(data)
  })
};

export const getUserProcessUp = (req, res) => {
const user_id=req.query.user_id
  db.query("SELECT * FROM process WHERE property_id=? AND user_id=?",[req.params.id,user_id],
  (err,data)=>{
    if(err) res.json(err)
    return res.json(data[0])
  })
};
export const getUserProcess = (req, res) => {
  const user_id=req.query.user_id
    db.query("SELECT * FROM process WHERE property_id=? ",[req.params.id],
    (err,data)=>{
      if(err) res.json(err)
      return res.json(data[0])
    })
  };

export const updateValuated = (req, res) => {
  db.query("UPDATE property SET valuated='Pending Approval' WHERE property_id = ?",
  [req.params.id],(err,data)=>{
    if(err) res.json(err)
    return res.json(data)
  })
};

export const updatePropertyAvailable = (req, res) => {
  db.query("UPDATE property SET available='no' WHERE property_id = ?",
  [req.params.id],(err,data)=>{
    if(err) res.json(err)
    return res.json(data)
  })
};

export const updateTransfer = (req, res) => {
  const transfer = req.body.transfer
  const process_id=req.params.id
  db.query("UPDATE process SET transfer=? WHERE process_id = ?",
  [transfer,process_id],(err,data)=>{
    if(err) res.json(err)
    return res.json(data)
  })
};

export const updateSearch = (req, res) => {
  const search = req.body.search
  const process_id=req.params.id
  db.query("UPDATE process SET search=? WHERE process_id = ?",
  [search,process_id],(err,data)=>{
    if(err) res.json(err)
    return res.json(data)
  })
};

export const updateApproved = (req, res) => {
  db.query("UPDATE property SET valuated='Approved' WHERE property_id = ?",
  [req.params.id],(err,data)=>{
    if(err) res.json(err)
    return res.json(data)
  })
};

export const updateDeclined = (req, res) => {
  db.query("UPDATE property SET valuated='Declined' WHERE property_id = ?",
  [req.params.id],(err,data)=>{
    if(err) res.json(err)
    return res.json(data)
  })
};

export const addProperty = (req, res) => {
    const q =
      "INSERT INTO property (user_id, property_name, address,price, type,offer,status,furnished,carpet_area,age,total_floors,deposite,bedroom,bathroom,balcony,description) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    const values = [
      req.body.user_id,
      req.body.property_name,
      req.body.address,
      req.body.price,
      req.body.type,
      req.body.offer,
      req.body.prop_status,
      req.body.furnished,
      req.body.carpet_area,
      req.body.age,
      req.body.total_floors,
      req.body.deposite,
      req.body.bedroom,
      req.body.bathroom,
      req.body.balcony,
      req.body.description,
    ];

    db.query("INSERT INTO property (user_id, property_name, address,price, type,offer,status,furnished,carpet_area,age,total_floors,deposite,bedroom,bathroom,balcony, lift, security_guard,play_ground,garden,water_supply,power_backup,parking_area,gym,shopping_mall,hospital,school,market_area,image_01,image_02,image_03,image_04,image_05,image_06,description) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", 
    [
      req.body.user_id,
      req.body.property_name,
      req.body.address,
      req.body.price,
      req.body.type,
      req.body.offer,
      req.body.prop_status,
      req.body.furnished,
      req.body.carpet_area,
      req.body.age,
      req.body.total_floors,
      req.body.deposite,
      req.body.bedroom,
      req.body.bathroom,
      req.body.balcony,
      req.body.lift,
      
      req.body.guard,
      req.body.play,
      req.body.garden,
      req.body.water,
      req.body.backup,
      req.body.park,
      req.body.gym,
      req.body.mall,
      req.body.hospital,
      req.body.school,
      req.body.market,
      req.body.image_01,
      req.body.image_02,
      req.body.image_03,
      req.body.image_04,
      req.body.image_05,
      req.body.image_06,

      req.body.description,
    ], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("success");
    });
 
};


export const deleteProperty = (req, res) => {

    const postId = req.params.id;
    const q = "DELETE FROM property WHERE `property_id` = ?";

    db.query(q, [postId], (err, data) => {
      if (err) return res.status(403).json("Error Deleting Post!");

      return res.json("success");
    });
  
};

export const deleteProcess = (req, res) => {

  const user_id = req.params.id;
  const property_id=req.query.property_id
  const q = "DELETE FROM process WHERE `property_id` = ? AND user_id=?";

  db.query(q, [property_id,user_id], (err, data) => {
    if (err) return res.status(403).json("Error Deleting Post!");

    return res.json("success");
  });

};


export const deleteSaved = (req, res) => {

  const postId = req.params.id;
  const q = "DELETE FROM saved WHERE `property_id` = ?";

  db.query(q, [postId], (err, data) => {
    if (err) return res.status(403).json("Removal failed.");

    return res.json("Removed from saved.");
  });

};

// export const updateProperty = (req, res) => {
//     const postId = req.params.id;
//     const q =
//       "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

//     const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

//     db.query(q, [...values, postId, userInfo.id], (err, data) => {
//       if (err) return res.status(500).json(err);
//       return res.json("Post has been updated.");
//     });
// };

export const updateProperty = (req, res) => {
  const property_id = req.params.id;

  db.query("UPDATE property SET `user_id`=?, `property_name`=?, `address`=?,`price`=?, `type`=?,`offer`=?,`status`=?,`furnished`=?,`carpet_area`=?,`age`=?,`total_floors`=?,`deposite`=?,`bedroom`=?,`bathroom`=?,`balcony`=?, `lift`=?, `security_guard`=?,`play_ground`=?,`garden`=?,`water_supply`=?,`power_backup`=?,`parking_area`=?,`gym`=?,`shopping_mall`=?,`hospital`=?,`school`=?,`market_area`=?,`image_01`=?,`image_02`=?,`image_03`=?,`image_04`=?,`image_05`=?,`image_06`=?,`description`=? WHERE `property_id`=?", 
  [
    req.body.user_id,
    req.body.property_name,
    req.body.address,
    req.body.price,
    req.body.type,
    req.body.offer,
    req.body.prop_status,
    req.body.furnished,
    req.body.carpet_area,
    req.body.age,
    req.body.total_floors,
    req.body.deposite,
    req.body.bedroom,
    req.body.bathroom,
    req.body.balcony,
    req.body.lift,
    req.body.guard,
    req.body.play,
    req.body.garden,
    req.body.water,
    req.body.backup,
    req.body.park,
    req.body.gym,
    req.body.mall,
    req.body.hospital,
    req.body.school,
    req.body.market,
    req.body.image_01,
    req.body.image_02,
    req.body.image_03,
    req.body.image_04,
    req.body.image_05,
    req.body.image_06,
    req.body.description,
    property_id
  ], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("success");
  });

};