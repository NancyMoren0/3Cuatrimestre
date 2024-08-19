const ConectarBD=require("./ConectarBD");

class UsuarioBD extends ConectarBD{
    constructor(){
        super();
    }
    async nuevoUsuario(usuario1){
        const sql="insert into usuario values(null,'"+usuario1.nombre+"','"+usuario1.celular+"','"+usuario1.correo+"');";
        try {
            await this.conectarMySql(); 
            await this.conexion.execute(sql);
        console.log("Crea un nuevo usuario");
        await this.cerrarConexion();
    }catch (error) {
        console.log("Error al agregar usuario "+error);
           
        }
    }
    async mostrarUsuarios() {
        const sql="SELECT * FROM usuario;";
        try {
            await this.conectarMySql();
            const [UsuariosMySql]=await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Los datos se obtuvieron correctamente");
            
            return(UsuariosMySql);
        } catch (error) {
            console.error("Error al obtener los datos de los usuarios" + error);
            console.error(sql);
        }
    }
    async usuarioId(id){
        const sql="select * from usuario where idusuario="+id+";";
        try {
            await this.conectarMySql();
            const [[usuario]]=await this.conexion.execute(sql);
            await this.cerrarConexion();
           
            console.log("Consulta correcta por id");
            return usuario;
        } catch (error) {
          console.log("Error al consultar por id"+error);
          console.log(sql);  
        }
    }
    async editarusuario(usuario){
        const sql="UPDATE usuario SET nombre='"+usuario.nombre+"',celular='"+usuario.celular+
        "',correo='"+usuario.correo+"';"
        const sql2=`UPDATE usuario SET 
        nombre='${usuario.nombre}',
        celular='${usuario.celular}',
        correo='${usuario.correo}'
        WHERE idusuario=${usuario.idusuario};`;
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql2)
            await this.cerrarConexion();
            console.log("Actualizacion correcta del usuario ");
        } catch (error) {
            console.error("Error al editar usuario "+ error);
            console.error(sql2);
            
        }
      }

    async BorrarUsuario(idusuario){
        const sql="delete from usuario where idUsuario="+idusuario+ ";";
    
    try {
        await this.conectarMySql();
        await this.conexion.execute(sql);
        console.log("Usuario borrado");
        
    } catch (error) {
        console.log("Error al borrar usuario"+error);
        console.log(sql);
    } 
    }
}



module.exports=UsuarioBD