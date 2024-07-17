const License = require("../models/license-model")
const crypto = require("crypto")



const licenseCltr = {

}


licenseCltr.createKey =async (req,res,next)=>{

    const {orderId} = req.body
    try {
        const newLicenseKey = new License({
            orderId:orderId,
            licenseKey:crypto.randomBytes(16).toString('hex'),
            isActive: true,
            expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            userId:req.user.id
        })

        await newLicenseKey.save()
        // return newLicenseKey
        return res.status(201).json({
            data:newLicenseKey,
            msg:"Successfully created the License key"
        })

    
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error:error,
            msg:"Something went wrong on backend"
        })
    
    }

}
