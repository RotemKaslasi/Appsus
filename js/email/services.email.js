'use strict'

// import utilService from './util.service.js'

import storageService from '../services/storage.service.js'
import utilService from '../services/util.service.js'


const KEY = 'emailAppKey';

function query() {
    return storageService.load(KEY)
        .then(emails => {
            // if (!emails || !emails.length) {
            //     // emails = _createInitialEmails();
            //     storageService.store(KEY, emails);
            // }
            console.log('Emails: ', emails);
            return emails;
        })
}

function getEmailById(emailId) {
    return storageService.load(KEY)
        .then(emails => {
            return emails.find(email => email.id === emailId);
        })
}

function deleteEmail(emailId) {
    return storageService.load(KEY)
        .then(emails => {
            var emailIdx = emails.findIndex(email => email.id === emailId);
            emails.splice(emailIdx, 1);
            return storageService.store(KEY, emails);
        })
}


function saveEmail(email) {
    return storageService.load(KEY)
        .then(emails => {
            // Update
            if (email.id) {
                var emailIdx = emails.findIndex(currEmail => currEmail.id === email.id)
                emails.splice(emailIdx, 1, email);
            } else {
                // Add
                if (!emails) emails = [];
                email.id = utilService.makeId();
                email.sendAt = Date.now();
                email.isRead = false;
                emails.push(email);
            }
            return storageService.store(KEY, emails);
        });
}


function getEmailStatus() {
    return storageService.load(KEY)
        .then(emails => {
            if (!emails) return;
            var readEmails = emails.filter(email => {
                return email.isRead
            })
            return readEmails.length / emails.length;
        });
}


function _createInitialEmails() {
    return [_createInitialEmail(), _createInitialEmail(), _createInitialEmail(), _createInitialEmail()];
}



function _createInitialEmail() {
    return {
        id: utilService.makeId(),
        sendAt: utilService.getRandomInt(112000, 50000000),
        isRead: false,
        body: utilService.makeLorem(100),
        subject: utilService.makeLorem(3)
    }

}


export default {
    query,
    getEmailById,
    deleteEmail,
    saveEmail,
    getEmailStatus,
}
