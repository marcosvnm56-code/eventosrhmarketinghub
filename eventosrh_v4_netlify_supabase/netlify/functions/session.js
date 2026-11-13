const {json,verified}=require('./_shared');
exports.handler=async event=>json(200,{authenticated:verified(event)});
