var hfc = require('hfc');
var fs = require('fs');

// Create a client chain.
var chain = hfc.newChain("targetChain");

// Configure the KeyValStore which is used to store sensitive keys
// as so it is important to secure this storage.
chain.setKeyValStore(hfc.newFileKeyValStore('keyValStore-5874db24'));
var cert = fs.readFileSync('certificate.pem');

// Set the URL for member services
chain.setMemberServicesUrl("grpcs://5874db24-2d99-4ceb-9665-4b886e2c0753_ca.us.blockchain.ibm.com:30303", {
    pem: cert
});

// Add a peer's URL
chain.addPeer("grpcs://5874db24-2d99-4ceb-9665-4b886e2c0753_vp3.us.blockchain.ibm.com:443", {pem: cert});

// Enroll "WebAppAdmin" which is already registered because it is
// listed in fabric/membersrvc/membersrvc.yaml with it's one time password.
chain.enroll("WebAppAdmin", "8f8f5a4c17", function (err, webAppAdmin) {
    if (err) return console.log("ERROR: failed to register %s: %s", err);
    // Set this user as the chain's registrar which is authorized to register other users.
    chain.setRegistrar(webAppAdmin);
    // Begin listening for web app requests
    //  listenForUserRequests();
});