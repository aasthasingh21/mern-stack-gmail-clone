
export const API_URLS = {  // is the information/what the api will contain
    saveSentEmail: {
        endpoint: 'save',
        method: 'POST'
    },
    getEmailFromType: {
        endpoint: 'emails',
        method: 'GET'
    },
    saveDraftEmail: {
        endpoint: 'save-draft',
        method: 'POST'
    },
    moveEmailToBin: {
        endpoint: 'bin',
        method: 'POST'
    },
    taggleStarredEmail: {
        endpoint: 'starred',
        method: 'POST'
    },
    deleteEmail: {
        endpoint: 'delete',
        method: 'DELETE'
    }
}