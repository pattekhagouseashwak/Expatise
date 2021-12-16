const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const BidderSchema = new mongoose.Schema(
  {
    FirstName   :{type:String},

    LastName    :{type:String},

    UserName    :{type:String},

    StreetAddress:{type:String},

    City         :{type:String},

    State        :{type:String},

    Country      :{type:String},

    ZipCode      :{type:String},

    // Email: {type: String,unique: [true, "Email is already present  "],
    //   validate(value) {
    //     if (!validator.isEmail(value)) {
    //       throw new error("Invalid Email");
    //     }
    //   },
    // },

    Email : {type:String},

    Email_otp          :{type:String},

    Email_Expiry_time :{type:Date},

    is_EmailVerified :{type:Boolean, default:false},

    Phone        :{type:Number, required:true},

    otp          :{type:String,required:true},

    Expiry_time :{type:Date,required:true},

    is_PhoneVerified :{type:Boolean, default:false},

    DrivingLicenseNo:{type:String},

    DrivingLicensePhoto:{type:String},

    password:{type:String},

    BidderID:{type:String}
  },
  {
    versionKey: false,
    timestamps: true
  }
)

BidderSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Bidder',BidderSchema)
