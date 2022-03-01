const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const AuctioneerSchema = new mongoose.Schema(
  {
    CompanyName :{type:String},
    
    FirstName   :{type:String},

    LastName    :{type:String},

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

    Email : { type: String, index:true,sparse:true},

    Email_otp          :{type:String},

    Email_Expiry_time :{type:Date},

    is_EmailVerified :{type:Boolean, default:false},

    Phone        :{type:String, required:true},

    AlternateContact:{type:String},

    otp          :{type:String,required:true},

    Expiry_time :{type:Date,required:true},

    is_PhoneVerified :{type:Boolean, default:false},

    Photo:{type:String},

    AuctioneerID:{type:String},

    AuctioneerLicensceNo:{type:String},

    AuctioneerLicenscePhoto:{type:Object},

    AuctioneerBio:{type:Object},

    Website:{type:String, default:null},

    facebook:{type:String, default:null},

    youtube:{type:String, default:null},

    instagram:{type:String, default:null},

    linkedin:{type:String, default:null},

    password:{type:String},

    tickerSymbol: {type:String},

    subscribedNewsletter:{type:Boolean, default: false},
    
  },
  {
    versionKey: false,
    timestamps: true
  }
)

AuctioneerSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Auctioneer',AuctioneerSchema)
