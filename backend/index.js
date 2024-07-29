require("dotenv").config()

const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const cron = require("node-cron")
const multer = require('multer')
const path = require("path")
const { checkSchema } = require("express-validator")
const cookieParser = require("cookie-parser")

const app = express()


//db on
const db = require("./config/db")
db()

//middlewares
const { authenticateUser, authorizeUser } = require("./app/middlewares/auth")

//validations
const categoryValidationSchema = require("./app/validation/category-validation")
const { userRegSchema, userLoginSchema } = require("./app/validation/user-validation")

//Controllers
const userCltr = require("./app/controllers/userCltr")
const categoryCltr = require("./app/controllers/categoryCltr")
const productCltr = require("./app/controllers/productCLtr")
const cartCltr = require("./app/controllers/cartCltr")
const orderCltr = require("./app/controllers/orderCltr")
const profileCltr = require("./app/controllers/profielCltr")


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Uploads/images')
    },
    filename: (req, file, cb) => {
        const uniqueDateName = `${Date.now()}__${file.originalname}`
        cb(null, uniqueDateName)
        // cb(null,Date.now()+file.filename+"__"+Date.now()+path.extname(file.originalname))
    }
})

const staticpath = path.join(__dirname, "/Uploads/images")

const upload = multer({ storage: storage })

app.use("/Uploads/images", express.static(staticpath))

// http://localhost:3333/Uploads/images/1714713253535__p2.png


app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use(express.static("public")) // public visible when in local file
// app.use(morgan('combined'))


//user


// register
app.post("/api/user/register", checkSchema(userRegSchema), userCltr.register)

//login
app.post("/api/user/login", checkSchema(userLoginSchema), userCltr.login)

//profile
app.put("/api/profile/:profileId", authenticateUser, profileCltr.update)

//updating the existing the profile with new information
app.put("/api/profile", checkSchema)


//category
app.post("/api/category",authenticateUser, authorizeUser(["SuperAdmin", "Admin"]), upload.single("image"), categoryCltr.create) 
app.put("/api/category/:categoryId",authenticateUser, authorizeUser(["SuperAdmin", "Admin"]),upload.single('image'),categoryCltr.update)

//product

//creating the products by admin
app.post("/api/product", upload.single("images"), authenticateUser, authorizeUser(["SuperAdmin"]), productCltr.create)
//updating the product by admin
app.put("/api/product/:productId", upload.single("images"), authenticateUser, authorizeUser(["SuperAdmin"]), productCltr.update)

//get all products
app.get("/api/products", authenticateUser, productCltr.getAll)
//cart

//Adding the products to Cart
app.put("/api/cart", authenticateUser, authorizeUser(["Customer"]), cartCltr.addProducts)


//order checkout
app.post("/api/order", authenticateUser, authorizeUser(["Customer"]), orderCltr.create)

//creating the order using the cart items
app.post


//payment model

app.post("/api/payment")


//review model

app.post("/api/review/:productId")




app.listen(process.env.PORT, () => {
    // Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

    console.log("Server On!", process.env.PORT)
})