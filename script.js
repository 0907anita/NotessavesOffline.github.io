if(!localStorage.getItem('data')){
    var json = {
        'total':0,
        'count':0
    }
    localStorage.setItem('data',JSON.stringify(json));
    console.log("just added");
}
else{
    console.log('already exist');
}

var boxes_st="";
var flag=""

function edit(x){
    
    alert("editing "+x);
    localStorage.setItem('toEdit',x);
    window.location.replace('./edit.html');


}

function view(x){
    localStorage.setItem('toEdit',x);
    window.location.replace('./view.html');
}
function del(x){
    console.log("deleting "+x);
    const load_data=document.getElementById('load_data');
    var store_data=JSON.parse(localStorage.getItem('data'));
    var deleting_node=store_data[x];
    deleting_node['status']=0;
    alert(deleting_node['title']+" deleted...");
    console.log(deleting_node);
    window.location.replace("./index.html");
    store_data[x]=deleting_node;
    store_data['count']-=1;
    localStorage.setItem('data',JSON.stringify(store_data));

}

function edit_save(){
    var editing_id=localStorage.getItem('toEdit');
    var store_data=JSON.parse(localStorage.getItem('data'));
    if(editing_id!=null&&editing_id<=store_data['total']&&store_data[editing_id]['status']==1){
       
        var editing_node=store_data[editing_id];
        var editing_title=document.getElementById('basic-title');
        var editing_txt=document.getElementById('txtarea');

        var edited_title=editing_title.value;
        var edited_txt=editing_txt.value;
        editing_node['title']=edited_title;
        editing_node['txt']=edited_txt;
        store_data[editing_id]=editing_node;
        localStorage.setItem('data',JSON.stringify(store_data));
        alert("saved");
        

    }
    else{
        window.location.replace('index.html');
    }
}

function edit_save_return(){
    edit_save();
    localStorage.setItem('toEdit',0);
    window.location.replace('./index.html');
}


function load_each_node(node){
    console.log(node);
    var content=document.createElement('div');
    content.setAttribute('class','boxes-in-content');
    var content11=document.createElement('div');
    
    content11.setAttribute('class','boxes-in-content-new');
    content11.innerHTML=node['txt'];
    content.appendChild(content11);
    

    var btns=document.createElement('div');
    btns.setAttribute('class','btns');
    var st1="edit("+node['id']+")";
    var btn_i1=document.createElement('i');
    btn_i1.setAttribute('class','fa fa-edit w3-xxlarge');
    btn_i1.setAttribute('onclick',st1);
    var btn_i2=document.createElement('i');
    btn_i2.setAttribute('class','fa fa-trash w3-xxlarge');
    var btn_i3=document.createElement('i');
    st2="del("+node['id']+")";
    btn_i2.setAttribute('onclick',st2);
    btn_i3.setAttribute('class','material-icons');
    btn_i3.innerHTML="receipt";
    var st3="view("+node['id']+")";
    btn_i3.setAttribute('onclick',st3);
    btn_i3.setAttribute('style','font-size:30px');

    btns.appendChild(btn_i3);
    btns.appendChild(btn_i1);
    btns.appendChild(btn_i2);


    var content_title=document.createElement('div');
    content_title.setAttribute('class','title');
    var node_title=node['title'];
    if(node_title.length>28)node_title=node_title.substring(0,28)+".."
    content_title.innerHTML=node_title;

    var boxes_in_title=document.createElement('div');
    boxes_in_title.setAttribute('class','boxes-in-title');
    boxes_in_title.appendChild(content_title);
    boxes_in_title.appendChild(btns);


    var boxes_in=document.createElement('div');
    boxes_in.setAttribute('class','boxes-in');
    boxes_in.appendChild(boxes_in_title);
    boxes_in.appendChild(content);


    var boxes=document.createElement('div');
    boxes.setAttribute('class',boxes_st);
    boxes.appendChild(boxes_in);
    document.getElementById('load_data').appendChild(boxes);
    


}
function view_to_edit(){
    var edit_id=localStorage.getItem('toEdit');
    edit(edit_id);
}
function view_to_home(){
    window.location.replace('./index.html');
}
function index_create_new(){
    console.log("creating new...");
    var store_data=JSON.parse(localStorage.getItem('data'));
    var new_id=store_data['total']+1;
    var new_node={
        'id':new_id,
        'title':'Title goes here...',
        'txt':'Notes goes here...',
        'status':1
    }
    store_data[new_id]=new_node;
    store_data['total']+=1;
    store_data['count']+=1;
    localStorage.setItem('data',JSON.stringify(store_data));

    edit(new_id);

}


function index_load_data(){
    const load_data=document.getElementById('load_data');
    var store_data=JSON.parse(localStorage.getItem('data'));

    var total=store_data['total'];
    var editing= localStorage.getItem('toEdit');
    for(var i=1;i<=total;i++){
        var node=store_data[i];
        console.log(node);
        console.log("....."+editing);
        if(node['status']=='1'&&(flag=='index.html'||(flag=='edit.html'&&editing!=node['id'])||(flag=='view.html'&&editing!=node['id']) ))load_each_node(node);
    }
}


function edit_load_data(){
    var editing_id=localStorage.getItem('toEdit');
    var store_data=JSON.parse(localStorage.getItem('data'));
    if(editing_id!=null||editing_id<store_data['total']){
       
        var editing_node=store_data[editing_id];
        var editing_title=document.getElementById('basic-title');
        var editing_txt=document.getElementById('txtarea');

        editing_title.value=editing_node['title'];
        editing_txt.innerHTML=editing_node['txt'];
        if(flag=='view.html'){
            editing_title.disabled=true;
            editing_txt.disabled=true;
        }
    }
    else{
        window.location.replace('./index.html');
    }
}

function home(){
    window.location.replace('./index.html');
}
var path=window.location.pathname;
fname=path.substring(path.lastIndexOf('/')+1);
flag=fname
if(fname=='index.html'){
    boxes_st="col-md-4 boxes";
    localStorage.setItem('toEdit',0);
    index_load_data();
}


if(fname=='edit.html'){
    
    var editing=localStorage.getItem('toEdit');
    var total=JSON.parse(localStorage.getItem('data'))['total'];
    if(editing==null||(editing>total)){
        alert("Nothing to edit");
        window.location.replace("./index.html");
    }
    boxes_st="col-md-12 boxes"
    index_load_data();
    edit_load_data();
}



if(fname=='view.html'){
    
    var editing=localStorage.getItem('toEdit');
    var total=JSON.parse(localStorage.getItem('data'))['total'];
    if(editing==null||(editing>total)){
        alert("Nothing to view");
        window.location.replace("./index.html");
    }
    boxes_st="col-md-12 boxes"
    index_load_data();
    edit_load_data();
}

