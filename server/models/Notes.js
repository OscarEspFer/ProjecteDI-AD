var db=require('../db/database');
class Notes{

    mydb=new db.Database();

    constructor(){}




    getNotes(id,res){
        let conn=this.mydb.getConnection();
        let sql="SELECT * FROM notes as n, assignatura as a WHERE (n.id_alumne = ? and n.id_assig = a.id_assig) "
        conn.query(sql,[id],(err,results)=>{
            if (err){
                console.log(err)
                res.status(400).send({
                    OK:false,
                    error:"Error al buscar notes"
                });
            }
            else{
                var notes = []
                results.forEach(element => {
                    notes.push({
                        nota: element.nota,
                        id_assig: element.id_assig,
                        cod_assig: element.cod_assig,
                        links: {
                            get: "GET https://localhost:5555/assignatura/"+element.id_assig
                        }
                    })
                });
                res.status(200).send({
                    OK: true,
                    notes: notes
                })
            }
        })
    }
    getNota(id,id_assig,res){
        let conn=this.mydb.getConnection();
        let sql = "SELECT * FROM notes as n, assignatura as a WHERE (n.id_alumne = ? and n.id_assig = a.id_assig and a.id_assig = ?)"
        conn.query(sql,[id,id_assig],(err,results)=>{
            if (err){
                console.log(err)
                res.status(400).send({
                    OK:false,
                    error:"Error al buscar nota"
                });
            }
            else{
                if(results.length == 0){
                    res.status(200).send({
                        OK:true,
                        error:"El id no existeix"
                    });
                }
                else{
                    var nota = []
                    results.forEach(element => {
                        nota.push({
                            nota: element.nota,
                            id_assig: element.id_assig,
                            cod_assig: element.cod_assig,
                            link: {
                                get: "GET https://localhost:5555/assignatura/"+element.id_assig
                            }
                        })
                    });
                    res.status(200).send({
                        OK: true,
                        nota: nota
                    })
                }
            }
        })
    }
    getModuls(id,res){
        let conn=this.mydb.getConnection();
        let sql="SELECT DISTINCT a.modul FROM notes as n, assignatura as a WHERE (n.id_profe = ? and n.id_assig = a.id_assig);"
        conn.query(sql,[id],(err,results)=>{
            if (err){
                console.log(err)
                res.status(400).send({
                    OK:false,
                    error:"Error al buscar els moduls"
                });
            }
            else{
                if(results.length == 0){
                    res.status(200).send({
                        OK:true,
                        error:"El professor no te moduls"
                    });
                }
                else{
                    var notes = []
                    results.forEach(element => {
                        notes.push({
                            modul: element.modul,
                        })
                    });
                    res.status(200).send({
                        OK: true,
                        Moduls: notes
                    })
                }
            }
        })
    }
    getAssignaturaModul(id_assig,res){
        let conn=this.mydb.getConnection();
        let sql="SELECT alu.id_alumne, u.full_name, alu.repetidor, a.id_assig,a.cod_assig,n.nota FROM assignatura as a, alumne as alu, notes as n, users as u WHERE (a.id_assig = ? and n.id_alumne = alu.id_alumne and n.id_assig = ? and alu.id_alumne = u.id)"
        conn.query(sql,[id_assig,id_assig],(err,results)=>{
            if (err){
                console.log(err)
                res.status(400).send({
                    OK:false,
                    error:"Error al buscar assignatura"
                });
            }
            else{
                if(results.length == 0){
                    res.status(200).send({
                        OK:true,
                        error:"No hi han alumnes matriculats en eixa assignatura"
                    });
                }
                else{
                    var notes = []
                    results.forEach(element => {
                        notes.push({
                            id_alumne: element.id_alumne,
                            full_name: element.full_name,
                            id_assig: element.id_assig,
                            cod_assig: element.cod_assig,
                            nota: element.nota,
                            link: {
                                assig:"GET https://vps-922034f7:8091/assignatura/"+element.id_assig,
                                alumne:"GET https://vps-922034f7:8091/alumne/"+element.id_alumne,
                                nota: "PUT https://vps-922034f7:8091/moduls/"+element.id_alumne+"/"+element.id_assig
                            }
                        })
                    });
                    res.status(200).send({
                        OK: true,
                        notes: notes
                    })
                }
            }
        })
    }
    putNotes(nota,id_assig,id_alumne,id_profe,res){
        console.log(nota,id_assig,id_alumne,id_profe)
        let conn=this.mydb.getConnection();
        let sql="UPDATE notes SET nota = ? WHERE id_alumne = ? AND id_assig = ? AND id_profe = ?"
        conn.query(sql,[nota,id_alumne,id_assig,id_profe],(err,results)=>{
            if (err){
                console.log(err)
                res.status(400).send({
                    OK:false,
                    error:"Error al canviar la nota"
                });
            }
            else{
                if (results > 0){
                    res.status(200).send({
                        OK: true,
                    })
                }
                else{
                    res.status(200).send({
                        OK: false,
                    })
                }
            }
        })
    }
}

//UPDATE notes SET nota = ? WHERE id_alumne = ? AND id_assig = ? AND id_profe = ?

module.exports={
    Notes:Notes
}