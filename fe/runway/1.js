function a(){
    let b = 0;
    {
        let b = 2;
        console.log(b);
        
    }
}
a();