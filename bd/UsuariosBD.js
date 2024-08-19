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
        console.error(sql);    
        }
    }
    async mostrarUsuarios() {
        const sql="SELECT * FROM usuario;";
        try {
            await this.conectarMySql();
            const [UsuariosMySql]=await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Los datos se obtuvieron correctamente");
            console.log(UsuariosMySql);
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
    async editarUsuario(usuario1){
        const sql="UPDATE usuario SET nombre='"+usuario1.nombre+"',celular='"+usuario1.celular+"',correo='"+usuario1.correo+"';"
        const sql2=`UPDATE usuario SET 
        nombre='${usuario1.nombre}',
        celular='${usuario1.celular}',
        correo='${usuario1.correo}'
        WHERE idusuario=${usuario1.idusuario};`;
        try {
            await this.conectarMysql();
            await this.conexion.execute(sql)
            await this.cerrarConexion();
            console.log("Actualizacion correcta del usuario ");
        } catch (error) {
            console.error("Error al editar usuario "+ error);
            console.error(sql);
            
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