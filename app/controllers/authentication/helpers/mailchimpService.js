const appInfo = require('../../../../settings.json')
const { handleError } = require('../../../middleware/utils')
const request = require('superagent');//   mailchimp
var fs = require('fs');

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const mailchimpService = async(email,firstName,lastName)=>{

    try{
    const mailchimpInstance   = appInfo.mailchimpInstance;
    const listUniqueId        = appInfo.listUniqueId;
    const mailchimpApiKey     = appInfo.mailchimpApiKey ;

    request
        .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer.from('any:' + mailchimpApiKey ).toString('base64'))
        .send({
          'email_address': email,
          'status': 'subscribed',
          'merge_fields': {
          'FNAME': firstName,
          'LNAME': lastName
        }
         })
        .end((err, response)=>{
          if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
            console.log(firstName+" "+lastName+" "+email+" "+'Signed Up!');
          } else {
                    const time = new Date();
                    let error = ('\nSign Up Failed :( user details: '+firstName+" "+lastName+" "+email+" "+time);
                    fs.appendFile('log.txt', error, (err)=>{
                        if (err) {
                          // append failed
                        } else {
                          // done
                        }
                      })
                    //console.log(error);
          }
          });
        }catch (error) {
            console.log(error)
            handleError(res, error)
        }
  }

  module.exports ={mailchimpService}