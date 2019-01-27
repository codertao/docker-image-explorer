const drc = require('docker-registry-client');

var rat = drc.parseRepoAndTag("python:3.6");

console.log(JSON.stringify(rat, null, 4));


var client = drc.createClientV2({
	repo: rat,
});

client.getManifest({ref: rat.tag }, function(err, manifest, res, manifestStr) {
	if(err) { console.error(err); return; }
	console.log("response headers: ");
	console.log(JSON.stringify(res.headers, null, 4));
	
	console.log("\nmanifestStr: ");
	console.log(manifestStr);

	console.log("\nmanifest: ");
	console.log(JSON.stringify(manifest, null, 4));

	if(manifest.history) {
		console.log("History: ");
		manifest.history.forEach(h=>{
			if(h.v1Compatibility) {
				var desc = JSON.parse(h.v1Compatibility);
				console.log(JSON.stringify(desc, null, 4));
			} else {
				console.log("Unknown history obj");
			}
		});
	}
	if(manifest.fsLayers) {
		console.log("Layers:");
		manifest.fsLayers.forEach(l=>{
			if(l.blobSum) {
				console.log(l.blobSum);
			} else {
				console.log("Unknown layer");
			}
		});
	}
	
	client.close();
});



