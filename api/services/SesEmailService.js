module.exports = {

    /**
     * Creating Formatted HTML Mail
     * Sending using SES
     * @param path : absolute path of the email template
     * @param data: email data json object which will be used in template
     * @param email: email id of receiver
     * @param subject: subject of email id
     **/
    sendingSESMail: function(path, data, email, subject, cb) {
        var ses = require('node-ses');
        var ejs = require('ejs');
        var s3Key = ""; //add your s3 key here
        var s3Secret = ""; //Add your s3 secret here
        var s3Region = ""; //Add your s3 Region here
        var client = ses.createClient({ key: s3Key, secret: s3Secret, amazon: s3Region });
        ejs.renderFile(
            path,
            data,
            {},
            function(err, str){
                client.sendEmail({
                    to: email,
                    from: "no-reply@sailsit.com", //from email
                    subject: subject,
                    message: str
                }, function (err, data, res) {
                    sails.log.debug(err || "Email is sent");
                    if(err) {
                        cb(err, "Unable to send email");
                        return;
                    }
                    cb(null, "Email sent");
                });
            });
    },

}