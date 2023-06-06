import {db} from "../db.js"

export const getEnquiry = (req, res) => {
    const q =
      "SELECT * FROM enquiry WHERE user_id = ? ";
  
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
  
      return res.status(200).json(data[0]);
    });
  };

  export const makeEnquiry = (req, res) => {
    const user_id=req.body.user_id
    const property_id=req.body.property_id
    const message=req.body.message

    db.query(
        "INSERT INTO enquiry (user_id,property_id,e_message) VALUES (?,?,?)",
        [user_id, property_id, message],
        (err, result)=>{
          if(err){
            return res.status(500).json("Whats wrong");
          }
          else {
            return res.status(200).json("Enquiry has been made. Please await response.");
          }
        }
      )
  };

  export const getEnquiries = (req, res) => {
    db.query("SELECT * FROM enquiry", [req.query.cat], (err, data) => {
      if (err) return res.status(500).send(err);
  
      return res.status(200).json(data);
    });
  };

  export const getGroupByUsers = (req, res) => {
    db.query("SELECT * FROM enquiry GROUP BY user_id", [req.query.cat], (err, data) => {
        if (err) return res.status(500).send(err);
    
        return res.status(200).json(data);
      });
  };

  export const getEnquiriesBy = (req, res) => {
    const user_id=req.query.user_id
    const property_id=req.query.property_id
    db.query("SELECT * FROM enquiry LEFT JOIN feedback ON enquiry.enquiry_id=feedback.feedback_id WHERE enquiry.user_id=? AND enquiry.property_id=?", 
    [user_id,property_id], (err, data) => {
      if (err) return res.status(500).send(err);
  
      return res.status(200).json(data);
    });
  };

  export const getGroupByProperties = (req, res) => {
    db.query("SELECT * FROM enquiry LEFT JOIN property ON enquiry.property_id=property.property_id LEFT JOIN users ON enquiry.user_id=users.user_id GROUP BY enquiry.property_id", [req.query.cat], (err, data) => {
      if (err) return res.status(500).send(err);
  
      return res.status(200).json(data);
    });
  };