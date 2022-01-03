//const Newsletter = require('../../models/newsletter')
const { handleError } = require('../../middleware/utils')

const mailchimp = require("@mailchimp/mailchimp_marketing")
const mailchimpConfig = require("../../../config/mailchimp.config");

mailchimp.setConfig(mailchimpConfig);
/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const subscribeNewsletter = async (req, res) => {
    try {
        const email = req.body.email;
      
        
            const listId = "2effcf823d";
         
            const resp = await mailchimp.lists.addListMember(listId, {
                email_address: email,
                status: 'subscribed',
                email_type: 'html'
            })
            res.status(200).send({ status: 200, message: "Successfully subscribed" })      

            // await Newsletter.create({
            //     email: email,
            //     isSubscribed: true
            // }).then(
            //     res.status(200).send({ status: 200, message: "Successfully subscribed" })
            // ).catch(Err => {
            //     console.log(Err)
            //     res.status(500).send({
            //         status: 500,
            //         message:
            //             Err.message || "Some error occurred while subscribing."
            //     });
            // });
        
    } catch (err) {
        // console.log(err.response.body);
        // console.log(err.response.statusCode, err.response.body.title)
        res.status(err.response.statusCode).send({message: err.response.body.title});   
        // handleError(res, err)
    }
}

const unsubscribeNewsletter = async (req, res) => {
    try {
        
        await Newsletter.find({ email: req.body.email })
            .then(() => {
                res.status(200).send({ status: 200, message: "Successfully unsubscribed" })
            }
            ).catch(Err => {
                console.log(Err)
                res.status(500).send({
                    status: 500,
                    message:
                        Err.message || "Some error occurred while unsubscribing."
                });
            });


    } catch (error) {
        console.log(error)
        handleError(res, error)
    }
}

module.exports = { subscribeNewsletter, unsubscribeNewsletter }