const reviewValidationSchema =  {
    body:{
        notEmpty:{
            errorMessage:"Body cannot be empty"
        },
        isLength:{
            options:{min:2,max:1000},
            errorMessage:"Body cannot be less than 1 and not greater than 1000"
        }
    },
    rating:{
        notEmpty:{
            errorMessage:"rating cannot be empty"
        },
        isFloat:{
            options:{min:0.5,max:5},
            errorMessage:"Rating cannot be less than 0.5 and not greater than 5"
        }
    },
    images: {

        custom: {
            options: async function (value, { req }) {
                if (req.files.length <=0 ) {
                    throw new Error("Please upload a profile picture");
                }
    
                const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                console.log('Uploaded file MIME type:', req.file.mimetype);
    
                if (!allowedTypes.includes(req.file.mimetype)) {
                    console.log(req.file.mimetype,"in if")
                    throw new Error('Picture should be in these formats: ' + allowedTypes.join(', '));
                }
    
                return true;
            }
        }
}}



module.exports = {reviewSchema:reviewValidationSchema}
     