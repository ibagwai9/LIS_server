import db from '../models';

export const createRegistory = (req, res) => {
  const { acknowlegment_id, today, tag, remark, forwardTo, from } = req.body;
  // console.log(data);
  db.sequelize
    .query(
      `INSERT INTO registry(Acknolegment_id,registry_date,tag_no,remarks,file_from,file_to) VALUES ("${acknowlegment_id}","${today}","${tag}","${remark}","${from}","${forwardTo}")`
    )
    .then(() => {
      db.sequelize.query(
        `INSERT INTO remarks(remarks_id,date_of_remarks,tag_no,remarks) VALUES ("${acknowlegment_id}","${today}","${tag}","${remark}")`
      );
    })
    .then((results) => res.json({ success: true, results }))
    .catch((err) => res.json({ success: false, err }));
};

export const createSiteFile = (req, res) => {
  const { date, sitNo, purpose, type, remarks } = req.body;
  console.log(req.body);
  db.sequelize
    .query(
      `INSERT INTO sit_file(sit_file_date,sit_no,purpose,type,remarks) VALUES ("${date}","${sitNo}","${purpose}","${type}","${remarks}")`
    )
    .then((results) => res.json({ success: true }))
      .catch((err) => res.status(500).json({ err }));
};
export const createUser= (req, res) => {
 const  { firstname,
    lastname,
    username,
    email,
    password,
    role,
    accessTo,
    department,
    position
   } =req.body
  console.log(req.body);
  db.sequelize
    .query(
      `INSERT INTO users(department,position, lastname, role, accessTo, username, email, password) VALUES ("${department}","${position}","${lastname}","${role}","${accessTo}","${username}","${email}","${password}")`
    )
    .then((results) => res.json({ success: true }))
      .catch((err) => res.status(500).json({ err }));
};
export const createLetterTemplate = (req, res) => {
  const {
    today,
    department,
    name,
    description,
    purpose,
    letter_body,
  } = req.body;
  console.log(req.body);
  db.sequelize
    .query(
      `INSERT INTO letter_template( template_date,department,name,description,purpose,letter_body) VALUES ("${today}","${department}","${name}","${description}","${purpose}",'${letter_body}')`
    )
    .then((results) => {
      res.json({ results });
    })
    .catch((err) => res.status(500).json({ err }));
};

export const createRateCharge = (req, res) => {
  console.log(req.body);
  db.sequelize
    .query(
      `call rate_charges("${req.body.area}","${req.body.owner}","${req.body.category}")`
    )
    .then((results) => {
      res.json({ results });
    })
    .catch((err) => res.status(500).json({ err }));
};

export const createDepartment = (req, res) => {
  const { date, department, description, location } = req.body;
  console.log(req.body);
  db.sequelize
    .query(
      `INSERT INTO department(department_date,department_code,description,location) VALUES ("${date}","${department}","${description}","${location}")`
    )
    // .then(() => {
    //   db.sequelize.query(
    //     `INSERT INTO departments_units(department_code,unit_name,unit_location) VALUES ("${department}","${unitName}","${req.body.unit_location}")`
    //   );
    // })
    .then((results) => res.json({ success: true, results }))
    .catch((err) => res.json({ success: false, err }));
};

export const createDepartmentunit = (req, res) => {
  const { data } = req.body;
  console.log(data);
  db.sequelize
    .query(
      `INSERT INTO departments_units(department_code,unit_name,unit_location) VALUES ${data
        .map((a) => '(?)')
        .join(',')}`,
      {
        replacements: data,
      }
    )
    // .then(() => {
    //   db.sequelize.query(
    //     `
    //       .map((a) => '(?)')
    //       .join(',')}`,
    //     {
    //       replacements: data,
    //     }
    //   );
    // })
    .then((results) => res.json({ success: true, results }))
    .catch((err) => {
      console.log(err);
      res.json({ success: false, err });
    });
};

export const createDirectors = (req, res) => {
  const { department, position, unit, position_name } = req.body;
  console.log(req.body);
  db.sequelize
    .query(
      `INSERT INTO directors(department,position,other_unit_name,other_position) VALUES ("${department}","${position}","${unit}","${position_name}")`
    )
    .then((results) => {
      res.json({ results });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
};
export const getDepartment = (req, res) => {
  db.sequelize
    .query('SELECT department_code FROM department')
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
};
export const getRegistry = (req, res) => {
  db.sequelize
    .query(
      'SELECT Acknolegment_id,registry_date,tag_no,remarks,inserted_by FROM registry where file_to="PS Secretary"'
    )
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
};

export const getRemarks = (req, res) => {
  const { tag_no } = req.params;
  db.sequelize
    .query(`SELECT remarks FROM remarks WHERE tag_no="${tag_no}" order by id`)
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
};

export const getDepartmentUnit = (req, res) => {
  const {} = req.params;
  db.sequelize
    .query('SELECT * FROM departments_units')
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
};

export const generatedId = (req, res) => {
  db.sequelize
    .query(
      'SELECT CONCAT(IFNULL(MAX(id), 0) + 1) AS acknowlegment FROM registry'
    )
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
};

export const updateRegistry = (req, res) => {
console.log(req.body)
  db.sequelize
    .query(
      `UPDATE registry set file_to="${req.body.ps}" where tag_no="${req.body.tagNo}"`
    )
    .then(() => {
      db.sequelize.query(
        `INSERT INTO remarks(tag_no, remarks) VALUES ("${req.body.tagNo}","${req.body.remark}")`
      );
    })
    .then((results) => res.json({ success: true, results }))
    .catch((err) => res.json({ success: false, err }));
};

export const getMailBadge = (req, res) => {
  db.sequelize
    .query('SELECT COUNT(file_to) as Ps FROM registry  WHERE file_to="Ps"')
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
};
export const getMailTable = (req, res) => {
  db.sequelize
    .query('SELECT * FROM registry  WHERE file_to="Ps"')
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
};

export const getLetterTemplateName = (req, res) => {
  db.sequelize
    .query(`SELECT name FROM letter_template`)
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
};

export const getLetterBody = (req, res) => {
  const { letter } = req.params;
  db.sequelize
    .query(`SELECT letter_body FROM letter_template where name="${letter}"`)
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
};
export const getGroundRent = (req, res) => {
  const { land,range } = req.params;
  db.sequelize
    .query(`call get_ground_rent(:land,:range)`,{
      replacements: {
        land,
        range
      }})
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
};

export const getUseRateCat = (req, res) => {
  db.sequelize
    .query(`SELECT DISTINCT land_use_rate_cat FROM ground_rent`)
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
};
export const getReviewRange = (req, res) => {
  db.sequelize
    .query(`SELECT DISTINCT review_range FROM ground_rent`)
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
};

export const getImagesURL = (req, res) => {
  const { id } = req.params;
  db.sequelize
    .query(`SELECT image_url FROM image_table WHERE id="${id}"`)
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
};
export const getImageRemark = (req, res) => {
  const { id } = req.params;
  db.sequelize
    .query(`SELECT remarks FROM remarks WHERE tag_no="${id}"`)
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
};
export const getDepartment_Position = (req, res) => {
  const { id } = req.params;
  db.sequelize
.query(`call get_department_position()`)
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
};