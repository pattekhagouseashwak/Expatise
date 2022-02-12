const Bid = require('../../models/bid')
const csvwriter = require('csv-writer')
const fs = require('fs')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const downladBidRequest = async (req, res) => {
    try {

        if (req.body.auctionId.length == 0) {
            return res.status(400).send({ status: 400, message: "auctionId can't be empty!!" })
        }
        const auctionId = req.body.auctionId;
        await Bid.find({ auctionId: auctionId })
            .then(async (data) => {
                if (data.length == 0) {
                    res.status(200).send({ status: 200, message: "Successfully fetch Bid Request for respective auction List!!" })
                }
                else {
                    var createCsvWriter = csvwriter.createObjectCsvWriter

                    // Passing the column names intp the module
                    const csvWriter = createCsvWriter({

                        // Output csv file name is geek_data
                        //path: 'BiddingRequest_data.csv',
                        path: `${__dirname}/download/BiddingRequest_data.csv`,
                        header: [
                            // Title of the columns (column_names)
                            { id: 'category', title: 'category' },
                            { id: 'auctionType', title: 'auctionType' },
                            { id: 'BidderName', title: 'BidderName' },
                            { id: 'BidderEmail', title: 'BidderEmail' },
                            { id: 'BidderContact', title: 'BidderContact' },
                        ]
                    });

                    await csvWriter
                        .writeRecords(data)
                        .then(() => console.log('Data uploaded into csv successfully'));

                    const fileName = 'BiddingRequest_data.csv';

                    const directoryPath = `${__dirname}/download/`;

                    // fs.readdir(directoryPath, function (err, files) {
                    //     if (err) {
                    //       res.status(500).send({
                    //         message: "Unable to download file!",
                    //       });
                    //     }
                    
                    //     let fileInfos = [];
                    
                    //     files.forEach((file) => {
                    //       fileInfos.push({
                    //         name: file,
                    //         url: baseUrl + file,
                    //       });
                    //     });
                    
                    //     res.status(200).send(fileInfos);
                    //   });

                    res.download(directoryPath + fileName, fileName, (err) => {
                        if (err) {
                          res.status(500).send({
                            message: "Could not download the file. " + err,
                          });
                        }
                      });

                    // res.attachment(directoryPath + fileName, fileName, (err) => {
                    //     if (err) {
                    //       res.status(500).send({
                    //         message: "Could not download the file. " + err,
                    //       });
                    //     }
                    //   }).send()

                    }

            })
            .catch(Err => {
                res.status(500).send({
                    status: 500,
                    message:
                        Err.message || "Some error occurred while fetch Bid Request for respective auction List."
                });
            });


    } catch (error) {
        console.log(error)
        handleError(res, error)
    }
}

module.exports = { downladBidRequest }