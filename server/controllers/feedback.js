import {db} from "../db.js"

export const getFeedback = (req, res) => {
    // const property_id=req.query.property_id
    db.query("SELECT * FROM feedback LEFT JOIN enquiry ON feedback.enquiry_id = enquiry.enquiry_id WHERE user_id = ?", 
    [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
  
      return res.status(200).json(data);
    });
  };

//   export const getFeedback = (req, res) => {
//     // const property_id=req.query.property_id
//     db.query("SELECT * FROM feedback WHERE feedback_id = ?", 
//     [req.params.id], (err, data) => {
//       if (err) return res.status(500).json(err);
  
//       return res.status(200).json(data[0]);
//     });
//   };

  export const getFeedbacks = (req, res) => {
    db.query("SELECT * FROM feedback", [req.query.cat], (err, data) => {
      if (err) return res.status(500).send(err);
  
      return res.status(200).json(data);
    });
  };

  export const returnFeedback = (req, res) => {
    const enquiry_id=req.body.enquiry_id
    const message=req.body.f_message

    db.query(
        "INSERT INTO feedback (enquiry_id,f_message) VALUES (?,?)",
        [enquiry_id, message],
        (err, result)=>{
          if(err){
            return res.status(500).send(err);
          }
          else {
            return res.status(200).json("success");
          }
        }
      )
  };