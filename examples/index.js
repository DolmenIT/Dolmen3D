djs.elements.path = "elements/";

let viewIndex = djs.views.setView("index");

let objGrid1 = djs.views.addObject("objGrid1", djs.objects.grid(viewIndex, { columns: ['minmax(19vw, 38vh)', 'auto'] }));
let objGrid2 = djs.views.addObject("objGrid2", djs.objects.grid(objGrid1.col(1), { rows: [6, 6, 88] }));
let objGrid3 = djs.views.addObject("objGrid3", djs.objects.grid(objGrid2.row(1), { columns: ['45%', '25%', '30%'] }));
let objLink1 = djs.views.addObject("objLink1", djs.objects.link(objGrid3.col(1), { text: "DolmenIT", link: "https://www.dolmenit.com/" }));
let objLink2 = djs.views.addObject("objLink2", djs.objects.link(objGrid3.col(2), { text: "docs", link: "https://djs.dolmenit.com/docs/" }));
let objLink3 = djs.views.addObject("objLink3", djs.objects.link(objGrid3.col(3), { text: "examples", link: "https://djs.dolmenit.com/examples/" }));
let objSearch = djs.views.addObject("objSearch", djs.objects.element(objGrid2.row(2), "search"));
let objScroll = djs.views.addObject("objScroll", djs.objects.scroll(objGrid2.row(3), { height: 90, scroll: 'vertical' }));

djs.file.fetchJSON("examples.json").then(data => {
    console.log(data);
    Object.keys(data).forEach(key => {
        djs.views.addObject(index, "objTileExample" + key, djs.objects.element(objScroll, "tileExample", data[key]))
    })
})
//EOF