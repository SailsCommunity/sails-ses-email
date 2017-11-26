/**
 * SesEmailController
 *
 * @description :: Server-side logic for managing Sesemails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    triggerEmail: function (req, res) {
        var mailBody = {
            recipientName: "Sailsit Develoepr",
            senderName: "Sailsit Admin"
        };
        SesEmailService.sendingSESMail("views/welcome.ejs", mailBody, "developer@sailsit.com", "SailsIt Welcome", function (err, message) {
            if(err) {
                sails.log.debug(err);
                res.serverError(message);
                return;
            }
            res.status(200);
            return res.send({
                "message": message
            });
        })
    }
	
};

