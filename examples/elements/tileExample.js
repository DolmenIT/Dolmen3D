let params = djs.params.getAll();

let dom_parent = params.dom_parent;

let objSearch = djs.views.addObject("objSearch", djs.objects.link(dom_parent, { text: params.name, link: params.link }));