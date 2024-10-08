const ruta=require("express").Router(); 
const UsuarioClase=require("../clases/UsuarioClase");
const UsuarioBD=require("../bd/UsuariosBD")

ruta.get("/", async(req, res)=>{
    const usuariobd= new UsuarioBD();
    const UsuariosMySql=await usuariobd.mostrarUsuarios();  
    var usuariosCorrectos=[];
    UsuariosMySql.forEach(usuario => {
        var usuario1= new UsuarioClase(usuario);
        if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
            usuariosCorrectos.push(usuario);
        } 
    });
    console.log(usuariosCorrectos);
    res.render("mostrarUsuarios", {usuariosCorrectos} );
    });
   

ruta.post("/agregarUsuario",(req, res)=>{ 
    var usuario1=new UsuarioClase(req.body);
    if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
        const usuariobd=new UsuarioBD();
        usuariobd.nuevoUsuario(usuario1.mostrarDatos);
        //console.log(usuario1.mostrarDatos);
        res.render("inicio", usuario1.mostrarDatos);
    }
    else{
        res.render("error"); 
    }
});

ruta.get("/agregarUsuario",(req,res)=>{
    res.render("formulario");

});



ruta.get("/editarUsuario/:idusuario",async(req,res)=>{
    
    try {
        const usuariobd= new UsuarioBD();
        const usuario= await usuariobd.usuarioId(req.params.idusuario);
        //console.log(usuario);
        res.render("editarUsuario", usuario)
    } catch (error) {
        console.log(error);
        res.end();
    
    }
   

});


ruta.post("/editarUsuario",async(req,res)=>{
    try {
        const usuariobd=new UsuarioBD();
        await usuariobd.editarUsuario(req.body); 
        console.log("Usuario editado correctamente");
        res.redirect("/"); 
    } catch (error) {
        console.log("Error al editar el usuario");
    }
});

ruta.get("/BorrarUsuario/:id",async(req,res)=>{
    try {
        const usuariobd=new UsuarioBD();
         await usuariobd.BorrarUsuario(req.params.id);
         res.redirect("/");
         console.log("Usuario eliminado correctamente");
    } catch (error) {
        console.log(error);
    }
});


module.exports=ruta;