const posts=[{title:'POST1'}];
let lastActivityTime =null;

function createPost(post){
    return new Promise(function (resolve, reject){
        setTimeout(function(){
            posts.push(post);
            resolve();
        }, 1000);
    });
}
function create2ndPost() {
    return createPost({ title: 'POST2' });
}
function create3rdPost() {
    return createPost({ title: 'POST3' });
}
function deletePost() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (posts.length > 0) {
                const poppedElement = posts.pop();
                resolve(poppedElement);
            } else {
                reject("ERROR");
            }
        }, 1000);
    });
}

function updateUserActivity(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            lastActivityTime=new Date();
            resolve();
        }, 1000)
    })
}

create2ndPost().then(()=>{
    return Promise.all([create3rdPost(),updateUserActivity()]);
})
.then(()=>{
    posts.forEach((post)=>{
        console.log(post.title);
    });
    console.log("Last user activity time:",lastActivityTime);
    return deletePost();
})
.then(()=>{
    console.log("Deleted last post");
        console.log("New set of posts:");
        posts.forEach((post) => {
            console.log(post.title);
        });

})
.catch((err) => console.error(err));