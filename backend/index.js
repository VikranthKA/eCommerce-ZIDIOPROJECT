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

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }))

//   console.log(process.env.FRONTEND_URL,"url")

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL)
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  });
  



//db on
const db = require("./config/db")
db()

//middlewares
const { authenticateUser, authorizeUser } = require("./app/middlewares/auth")

//validations
const categoryValidationSchema = require("./app/validation/category-validation")
const { userRegSchema, userLoginSchema } = require("./app/validation/user-validation")
const { reviewSchema } = require("./app/validation/review-validation")

//Controllers
const userCltr = require("./app/controllers/userCltr")
const categoryCltr = require("./app/controllers/categoryCltr")
const productCltr = require("./app/controllers/productCltr")
const cartCltr = require("./app/controllers/cartCltr")
const orderCltr = require("./app/controllers/orderCltr")
const profileCltr = require("./app/controllers/profielCltr")
const reviewCltr = require("./app/controllers/reviewCltr")
const paymentCltr = require("./app/controllers/paymentCltr")


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Uploads/images')
    },
    filename: (req, file, cb) => {
        const uniqueDateName = `${Date.now()}__${file.originalname}`
        // cb(null, uniqueDateName)
        cb(null,Date.now()+file.filename+"__"+Date.now()+path.extname(file.originalname))
    }
})

const staticpath = path.join(__dirname, "/Uploads/images")

const upload = multer({ storage: storage })

app.use("/Uploads/images", express.static(staticpath))

// http://localhost:3333/Uploads/images/1714713253535__p2.png


app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.json())
app.use(express.static("public")) // public visible when in local file
// app.use(morgan('combined'))


//user



// register
app.post("/api/user/register", checkSchema(userRegSchema), userCltr.register)

//login
app.post("/api/user/login", checkSchema(userLoginSchema), userCltr.login)

//profile
app.put("/api/profile",upload.single("profilePic"), authenticateUser,authorizeUser(["SuperAdmin", "Customer"]),profileCltr.update)
app.get("/api/profile",authenticateUser,authorizeUser(["SuperAdmin", "Customer"]),profileCltr.getOne)
app.put("/api/profile/address",authenticateUser,authorizeUser(["Customer",]),profileCltr.addAddress)
app.put("/api/profile/address/:addressId",authenticateUser,authorizeUser(["Customer",]),profileCltr.updateAddress)

//updating the existing the profile with new information
app.put("/api/profile", checkSchema)


//category
app.post("/api/category",authenticateUser, authorizeUser(["SuperAdmin", "Admin"]), upload.single("image"), categoryCltr.create) 
app.put("/api/category/:categoryId",authenticateUser, authorizeUser(["SuperAdmin"]),upload.single('image'),categoryCltr.update)
app.get("/api/category",authenticateUser,authorizeUser(["SuperAdmin","Customer"]),categoryCltr.getAll)
app.delete("/api/category/:categoryId",authenticateUser,authorizeUser(["SuperAdmin"]),categoryCltr.delete)

//product

//creating the products by admin  
app.post("/api/product", upload.single("images"), authenticateUser, authorizeUser(["SuperAdmin"]), productCltr.create)
//updating the product by admin
app.put("/api/product/:productId", upload.single("images"), authenticateUser, authorizeUser(["SuperAdmin"]), productCltr.update)

//get all products
app.get("/api/products", productCltr.getAll)

app.get("/api/product/:productId",productCltr.getOne)


//cart
app.get("/api/cart", authenticateUser, authorizeUser(["Customer"]), cartCltr.cartItems)
//Adding the products to Cart
app.put("/api/cart", authenticateUser, authorizeUser(["Customer"]), cartCltr.addProducts)
app.put("/api/cart/:productId",authenticateUser, authorizeUser(["Customer"]),cartCltr.removeProduct)


//order checkout
app.post("/api/order", authenticateUser, authorizeUser(["Customer"]), orderCltr.create)
app.get("/api/order",authenticateUser,authorizeUser(["Customer"]),orderCltr.getOrders)

//creating the order using the cart items
app.post


//payment model 

app.post("/api/order/:orderId/payment",authenticateUser,authorizeUser(["Customer"]),paymentCltr.paymentCheckoutSession)
app.put("/api/order/update-payment",authenticateUser,authorizeUser(["Customer"]),paymentCltr.updatedPayment)

//review model
app.post("/api/product/:productId/review",upload.array("images",3),authenticateUser,authorizeUser(['Customer',"SuperAdmin"]),reviewCltr.createReviewForProduct)
app.put("/api/product/:productId/review/:reviewId",upload.array("images",3), authenticateUser, authorizeUser(['Customer',"SuperAdmin"]),reviewCltr.updateReviewForProduct);
app.delete("/api/product/:productId/review/:reviewId", authenticateUser, authorizeUser(['Customer',"SuperAdmin"]),reviewCltr.deleteReviewForProduct )





app.listen(process.env.PORT, () => {
    // Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

    console.log("Server On!", process.env.PORT)
})



