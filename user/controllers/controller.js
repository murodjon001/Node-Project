const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const {generateAccessToken} = require('../../middlware/auth');



exports.authorization = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({ error: error.array() });
  }
    const { lastName, firstName, email, password } = req.body;
    const validEmail = await prisma.user.findUnique({
        where: { email },
    });

    if (Boolean(validEmail)) {
      return res.status(422).json({ message: "User already exists" });
    }
    saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    
        await prisma.user.create({
          data: {
            firstName,
            lastName,
            email,
            password:hash,
          },
        });
        res.status(300).send("success");
}

exports.authentification = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({ error: error.array() });
  }
  const { email, password } = req.body;
  const validMail = await prisma.user.findUnique({
    where: {email},
  });

  if(!validMail){
    return res.status(422).json({msg: "This email undifined!"});
  }
  const hash = validMail.password;
  const hashpasswd = bcrypt.compareSync(password, hash); 
  if (!hashpasswd){
    return res.status(422).json({msg: "Check the password and re-enter it!"});
  }
  const token = generateAccessToken({...validMail})
  return res.json(token);
}

















// QO'LDA YOZILDAN VALIDATSYA MUVAFFAQIYATLI BAJARILDI!

// const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
// exports.authorization = async (req, res)=> {
//         const {lastName, firstName, email, password} = req.body;
//         if (lastName && firstName && password.length >= 8 && email !== '' && email.match(emailFormat)){
//             if (lastName.length >= 2 && firstName.length >= 2){
//                 const user = await prisma.user.findUnique({

//                     where:{
//                         email: email,
//                     },
//                 });
//                 try{
//                 if (user.email){
//                     res.status(401).send("Bad request");
//                 }
//                 }catch{
//                     // ma'lumotlarni databasega qo'shish kerak
//                     const create_user = await prisma.user.create({
//                         data:{
//                             firstName:firstName,
//                             lastName: lastName,
//                             email:email,
//                             password:password,
//                         },

//                     })
//                     res.status(300).send("Data accepted");
//                     console.log(create_user);
//                 }
//             }
//             else{
//                 res.status(402).send("Bad request");
//             }
//         }else{
//             res.status(403).send("Bad request");
//         }
//     }
