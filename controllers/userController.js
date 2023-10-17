require("dotenv").config()
const bcrypt   = require("bcrypt")
const db       = require("../db/db")
const jwt      = require("jsonwebtoken")

const Users    = db.Mongoose.model("user", db.userSchema, "user") 

const registerUser = async (req,res)=>{
    const {userFirstName, userLastName, userPhone} = req.body
    const userPassword = await bcrypt.hash(req.body.userPassword, 10)
    if(!userFirstName && userLastName && ! userPassword && !userPhone ){res.send("Preencha corretamente!")}
	
	const users = new Users({userFirstName, userLastName, userPassword, userPhone})

	const userExist = await Users.findOne({userPhone: userPhone})
	if(userExist){
		return res.status(402).json({"msg":"celular em uso"})
	}
    
    try{
        users.save()
    }catch(err){
        console.log(err)
    }
}

const loginUser = async (req, res) => {

	const { userPhone, userPassword } = req.body;
	if (!userPhone) {
		return res.status(404).json({msg: 'Numero de telefone é obrigatório!'})
	}

	if (!userPassword) {
		return res.status(404).json({ msg: 'A senha é obrigatória!' })
	}

	const user = await Users.findOne({ userPhone: userPhone })
	
	try{
		if (!user) {
			return res.status(404).json({ msg: 'Usuario não encontrado!!' })
		}
	}catch(err){
		console.log(err)
	}
	try {
		const passExist =  await bcrypt.compare(userPassword, user.userPassword)
		if (!passExist) {
			return res.status(404).json({ msg: 'Usuário e/ou senha não conferem' })
		}
	} catch (err) {
		return res.status(404)
	}
	try {
		const secret = process.env.SECRET
		const token = jwt.sign({ name: user.userFirstName }, secret)
		console.log(token)
		res.json(token)
		
		
	} catch (err) {
		return res.status(404)
    }
}

const checkToken = async (req, res, next) => {

	const {token} = req.body;
	console.log("token", token)
	if(!token) res.redirect("/loginUser")

try{
	jwt.verify(token, process.env.SECRET, function (err, decoded) {
		if (err) console.log(err) 

		req.name = decoded.name

		next()
	})
}catch(err){
	console.log(err)
}

}

module.exports={registerUser, loginUser, checkToken}