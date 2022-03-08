const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require("validator");


//System Schema
const systemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please supply the App Name'],
        trim: true,
        maxlength: [40, 'The App Name must have less or equal than 40 characters'],
        minlength: [2, 'The App Name must have more or equal than 2 characters']
    },
    domain: {
        type: String,
        required: [true, 'Please supply the domain name this app is hosted on'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'We need your email'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email for the app']
    },
    phone: {
        type: String,
        required: [true, 'We need a phone number for the app'],
        trim: true,
        validate: [validator.isMobilePhone, 'Please provide a valid phone number']
    },
    notificationEmail: {
        type: String,
        required: [true, 'We need your email'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email for sending notifications']
    },
    notificationEmailPassword: {
        type: String,
        required: [true, 'Please supply the password for your Notification email Account'],
    },
    facebookPageLink: {
        type: String,
        required: false,
        lowercase: true,
        maxlength: [400, 'The App facebook page link must have less or equal than 400 characters'],
        minlength: [4, 'The App facebook page link must have more or equal than 2 characters']
    },
    twitterPageLink: {
        type: String,
        required: false,
        lowercase: true,
        maxlength: [400, 'The App twitter page link must have less or equal than 400 characters'],
        minlength: [4, 'The App twitter page link must have more or equal than 2 characters']
    },
    instagramPageLink: {
        type: String,
        required: false,
        lowercase: true,
        maxlength: [400, 'The App instagram page link must have less or equal than 400 characters'],
        minlength: [4, 'The App instagram page link must have more or equal than 4 characters']
    },
    address: {
        type: String,
        required: [true, 'Please we need an address for this brand'],
        maxlength: [200, 'The address must have less or equal than 200 characters'],
        minlength: [4, 'The address must have more or equal than 4 characters']
    },
    location:{
        //GeoJSON, For Geo Spacial Data, Data that describes location on the earth with longitude and latitude
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        //Array of numbers is expected  for the coordinates
        //It represents the coordinate point with longitude first followed by the latitude (reverse of the normal format)
        coordinates: [Number],
        address: String,
        description: String
    },
    city: {
        type: String,
        required: [true, 'Please supply your city'],
        maxlength: [20, 'The city must have less or equal than 20 characters'],
    },
    state: {
        type: String,
        required: [true, 'Please supply your state'],
        maxlength: [20, 'The state must have less or equal than 20 characters'],
    },
    country: {
        type: String,
        required: [true, 'Please supply your country'],
        maxlength: [20, 'The country must have less or equal than 20 characters'],
    },

    postcode: {
        type: Number,
        required: [true, 'we need your postal code to process packages'],
        // validate: [validator.isPostalCode, 'Please provide a valid postal code near you']
    },
    favicon: {
        type: String,
        default: 'system-icon.png'
    },
    icon: {
        type: String,
        default: 'system-icon.png'
    },

});

module.exports = mongoose.model('System', systemSchema);