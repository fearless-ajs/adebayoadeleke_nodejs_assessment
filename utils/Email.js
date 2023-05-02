const EmailEngine = require('./EmailEngine');

module.exports = class Email extends EmailEngine {
   constructor(user, url) {
       super(user, url);
   }

    async sendWelcome () {
        await this.send('welcome', 'Welcome to the SportsPadi family');
    }

    async sendVerifiedAccountMessage () {
        await this.send('account_verified', 'Email account verified successfully');
    }


    async sendPasswordReset(){
        await this.send(
            'passwordReset',
            'Your reset password token (valid for only 10 minutes)'
        );
    }

    async sendPasswordUpdated(){
        await this.send(
            'passwordUpdated',
            'Password updated successfully'
        );
    }

};


